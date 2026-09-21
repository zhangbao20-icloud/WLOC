import { Hono } from "hono/tiny";
import { getPageHtml } from "./page.js";
import { parseCoords, gcj02ToWgs84, toWgs84, round6, inRange } from "./parse.js";

const app = new Hono();

app.get("/", (c) => {
  return c.html(getPageHtml());
});

const RAW_BASE = "https://raw.githubusercontent.com/zhangbao20-icloud/WLOC/refs/heads/main/modules/";

function installPage(appName, scheme) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>WLOC - 打开 ${appName}</title>
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;background:#f6f7f9;color:#111}
    main{max-width:420px;padding:28px;text-align:center}
    a{display:inline-block;margin-top:16px;padding:14px 22px;border-radius:12px;background:#111;color:#fff;text-decoration:none;font-weight:600}
    p{line-height:1.6;color:#555}
  </style>
</head>
<body>
  <main>
    <h2>WLOC 模块</h2>
    <p>正在打开 ${appName} 并导入 WLOC…</p>
    <a href="${scheme}">打开 ${appName}</a>
  </main>
  <script>setTimeout(function(){ location.href = ${JSON.stringify(scheme)}; }, 120);</script>
</body>
</html>`;
}

app.get("/install/shadowrocket", (c) => {
  const url = RAW_BASE + "wloc.module";
  return c.html(installPage("Shadowrocket", `shadowrocket://install?module=${encodeURIComponent(url)}`));
});

app.get("/install/surge", (c) => {
  const url = RAW_BASE + "wloc.sgmodule";
  return c.html(installPage("Surge", `surge:///install-module?url=${encodeURIComponent(url)}`));
});

app.get("/install/loon", (c) => {
  const url = RAW_BASE + "wloc.lpx";
  return c.html(installPage("Loon", `loon://import?plugin=${encodeURIComponent(url)}`));
});

app.get("/install/stash", (c) => {
  const url = RAW_BASE + "wloc.stoverride";
  return c.html(installPage("Stash", `stash://install-override?url=${encodeURIComponent(url)}`));
});

app.get("/install/egern", (c) => {
  const url = RAW_BASE + "wloc.sgmodule";
  return c.html(installPage("Egern", `egern:/modules/new?name=WLOC&url=${encodeURIComponent(url)}`));
});

app.get("/install/quantumultx", (c) => {
  const url = RAW_BASE + "wloc.conf";
  const resource = JSON.stringify({
    rewrite_remote: [`${url}, tag=WLOC, update-interval=86400, opt-parser=false, enabled=true`]
  });
  return c.html(installPage("Quantumult X", `quantumult-x:///add-resource?remote-resource=${encodeURIComponent(resource)}`));
});

// 地图链接解析: 供快捷指令调用。
// GET /api/parse?u=<链接>&format=json&cs=<gcj|none>
//   返回 {lat, lon, name}; 高德/苹果地图(中国大陆均为 GCJ-02)自动转 WGS84; 境外坐标自动跳过(out_of_china)。cs=none 可强制不转换。
//   不带 format=json 时返回纯文本 "lat=..&lon=.." 片段。
app.get("/api/parse", async (c) => {
  const raw = c.req.query("u") || "";
  const cs = (c.req.query("cs") || "").toLowerCase();
  const fmt = (c.req.query("format") || "").toLowerCase();
  try {
    let { lat, lon, name, src } = await parseCoords(raw);
    // 默认按来源自动换算; cs=none 强制不转换, cs=gcj/bd 强制按指定坐标系转换。
    if (cs === "gcj") ({ lat, lon } = gcj02ToWgs84(lat, lon));
    else if (cs === "bd") ({ lat, lon } = toWgs84(lat, lon, "baidu"));
    else if (cs !== "none") ({ lat, lon } = toWgs84(lat, lon, src));
    // 出口再校验一次: cs= 是调用方指定的, 强行按错误坐标系换算也可能把值推出值域。
    // 宁可报错也不要返回一个能被当成坐标写进设备的数字。
    if (!inRange(lat, lon)) throw new Error("解析出的坐标超出合法范围");
    lat = round6(lat);
    lon = round6(lon);
    name = name || "";
    c.header("Access-Control-Allow-Origin", "*");
    if (fmt === "json") return c.json({ lat, lon, name });
    return c.text(`lat=${lat}&lon=${lon}`);
  } catch (e) {
    c.header("Access-Control-Allow-Origin", "*");
    return c.json({ error: String(e && e.message ? e.message : e) }, 422);
  }
});

// 兜底 500 也要带 CORS —— 否则快捷指令那边看到的是跨域错误, 而不是真正的原因。
app.onError((e, c) => {
  c.header("Access-Control-Allow-Origin", "*");
  return c.text(`${e && e.message ? e.message : e}`, 500);
});

export default app;
