

# IP6.ARPA 域名自动添加 SSL 证书

这是一个 Cloudflare Worker 脚本，用于为 IP6.ARPA 反向解析域名自动申请和配置 Cloudflare 通用 SSL 证书。该工具同时提供了 IP6.ARPA 域名生成功能，方便用户快速生成符合格式的反向解析域名。

## 功能特点

- 🌐 提供直观的 Web 界面，无需编程知识即可使用
- 🔐 支持为 IP6.ARPA 域名自动添加 SSL 证书
- 🏢 支持多种证书颁发机构（CA）：SSL.com、Let's Encrypt、Google Trust Services、Sectigo
- 🛠️ 内置 IP6.ARPA 域名生成工具，支持随机子域名生成
- 📡 提供 RESTful API，支持 GET 和 POST 请求方式
- 📱 响应式设计，支持移动设备访问
- 💾 自动保存用户输入的 IPv6 CIDR 地址

## 部署说明

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 "Workers & Pages" 部分
3. 创建新的 Worker
4. 将提供的代码粘贴到 Worker 编辑器中
5. 保存并部署 Worker
6. （可选）配置自定义域名

## 使用方法

### Web 界面

1. 访问部署好的 Worker URL
2. 填写以下信息：
   - Cloudflare 注册邮箱
   - 区域 ID (Zone ID)
   - 全局 API 密钥 (API Key)
   - 选择证书颁发机构（默认为 SSL.com）
3. 点击"添加 SSL 证书"按钮
4. 等待处理完成，结果将显示在页面上

### IP6.ARPA 域名生成

1. 在"IP6.ARPA 域名生成工具"部分输入 IPv6 CIDR 地址（例如：`2001:DB8::/48`）
2. 点击"生成 IP6.ARPA 域名"按钮
3. 系统将生成 4 个域名（1 个根域名 + 3 个随机前缀域名）
4. 生成的域名会自动复制到剪贴板

### API 调用

#### GET 请求

```
https://worker地址/?zoneId=YOUR_ZONE_ID&email=YOUR_EMAIL&apikey=YOUR_API_KEY&enabled=true&ca=ssl_com
```

#### POST 请求

```bash
curl -X POST https://worker地址/api/add-ssl \
  -H "Content-Type: application/json" \
  -d '{
    "email": "YOUR_EMAIL",
    "zoneId": "YOUR_ZONE_ID",
    "apikey": "YOUR_API_KEY",
    "enabled": true,
    "ca": "ssl_com"
  }'
```

## API 参数说明

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| email | 字符串 | 是 | Cloudflare 注册邮箱 |
| zoneId | 字符串 | 是 | Cloudflare 区域 ID |
| apikey | 字符串 | 是 | Cloudflare 全局 API 密钥 |
| enabled | 布尔值 | 否 | 是否启用 SSL（默认为 true） |
| ca | 字符串 | 否 | 证书颁发机构（默认为 ssl_com） |

### 支持的证书颁发机构 (CA)

- `ssl_com` - SSL.com（默认，推荐用于 IP6.ARPA 域名）
- `lets_encrypt` - Let's Encrypt
- `google` - Google Trust Services
- `sectigo` - Sectigo

## 注意事项

- IP6.ARPA 域名通常仅支持 `ssl_com` 证书颁发机构
- API 密钥仅用于请求，不会被记录
- 证书添加成功后，请等待约 10 分钟后在 Cloudflare 域名设置中检查 SSL/TLS 证书
- 如有安全顾虑，建议自行在 Cloudflare Workers 部署此代码

## IP6.ARPA 注册地址

以下是一些提供 IP6.ARPA 注册服务的地址：

- [ip6.arpa 注册地址1](https://tb.netassist.ua)（已不可用）
- [ip6.arpa 注册地址2](https://dns.he.net)
- [ip6.arpa 注册地址3](https://tunnelbroker.net/)

## 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 支持

如有问题或建议，请通过以下方式联系：

- [GitHub 源代码](https://gist.github.com/eooce/d3549e80a67dd39e47a55f81bae6b802)
- [Telegram 群组](https://t.me/eooceu)

---

**免责声明**：此工具仅用于简化 IP6.ARPA 域名的 SSL 证书配置过程。使用者需自行承担使用风险，开发者不对任何因使用此工具而导致的损失负责。
