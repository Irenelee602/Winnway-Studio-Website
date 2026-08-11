Winnway Studio｜Cloudflare 共享酒窖版

請把本資料夾內「所有檔案與資料夾」上傳到 GitHub 的「手機測試」分支根目錄。

第一次部署前，請在 Cloudflare Worker 的「設定 > 變數與密鑰」新增兩個「密鑰」：
1. SITE_PASSWORD：填入網站共用密碼（不要放進 GitHub）。
2. SESSION_SECRET：自訂一段至少 24 個字元、且不重複的英文／數字組合。

這個版本已內含 D1 資料庫設定與資料庫 ID。部署後，首次使用酒窖前，請到 D1 的「主控台」執行 schema.sql 內所有內容一次，用來建立資料表。
