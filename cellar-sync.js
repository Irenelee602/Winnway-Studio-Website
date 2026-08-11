(() => {
  const api = async (path, body) => {
    const response = await fetch(path, {
      method: body ? "POST" : "GET",
      credentials: "include",
      headers: body ? { "content-type": "application/json" } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
    const type = response.headers.get("content-type") || "";
    const data = type.includes("application/json") ? await response.json() : {};
    if (!response.ok) throw new Error(data.error || "酒窖連線失敗，請重新登入後再試。");
    return data;
  };

  let remote = { items: [], entries: [] };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const today = () => new Date().toISOString().slice(0, 10);
  const wineList = () => typeof wines !== "undefined" && Array.isArray(wines) ? wines : [];
  const getWine = (id) => wineList().find((wine) => wine.id === id);
  const stock = (id) => remote.entries.filter((entry) => entry.wine_id === id).reduce((total, entry) => total + (entry.entry_type === "out" ? -Number(entry.quantity) : Number(entry.quantity)), 0);
  const item = (id) => remote.items.find((row) => row.wine_id === id) || { location: "", note: "" };

  async function refresh() { remote = await api("/api/cellar"); }

  function draw() {
    const rows = remote.items.map((row) => getWine(row.wine_id)).filter(Boolean);
    const content = rows.length ? rows.map((wine) => {
      const details = item(wine.id);
      const history = remote.entries.filter((entry) => entry.wine_id === wine.id).map((entry) => `<div class="ledger-row"><span>${esc(entry.entry_date)}</span><b class="ledger-${esc(entry.entry_type)}">${entry.entry_type === "out" ? "取出 −" : "入庫 +"}${esc(entry.quantity)} 瓶</b><span>${esc([entry.reason, entry.person_name ? `｜${entry.person_name}` : ""].filter(Boolean).join(" "))}</span></div>`).join("") || "<p class=\"sub\">尚未新增進出紀錄。</p>";
      return `<div class="cellar-item" data-id="${esc(wine.id)}"><div class="cellar-wine">${wine.image ? `<img src="${esc(wine.image)}">` : ""}<div><b>${esc(wine.name)}</b><br><small>${esc(wine.englishName)}</small></div><strong class="cellar-total">現有 ${stock(wine.id)} 瓶</strong><button class="cellar-remove" data-remove>移除</button></div><div class="ledger-form"><label>日期<input data-date type="date" value="${today()}"></label><label>類型<select data-type><option value="in">入庫</option><option value="out">取出</option></select></label><label>數量（瓶）<input data-qty type="number" min="1" value="1"></label><label>原因／用途<input data-reason placeholder="例如：購入、聚餐飲用"></label><label>人員名稱<input data-person required placeholder="請填寫操作人"></label><button class="primary" data-entry>新增紀錄</button></div><div class="ledger-history"><h4>進出紀錄</h4>${history}</div><div class="cellar-meta"><label>存放地<input data-location value="${esc(details.location)}"></label><label class="note-field">備註<textarea data-note>${esc(details.note)}</textarea></label><button class="primary cellar-save" data-meta>儲存酒款資訊</button></div></div>`;
    }).join("") : "<div class=\"empty\">酒窖目前是空的。從酒款詳細頁加入第一支酒吧。</div>";

    document.querySelector("#modal").innerHTML = `<button class="close" aria-label="關閉">×</button><div class="cellar"><div class="eyebrow">Shared cellar</div><h2>我的酒窖</h2><p class="sub">所有人的異動會同步；每筆入庫或取出都請填寫人員名稱。</p>${content}</div>`;
    document.querySelector(".close").onclick = window.closeModal;
    document.querySelectorAll("[data-remove]").forEach((button) => button.onclick = async () => {
      try { await api("/api/cellar/remove", { wineId: button.closest("[data-id]").dataset.id }); await refresh(); draw(); } catch (error) { alert(error.message); }
    });
    document.querySelectorAll("[data-entry]").forEach((button) => button.onclick = async () => {
      const card = button.closest("[data-id]");
      const value = (selector) => card.querySelector(selector).value.trim();
      if (!value("[data-person]")) return alert("請填寫人員名稱");
      try {
        await api("/api/cellar/entry", { wineId: card.dataset.id, date: value("[data-date]"), type: value("[data-type]"), quantity: value("[data-qty]"), reason: value("[data-reason]"), personName: value("[data-person]") });
        await refresh(); draw();
      } catch (error) { alert(error.message); }
    });
    document.querySelectorAll("[data-meta]").forEach((button) => button.onclick = async () => {
      const card = button.closest("[data-id]");
      try { await api("/api/cellar/meta", { wineId: card.dataset.id, location: card.querySelector("[data-location]").value.trim(), note: card.querySelector("[data-note]").value.trim() }); await refresh(); draw(); } catch (error) { alert(error.message); }
    });
  }

  window.openCellar = async () => {
    try { await refresh(); draw(); document.querySelector("#modalWrap").classList.add("open"); }
    catch (error) { alert(`無法讀取共享酒窖：${error.message}`); }
  };
  window.addCellar = async (id) => {
    try { await api("/api/cellar/add", { wineId: id }); await window.openCellar(); }
    catch (error) { alert(error.message); }
  };
  document.querySelector("#openCellar").onclick = window.openCellar;
})();

// Add a clear, visible sign-out control to both the desktop navigation and mobile menu.
(() => {
  const nav = document.querySelector("#navLinks");
  if (!nav || document.querySelector("#logoutButton")) return;

  const button = document.createElement("button");
  button.id = "logoutButton";
  button.type = "button";
  button.className = "nav-action";
  button.textContent = "登出";
  button.addEventListener("click", () => window.location.assign("/api/logout"));
  nav.append(button);
})();
