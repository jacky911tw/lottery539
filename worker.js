const API_URL = "https://lottery.timetable.tw/api/draws";
const GAME_TYPE_ID = 3; // 今彩539

export default {
  async fetch(request) {
    const url = new URL(request.url);

    try {
      const { referenceDraw: draw, recentDraws } = await getDrawData();
      const candidates = predictNextDraw(draw.numbers);
      const result = {
        game: "今彩539",
        referenceDraw: {
          date: draw.draw_date,
          period: draw.period,
          numbers: draw.numbers,
        },
        recentDraws,
        candidates,
        rules: [
          "最近一期星期六的第 3 個號碼，取前一個、原號碼、後一個",
          "最近一期星期六的第 5 個號碼，取減 20、減 10、原號碼",
          "合併去重，只保留 1 至 39，再由小到大排列",
        ],
        source: "https://lottery.timetable.tw/api/draws",
        note: "此為依固定規則產生的候選號碼，不代表能提高中獎機率。",
      };

      if (url.pathname === "/api" || url.pathname === "/api/") {
        return json(result);
      }

      if (url.pathname !== "/" && url.pathname !== "/index.html") {
        return new Response("Not found", { status: 404 });
      }

      return html(renderPage(result));
    } catch (error) {
      return json({ error: error.message || "無法取得開獎資料" }, 502);
    }
  },
};

async function getDrawData() {
  const endDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const start = new Date(`${endDate}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - 30);

  const query = new URLSearchParams({
    gameTypeId: String(GAME_TYPE_ID),
    startDate: start.toISOString().slice(0, 10),
    endDate,
    limit: "100",
    sortOrder: "DESC",
  });

  const response = await fetch(`${API_URL}?${query}`, {
    headers: { Accept: "application/json" },
    cf: { cacheTtl: 300, cacheEverything: true },
  });
  if (!response.ok) {
    throw new Error(`開獎資料 API 回應錯誤（HTTP ${response.status}）`);
  }

  const payload = await response.json();
  const records = Array.isArray(payload) ? payload : payload.records;
  if (!Array.isArray(records)) {
    throw new Error("API 回傳格式不符合預期");
  }

  const validRecords = records.filter((record) =>
    /^\d{4}-\d{2}-\d{2}$/.test(record.draw_date) &&
    Array.isArray(record.numbers) && record.numbers.length >= 5
  ).sort((a, b) => b.draw_date.localeCompare(a.draw_date));

  const draw = validRecords.find((record) => {
    const date = new Date(`${record.draw_date}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.getUTCDay() === 6;
  });

  if (!draw) {
    throw new Error("找不到最近一期星期六的今彩539開獎資料");
  }

  return {
    referenceDraw: draw,
    recentDraws: validRecords.slice(0, 10).map((record) => ({
      date: record.draw_date,
      period: record.period,
      numbers: record.numbers.slice(0, 5),
    })),
  };
}

function predictNextDraw(numbers) {
  const third = Number(numbers[2]);
  const fifth = Number(numbers[4]);
  const candidates = [third - 1, third, third + 1, fifth - 20, fifth - 10, fifth];
  return [...new Set(candidates.filter((n) => Number.isInteger(n) && n >= 1 && n <= 39))]
    .sort((a, b) => a - b)
    .map((n) => String(n).padStart(2, "0"));
}

function json(value, status = 200) {
  return new Response(JSON.stringify(value, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function html(body) {
  return new Response(body, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function renderPage(result) {
  const numbers = result.candidates.map((n) => `<span class="ball">${escapeHtml(n)}</span>`).join("");
  const actual = result.referenceDraw.numbers.map((n) => escapeHtml(String(n).padStart(2, "0"))).join("、");
  const history = result.recentDraws.map((draw) => `<tr><td>${escapeHtml(draw.date)}</td><td>${escapeHtml(draw.period ?? "")}</td><td>${draw.numbers.map((n) => escapeHtml(String(n).padStart(2, "0"))).join("、")}</td></tr>`).join("");
  return `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>今彩539下期候選號碼</title>
  <style>
    body{font-family:system-ui,sans-serif;max-width:680px;margin:48px auto;padding:0 20px;color:#222}
    h1{font-size:1.7rem}.balls{display:flex;gap:10px;flex-wrap:wrap;margin:24px 0}
    .ball{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:#c92828;color:white;font-weight:700}
    .muted{color:#666;line-height:1.7}.card{padding:18px;background:#f6f6f6;border-radius:12px}
    table{width:100%;border-collapse:collapse;margin:16px 0}th,td{text-align:left;padding:9px 8px;border-bottom:1px solid #ddd}th{background:#f6f6f6}.history{overflow-x:auto}
  </style>
</head>
<body>
  <h1>今彩539下期候選號碼</h1>
  <p>依據 ${escapeHtml(result.referenceDraw.date)}（第 ${escapeHtml(result.referenceDraw.period)} 期）星期六開獎號碼：${actual}</p>
  <div class="balls">${numbers}</div>
  <h2>最近 10 期開獎號碼</h2>
  <div class="history"><table>
    <thead><tr><th>日期</th><th>期別</th><th>開獎號碼</th></tr></thead>
    <tbody>${history}</tbody>
  </table></div>
  <div class="card">
    <strong>計算方式</strong>
    <p class="muted">星期六第 3 個號碼取前一個、原號碼、後一個；第 5 個號碼取減 20、減 10、原號碼。合併去重後保留 1 至 39。</p>
  </div>
  <p class="muted">這是固定規則產生的候選號碼，不代表能提高中獎機率。資料來源：<a href="https://lottery.timetable.tw/developers">timetable.tw API</a>。</p>
  <p><a href="/api">查看 JSON</a></p>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}
