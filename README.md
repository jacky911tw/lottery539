# 今彩539候選號碼

以 Cloudflare Workers 執行的簡易今彩539候選號碼頁面。Worker 會取得最近一期星期六的開獎資料，依固定規則計算候選號碼，並提供網頁與 JSON 介面。

## 線上版本

- 網頁：[lottery539.jacky911-huang.workers.dev](https://lottery539.jacky911-huang.workers.dev/)
- JSON API：[lottery539.jacky911-huang.workers.dev/api](https://lottery539.jacky911-huang.workers.dev/api)
- GitHub：[jacky911tw/lottery539](https://github.com/jacky911tw/lottery539)（Private）

## 候選號碼規則

以最近一期星期六的五個開獎號碼為依據：

1. 第三個號碼取前一個、原號碼、後一個。
2. 第五個號碼取減 20、減 10、原號碼。
3. 合併兩組號碼，去除重複，排除 1 至 39 以外的數字，再由小到大排列。

這是固定規則產生的候選號碼，不代表能提高中獎機率。

## 資料來源

開獎資料由 [timetable.tw 公開 API](https://lottery.timetable.tw/developers) 提供，使用今彩539 的 `gameTypeId=3`。該服務為第三方資料整理網站；實際開獎結果請以[台灣彩券官方公告](https://www.taiwanlottery.com.tw/)為準。

## 本機開發與部署

需求：Node.js 與 pnpm。

```sh
pnpm install
pnpm exec wrangler login
pnpm exec wrangler dev
pnpm exec wrangler deploy
```

部署設定位於 [`wrangler.toml`](./wrangler.toml)，Worker 入口為 [`worker.js`](./worker.js)。部署後，Wrangler 會顯示 `workers.dev` 網址；在網址後加 `/api` 可取得 JSON。
