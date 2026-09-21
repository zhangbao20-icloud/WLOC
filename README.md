<p align="center">
  <img src="wloc.jpg" width="144" />
</p>

# Apple WLOC 定位修改

通过代理脚本修改 Apple WLOC 网络定位（WiFi/基站）响应中的坐标，实现 iOS 网络定位位置修改。**本项目不直接修改 GPS 硬件定位。** 启用模块与 MITM 后，可通过快捷指令或在线选点页面保存目标坐标，并在后续 WLOC 请求中生效。

> ⚠️ **兼容性提示：** 根据当前测试记录，iOS 27 beta 6 起对 `gs-loc.apple.com` 的 MITM 拦截存在系统级限制，相关版本可能无法正常使用本项目。Beta 版本行为仍可能变化，请以实际测试结果为准。

## 维护说明与项目出处

本仓库是在 **WLOC 原项目公开代码** 的基础上继续整理和维护的独立维护版本，保留原有功能思路与开源许可，不以重新包装或抹去原有贡献为目的。

项目的 WLOC 网络定位修改思路可追溯至：

- **原作者频道：** https://t.me/Jsforbaby
- **原始 WLOC 定位修改思路：** https://github.com/FFF686868/proxypin-wloc-spoofer
- 早期社区贡献者完成了百度地图支持、港澳台边界处理、GCJ 坐标换算、随机坐标扰动、Stash 兼容和备用域名拦截等工作；相关贡献说明仍保留在本文档的「致谢 / 贡献者」部分。
- 本仓库继续遵循原项目采用的 **AGPL-3.0** 开源许可证。

### 为什么继续维护

继续维护这个项目的主要原因，是希望它能够在条件允许的情况下，**尽可能长期服务于较老型号的 iPhone 和仍在使用旧版 iOS 的设备**。

随着 iOS、Safari、代理客户端、Cloudflare 运行环境以及第三方地图接口不断更新，旧设备通常最先遇到网页兼容、快捷指令失效、远程模块链接失效、部署方式变化等问题。对于已经停止获得新系统支持、但硬件本身仍然可以正常使用的设备，这些问题往往不是硬件故障，而是外围服务和工具链逐渐停止兼容。

因此，本维护版的目标不是追求频繁增加功能，而是优先保证：

- 已经可以工作的旧设备和旧 iOS 版本，尽量不要因为外部链接、部署方式或客户端更新而失去基本可用性；
- 能自托管的服务尽量提供自托管方案，减少对单一公共实例的依赖；
- 快捷指令、客户端模块和 Cloudflare 服务尽量使用可长期维护、可自行替换的地址；
- 模块保持远程更新能力，仓库更新后无需重新安装即可同步；
- Workers / Pages 提供明确、可复现的部署文件和步骤；
- 对地图链接解析、坐标换算和旧版浏览器兼容问题继续做保守修正，优先保证稳定而不是追求激进改动；
- 对未来 iOS 已明确限制的能力如实说明，不宣称无法保证的兼容性。

### 当前维护版已做的主要调整

在原有功能基础上，目前已经完成的维护工作包括：

- 将运行脚本、模块订阅和维护链接统一切换到当前维护仓库；
- 重新整理 Surge、Quantumult X、Loon、Stash、Shadowrocket、Egern 的远程模块入口；
- 为支持的客户端增加一键安装入口，同时保留 GitHub RAW 远程源，确保后续仍可更新；
- 更新「设置定位 / 恢复定位」快捷指令，并改为使用当前自托管解析服务；
- 保留 `gs-loc.apple.com` 本地拦截机制，不改变 WLOC 持久化数据的核心工作方式；
- 增加独立的 Cloudflare Workers / Pages 部署文件与完整部署说明；
- 增加 `/install/*` 客户端导入路由和 `/api/parse` 地图链接解析接口；
- 整理 Apple / 高德 / Google / 百度地图链接解析及 GCJ-02 / WGS84 / BD-09 相关坐标换算逻辑；
- 清理失效或不再需要的上游运行链接，使当前版本可以独立维护。

> **维护原则：** 对旧设备而言，「长期能用」比「功能更多」更重要。后续修改会优先考虑稳定性、可回退、可自部署和旧系统兼容性。所有维护修改均保留在 Git 提交历史中，便于追踪来源、变更内容与修改时间。

---

**原作者频道：** https://t.me/Jsforbaby  
**当前维护仓库：** https://github.com/zhangbao20-icloud/WLOC

## 订阅地址

**Surge 一键安装：**
https://wloc.guol.ccwu.cc/install/surge  
> RAW：https://raw.githubusercontent.com/zhangbao20-icloud/WLOC/refs/heads/main/modules/wloc.sgmodule

**Quantumult X 一键安装：**
https://wloc.guol.ccwu.cc/install/quantumultx  
> RAW：https://raw.githubusercontent.com/zhangbao20-icloud/WLOC/refs/heads/main/modules/wloc.conf

**Loon 一键安装：**
https://wloc.guol.ccwu.cc/install/loon  
> RAW：https://raw.githubusercontent.com/zhangbao20-icloud/WLOC/refs/heads/main/modules/wloc.lpx

**Stash 一键安装：**
https://wloc.guol.ccwu.cc/install/stash  
> RAW：https://raw.githubusercontent.com/zhangbao20-icloud/WLOC/refs/heads/main/modules/wloc.stoverride

**Shadowrocket（小火箭）一键安装：**
https://wloc.guol.ccwu.cc/install/shadowrocket  
> RAW：https://raw.githubusercontent.com/zhangbao20-icloud/WLOC/refs/heads/main/modules/wloc.module

**Egern 一键安装：**
https://wloc.guol.ccwu.cc/install/egern  
> RAW：https://raw.githubusercontent.com/zhangbao20-icloud/WLOC/refs/heads/main/modules/wloc.sgmodule

> Egern 使用 Surge 格式模块；Stash 使用原生 `.stoverride`。

> **更新说明：** 上面所有“一键安装”都会把对应的 GitHub RAW 地址作为远程资源源地址保存到客户端，不是一次性复制代码。以后本仓库 `main` 分支更新后，在客户端执行“更新/刷新远程资源”即可同步；支持自动更新的客户端可按各自设置自动刷新。Quantumult X 当前设置为每 24 小时同步一次。

### 默认扩展域名支持

除 `gs-loc.apple.com`、`gs-loc-cn.apple.com` 外，当前模块还包含以下兼容域名，用于适配部分系统或网络环境：

- `gsp-ssl.ls.apple.com`
- `bluedot.is.autonavi.com`
- `bluedot.is.autonavi.com.gds.alibabadns.com`

> 域名集合会随 Apple 或相关服务的实际行为变化而调整，因此这里不将其表述为永久、完整列表。


---

## 使用方法与说明

- **wloc 设置地理位置**：https://www.icloud.com/shortcuts/1f7d9f66a0b94e9ea27dfe8564a419ca
- **wloc 清理恢复位置**：https://www.icloud.com/shortcuts/704652bc2ad14dbc8f1e14501a3af5e3
- **在线地图选址**：https://wloc.guol.ccwu.cc/

### 方法一：快捷指令

- **设置位置：** 在地图 App 里选好位置（长按地图选点）→ 共享 → 选「wloc 设置地理位置」即可切换。
  - 苹果地图：选点 → 共享 → 「wloc 设置地理位置」
  - 高德地图：选点 → 分享 → **更多** → 「wloc 设置地理位置」
- **清理位置：** 点「wloc 清理恢复位置」即可恢复真实定位。

支持苹果地图、高德（含短链，自动跟跳转 + GCJ-02→WGS84 坐标换算）。

### 方法二：在线地图选址

1. 打开 https://wloc.guol.ccwu.cc/
2. 在地图上点击目标位置，或使用地点搜索 / 粘贴地图链接来定位。
3. 确认页面显示的经纬度无误。
4. 点击 **「储存到设备」**。
5. 页面提示保存成功后，设备的 WLOC 网络定位会使用该坐标。

> **使用前提：** 代理已开启、WLOC 模块已启用，并已安装和信任代理客户端的 MITM 根证书。模块会声明所需的 MITM 主机名（包括 `gs-loc.apple.com`、`gs-loc-cn.apple.com` 及兼容域名）；Safari / 网页请求需要实际经过代理。快捷指令与在线地图选址两种方式可以任选其一；Worker / Pages 自部署方案仍保留，见下方。

---

### 关于地图链接解析（worker）

为了让苹果地图和高德走同一条流程，链接统一发给 `wloc.guol.ccwu.cc/api/parse` 解析：

- **高德**：分享出来是短链，真实坐标只藏在 302 跳转的 `Location` 头里，且是 GCJ-02 偏移坐标。快捷指令既读不到跳转头、也难做坐标换算，所以由 worker 跟跳转 → 抠坐标 → GCJ-02→WGS84 → 返回经纬度。
- **苹果地图**：链接里直接带 `coordinate=纬度,经度`，但在**中国大陆同样是 GCJ-02 偏移坐标**，所以和高德一样由 worker 做 GCJ-02→WGS84 换算后返回；境外坐标会自动跳过换算（`out_of_china` 判断）原样返回。除了统一坐标系，走同一接口也方便统一处理短链、文本夹链接、名称解码等。

**隐私说明：** `/api/parse` 的应用代码只负责收到链接 → 跟跳转 → 解析坐标 → 返回 JSON，不主动把解析内容写入 KV、D1、R2、文件或应用级日志，也不做应用级缓存；`wrangler.jsonc` 已关闭 Worker observability。请求仍会经过 Cloudflare 基础设施，平台层可能依据其服务政策处理必要的请求元数据。跟跳转时只接受 http/https，单次请求 8 秒超时、只读响应正文前 512 KB。

**如希望完全自行掌控服务：** Worker 源码完全开源，可自行部署并替换上面的公共地址：

- 路由：[`worker/src/index.js`](worker/src/index.js)
- 链接解析与坐标换算：[`worker/src/parse.js`](worker/src/parse.js)
- 选点页面：[`worker/src/page.js`](worker/src/page.js)、[`worker/src/gcj-browser.js`](worker/src/gcj-browser.js)
- 部署后把快捷指令里的 `wloc.guol.ccwu.cc` 换成你自己的 worker 域名即可。

解析逻辑带一套不联网的回归测试，改动后跑一下：

```bash
cd worker && npm install && npm test
```

**坐标系说明：** 页面内部一律以 WGS84 为准。底图切到「高德」时，瓦片画的是 GCJ-02
地物，与 Leaflet 的 WGS84 像素映射差着一个偏移量（深圳一带约 600 米），页面会在
选点/落点时自动双向换算，所以在任意底图上点选得到的都是同一个 WGS84 坐标。

各家地图的坐标系不同，换算按「来源 × 地区」分派：

| 来源 | 中国大陆 | 港澳台 |
|------|----------|--------|
| 苹果地图 / Google | GCJ-02，需换算 | **WGS84，不换算** |
| 高德 / 百度 | GCJ-02 / BD-09，需换算 | 同左，仍需换算 |

**港澳台建议优先用苹果或高德的链接。** 百度在港澳台的分享短链，坐标要靠网页脚本
带反爬令牌去查，服务端取不到；变通办法是在浏览器打开该链接，等地址栏变成
`map.baidu.com/poi/名称/@数字,数字,19z` 之后复制整条地址再粘贴——但根据现有测试，百度在港澳台的针脚位置与苹果/高德可能出现更明显的偏差，精确定位时不建议优先使用。

---

<details>
<summary><b>兼容性与高版本系统提示</b></summary>

支持 Apple Maps / Google Maps / 高德 / 百度 / 坐标文本链接解析。基础使用方法见上方「使用方法与说明」。

> **iOS 26/27 及更高版本注意：** 根据当前测试，部分高版本 iOS 的 `locationd` 会更积极地复用之前的定位缓存。安装模块或切换目标坐标后，即使脚本日志显示已修改 WLOC 响应，系统仍可能暂时显示缓存中的旧坐标。
>
> **建议：** 如果切换后仍显示旧位置，重启设备是目前最稳妥的刷新方式。飞行模式或单独关闭定位服务在部分高版本系统上不一定能可靠刷新缓存；较旧系统通常更容易直接生效。

**高版本系统推荐操作流程（成功率最高）：**

方法一：
1. 先在选点页面选好需要修改的定位并储存到设备
2. 开飞行模式 → 关闭定位服务 → 重启设备
3. 关闭飞行模式（WiFi 也要关）→ 连接代理工具（确认 VPN 图标出现）→ 打开定位服务
4. 打开地图验证

方法二：
1. 关闭定位服务
2. 在选点页面选好位置并储存到设备
3. 打开定位服务 → 弹出「允许访问位置信息」时选择**「下次询问或在我共享时」**
4. 打开地图验证

</details>

<details>
<summary><b>工作原理</b></summary>

```
选点页面 → fetch gs-loc.apple.com/wloc-settings/save?lon=x&lat=y
         → 代理模块拦截 → wloc-settings.js 写入 $persistentStore
         → 下次 WLOC 触发 → wloc.js 读取坐标 → patch protobuf 响应
```

模块包含两条规则：
- `wloc.js` — 拦截 `/clls/wloc` 响应，解析 protobuf 并替换坐标
- `wloc-settings.js` — 拦截 `/wloc-settings/save` 请求，写入持久化存储

</details>

<details>
<summary><b>参数配置</b></summary>

| 参数 | 说明 | 默认值 |
|------|------|--------|
| longitude | 目标经度(在线选点优先) | null (透传) |
| latitude | 目标纬度(在线选点优先) | null (透传) |
| accuracy | 精度(米) | 25 |
| randomRadius | 扰动半径(米)，每次定位在目标点周围随机偏移，0=关闭 | 0 |
| logLevel | 日志级别 | info |

优先级: 在线选点储存 > 模块参数 > 默认值

> **扰动半径说明：** 启用后每次定位响应会在目标坐标周围指定米数内随机偏移，避免每次定位结果完全相同。Surge/Loon/Stash/Shadowrocket 可在模块参数中设置；QX 用户可通过选点页面设置。默认 0（关闭），不影响现有用户。

</details>

<details>
<summary><b>取消虚拟定位 / 恢复真实定位</b></summary>

**方法一：关闭或删除模块**（推荐）

关闭模块后脚本不再拦截 WLOC 请求，系统自动恢复真实定位。iOS 26+ 需要重启设备清除定位缓存。

**方法二：清除持久化数据（透传模式）**

清除已保存的坐标后，脚本进入**透传模式**——不修改 WLOC 响应，直接放行原始数据，系统自动恢复真实 GPS 定位。

**透传模式触发条件：** 持久化数据为空（null）且模块参数为默认值（113.94114, 22.544577）时，脚本判定用户未自定义坐标，自动跳过修改。模块默认参数无需更改，仅清除持久化数据即可触发透传。

在代理工具中删除持久化数据，字段名为 `wloc_settings`：

- **Surge** — 脚本编辑器运行: `$persistentStore.write(null, "wloc_settings")`
- **Quantumult X** — 运行: `$prefs.removeValueForKey("wloc_settings")`
- **Loon** — 运行: `$persistentStore.write(null, "wloc_settings")`

清除后脚本会自动检测到无自定义坐标并跳过修改，无需关闭模块；如果高版本系统仍显示缓存中的旧坐标，再重启设备刷新定位缓存。

> **注意：** 如果用户在模块参数中手动修改了经纬度（非默认 113.94114, 22.544577），即使清除持久化数据，脚本仍会使用模块参数中的坐标进行修改。只有保持默认参数不变时，清除持久化数据才会进入透传模式。

</details>

<details>
<summary><b>收藏位置功能</b></summary>

在线选点页面支持收藏多个位置，方便来回切换：

- **添加收藏**：选好位置后点击「收藏位置」→ 输入备注名称（支持中文/英文/数字，最多 30 字）→ 保存
- **快速切换**：点击收藏列表中的位置 → 地图自动跳转 → 点「储存到设备」即可切换
- **当前生效标记**：与设备已保存坐标一致的收藏会显示「✓ 当前生效」
- **删除管理**：单个删除（×按钮）或清空全部
- **当前生效坐标**：页面显示设备端持久化数据（wloc_settings），支持刷新查询和清除

**数据存储说明：**
- **收藏列表** → 保存在浏览器 `localStorage`（仅用于选点页面的 UI 便捷操作）
- **生效坐标** → 保存在代理工具持久化存储 `$persistentStore`（脚本运行时实际读取的数据）

两者独立存储。收藏列表是浏览器端的辅助数据，清除浏览器缓存或换浏览器后需重新收藏，但不影响已储存到设备的生效坐标。

</details>

<details>
<summary><b>自部署 Cloudflare（推荐 Workers）</b></summary>

WLOC 的 Cloudflare 服务用于在线选点、地图链接解析，以及各客户端的一键安装跳转。**推荐使用 Workers**。

### 部署前需要准备什么

本项目目前**不需要任何额外 Cloudflare 资源或变量**：

- 环境变量：**不需要**
- Secret：**不需要**
- KV：**不需要**
- D1：**不需要**
- R2：**不需要**
- Durable Objects：**不需要**
- Service Binding：**不需要**
- `nodejs_compat`：**不需要**
- 自定义域名：可选；部署成功后再绑定即可

---

### 一键部署 Workers

保留原项目的一键部署方式：

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zhangbao20-icloud/WLOC/tree/main/worker)

一键部署会从仓库的 `worker/` 源码构建并创建 Worker。

---

### Workers：Dashboard 手动部署 / 覆盖现有 Worker（推荐）

仓库已提供可直接粘贴的单文件版本：

`deploy/worker.js`

如果你已经有一个正在运行的 Worker，例如已经绑定了自己的域名，按下面步骤更新最简单：

1. 打开 Cloudflare Dashboard → **Workers & Pages**。
2. 进入你现有的 WLOC Worker。
3. 点击 **Edit code / 编辑代码**。
4. 打开本仓库的 `deploy/worker.js`，复制**全部内容**。
5. 在 Cloudflare 编辑器中全选旧代码并完整替换。
6. 点击 **Deploy / 部署**。
7. **Variables and Secrets 不需要新增任何内容，Bindings 也不需要添加。**
8. 如果原 Worker 已经绑定自定义域名（例如 `wloc.guol.ccwu.cc`），保持原绑定即可，不需要重新添加。

部署完成后建议依次测试：

- `https://你的域名/` → 应显示 WLOC 选点页面。
- `https://你的域名/api/parse?format=json&u=22.544577%2C113.94114` → 应返回包含 `lat`、`lon` 的 JSON。
- `https://你的域名/install/shadowrocket` → 应出现 WLOC 导入页，并尝试唤起 Shadowrocket。

> 如果 `/install/shadowrocket` 返回 `404 Not Found`，说明 Cloudflare 上仍在运行旧版 Worker，重新用 `deploy/worker.js` 完整覆盖并 Deploy 即可。

---

### Workers：Wrangler 部署

适合从电脑维护源码：

```bash
git clone https://github.com/zhangbao20-icloud/WLOC.git
cd wloc/worker

npm install
npx wrangler login
npm run deploy
```

配置文件为 `worker/wrangler.jsonc`，当前无需填写任何变量或绑定。Wrangler 会构建 `worker/src/` 后部署。

---

### Pages 备用部署

仓库同时提供 Pages Advanced Mode 部署文件：

- `deploy/pages/_worker.js`：完整 Pages Worker
- `deploy/pages/index.html`：Direct Upload 占位静态文件
- `deploy/pages/wrangler.jsonc`：Pages Wrangler 配置

#### 方法 A：Cloudflare Dashboard Direct Upload

1. Cloudflare Dashboard → **Workers & Pages** → 创建 **Pages** 项目。
2. 选择 **Direct Upload / 直接上传**。
3. 上传 `deploy/pages/` 目录中的文件（也可以先把该目录压缩后上传）。
4. 部署。
5. Pages 不需要设置任何环境变量、Secret 或数据库绑定。
6. 部署成功后使用 `https://<项目名>.pages.dev` 测试。
7. 如需自定义域名，在 Pages 项目的 **Custom domains** 中绑定。

Pages 使用 `_worker.js` Advanced Mode，因此 `/`、`/api/parse`、`/install/*` 都由同一个文件处理。

#### 方法 B：Wrangler 部署 Pages

```bash
git clone https://github.com/zhangbao20-icloud/WLOC.git
cd wloc/deploy/pages

npx wrangler login
npx wrangler pages deploy . -c wrangler.jsonc
```

首次创建 Pages 项目时按 Wrangler 提示输入项目名称即可。

> Workers 和 Pages 功能目标一致，但本项目优先维护 Workers；个人自用建议直接使用 Workers。

</details>

<details>
<summary><b>注意事项</b></summary>

- 需要安装并信任代理客户端的 MITM 根证书；启用模块后应让客户端加载模块中声明的 MITM 主机名。
- 仅修改网络定位（WiFi/基站），不直接修改 GPS 硬件定位。
- iOS 在 GPS 信号强时可能优先使用其他定位来源，因此实际效果会因系统版本和环境而异。
- 选点页面需在代理模式下使用（Safari 请求需要经过代理，才能拦截储存请求）。
- 建议仅在自己有权控制的设备、测试环境或明确授权的场景中使用，并遵守所在地法律及相关服务条款；不要依赖本项目进行紧急定位、设备找回等安全用途。

</details>

---

## 致谢

- **原作者 / Jsforbaby**（https://t.me/Jsforbaby）— WLOC 原项目作者。当前维护版基于原项目公开代码继续整理、修复与维护，原始项目设计、主要实现及早期功能基础归功于原作者。
- **上游代码维护者 / [Yu9191](https://github.com/Yu9191)** — 曾维护和整理上游代码版本，并整合多项社区贡献，为当前维护版提供了直接的代码基础。
- [proxypin-wloc-spoofer](https://github.com/FFF686868/proxypin-wloc-spoofer) - 原始 WLOC 定位修改思路 by FFF686868
- [NSNanoCat/Util](https://github.com/NSNanoCat/util) - 跨平台脚本工具框架

### 贡献者

- [@YmlyZA](https://github.com/YmlyZA) - 百度地图支持、港澳台边界处理、GCJ 换算优化、回归测试覆盖 （上游 PR #83）
- [@YeTianXingShi](https://github.com/YeTianXingShi) - randomRadius 随机坐标扰动功能原始实现 （上游 PR #70）
- [@SajoLuo](https://github.com/SajoLuo) - Stash 响应格式修复 （上游 PR #66）
- [@SkywardLab](https://github.com/SkywardLab) - 扩展 WLOC 备用域名拦截 （上游 PR #90）
- [@beiming0000](https://github.com/beiming0000) - 逗号小数格式坐标丢失问题报告 （上游 Issue #96）

---

## 许可证

本项目沿用 [AGPL-3.0](LICENSE) 开源许可证。AGPL-3.0 允许在许可证条款范围内使用、修改和分发代码，包括商业用途；修改、再分发或通过网络向用户提供修改后的版本时，需要继续履行 AGPL-3.0 对源代码提供、许可证保留及修改说明等方面的义务。具体权利与义务以仓库中的 [LICENSE](LICENSE) 原文为准。
