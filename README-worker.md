# 今彩539 Cloudflare Worker

此 Worker 使用 JavaScript，依最近一期星期六的開獎號碼，套用原本簡化的候選號碼規則。

- `/`：顯示候選號碼網頁與最近 10 期開獎號碼
- `/api`：以 JSON 回傳參考期別、最近 10 期開獎日期、星期、號碼（`recentDraws`）與候選號碼

資料透過 timetable.tw 的公開唯讀 API 取得（今彩539 `gameTypeId=3`）。該網站為第三方資料整理服務，實際開獎資訊以台灣彩券公告為準。

## 部署

1. 安裝並登入 Cloudflare Wrangler。
2. 在此資料夾執行 `wrangler deploy`。
3. Wrangler 顯示部署網址後，開啟網址查看頁面，或在網址後加 `/api` 查看 JSON。

設定檔為 `wrangler.toml`，Worker 入口為 `worker.js`。
