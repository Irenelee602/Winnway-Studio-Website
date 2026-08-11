const encoder = new TextEncoder();

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=UTF-8", "cache-control": "no-store" },
});

const html = (body, status = 200, headers = {}) => new Response(body, {
  status,
  headers: { "content-type": "text/html; charset=UTF-8", ...headers },
});

const base64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)))
  .replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");

const fromBase64url = (value) => Uint8Array.from(
  atob(value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - value.length % 4) % 4)),
  (character) => character.charCodeAt(0),
);

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64url(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

async function hasSession(request, env) {
  const token = (request.headers.get("cookie") || "").match(/(?:^|; )winnway_session=([^;]+)/)?.[1];
  if (!token || !env.SESSION_SECRET) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || signature !== await hmac(payload, env.SESSION_SECRET)) return false;
  try {
    return JSON.parse(new TextDecoder().decode(fromBase64url(payload))).expiresAt > Date.now();
  } catch {
    return false;
  }
}

async function newSession(env) {
  const payload = base64url(encoder.encode(JSON.stringify({ expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30 })));
  return `${payload}.${await hmac(payload, env.SESSION_SECRET)}`;
}

function loginPage(message = "") {
  return `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Winnway Studio</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f2e9dc;color:#251619;font:16px system-ui,"Microsoft JhengHei",sans-serif}.box{width:min(400px,88vw);background:#fffdfa;padding:38px;box-shadow:0 20px 60px #4b2b2730}.brand{font:700 25px Georgia,serif;letter-spacing:.1em}.brand small{display:block;color:#766963;font:11px Georgia,serif;letter-spacing:.18em;margin-top:6px}.field-label{display:block;margin:30px 0 8px}input,button{box-sizing:border-box;width:100%;padding:13px;font:inherit}input{border:1px solid #d8caba}.show{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13px;color:#685b54}.show input{width:auto;padding:0}button{margin-top:14px;border:0;background:#7c2d38;color:#fff}.error{color:#8b2f3a;font-size:13px}</style><main class="box"><div class="brand">WINNWAY STUDIO<small>THE ART OF DISCOVERY</small></div><label class="field-label">網站共用密碼</label><form method="post" action="/api/login"><input id="password" name="password" type="password" required autofocus><label class="show"><input id="showPassword" type="checkbox">顯示密碼</label><button>進入網站</button></form>${message}<script>document.querySelector("#showPassword").onchange=e=>document.querySelector("#password").type=e.target.checked?"text":"password";</script></main></html>`;
}

async function cellarData(env) {
  const items = (await env.CELLAR_DB.prepare("SELECT * FROM cellar_items ORDER BY updated_at DESC").all()).results;
  const entries = (await env.CELLAR_DB.prepare("SELECT * FROM cellar_entries ORDER BY id DESC").all()).results;
  return { items, entries };
}

async function requestBody(request) {
  try { return await request.json(); } catch { return {}; }
}

async function cellarApi(request, env, pathname) {
  if (pathname === "/api/cellar" && request.method === "GET") return json(await cellarData(env));
  const body = await requestBody(request);

  if (pathname === "/api/cellar/add" && request.method === "POST") {
    if (!body.wineId) return json({ error: "找不到酒款資料。" }, 400);
    await env.CELLAR_DB.prepare("INSERT OR IGNORE INTO cellar_items(wine_id) VALUES(?1)").bind(body.wineId).run();
    return json(await cellarData(env));
  }
  if (pathname === "/api/cellar/remove" && request.method === "POST") {
    await env.CELLAR_DB.batch([
      env.CELLAR_DB.prepare("DELETE FROM cellar_entries WHERE wine_id=?1").bind(body.wineId),
      env.CELLAR_DB.prepare("DELETE FROM cellar_items WHERE wine_id=?1").bind(body.wineId),
    ]);
    return json(await cellarData(env));
  }
  if (pathname === "/api/cellar/meta" && request.method === "POST") {
    await env.CELLAR_DB.prepare("UPDATE cellar_items SET location=?2,note=?3,updated_at=CURRENT_TIMESTAMP WHERE wine_id=?1")
      .bind(body.wineId, String(body.location || ""), String(body.note || "")).run();
    return json(await cellarData(env));
  }
  if (pathname === "/api/cellar/entry" && request.method === "POST") {
    const quantity = Math.max(1, Number(body.quantity) || 1);
    const type = body.type === "out" ? "out" : "in";
    const stock = (await env.CELLAR_DB.prepare("SELECT COALESCE(SUM(CASE WHEN entry_type='out' THEN -quantity ELSE quantity END),0) stock FROM cellar_entries WHERE wine_id=?1").bind(body.wineId).first()).stock;
    if (type === "out" && quantity > Number(stock || 0)) return json({ error: "取出數量超過目前庫存。" }, 400);
    await env.CELLAR_DB.prepare("INSERT INTO cellar_entries(wine_id,entry_date,entry_type,quantity,reason,person_name) VALUES(?1,?2,?3,?4,?5,?6)")
      .bind(body.wineId, body.date || new Date().toISOString().slice(0, 10), type, quantity, String(body.reason || ""), String(body.personName || "未填寫")).run();
    return json(await cellarData(env));
  }
  return json({ error: "找不到此酒窖功能。" }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/login") return html(loginPage());
    if (url.pathname === "/api/login" && request.method === "POST") {
      const form = await request.formData();
      if (!env.SITE_PASSWORD || !env.SESSION_SECRET) return html(loginPage("<p class=error>網站尚未完成安全設定。</p>"), 503);
      if (String(form.get("password") || "") !== env.SITE_PASSWORD) return html(loginPage("<p class=error>密碼不正確，請再試一次。</p>"), 401);
      const cookie = await newSession(env);
      return new Response(null, { status: 302, headers: { location: "/", "set-cookie": `winnway_session=${cookie}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=2592000` } });
    }
    if (url.pathname === "/api/logout") return new Response(null, { status: 302, headers: { location: "/login", "set-cookie": "winnway_session=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0" } });

    const signedIn = await hasSession(request, env);
    if (url.pathname.startsWith("/api/")) {
      if (!signedIn) return json({ error: "登入狀態已失效，請重新整理網站後再次輸入密碼。" }, 401);
      try { return await cellarApi(request, env, url.pathname); }
      catch (error) { return json({ error: `酒窖暫時無法連線：${error.message}` }, 500); }
    }
    if (!signedIn) return Response.redirect(`${url.origin}/login`, 302);
    return env.ASSETS.fetch(request);
  },
};
