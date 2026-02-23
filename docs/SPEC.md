# FileConvert — CloudConvert Alternative

Free online file converter. Convert images between formats instantly, right in your browser. No upload needed, 100% private.

## 竞品信息

| 项目 | 值 |
|------|-----|
| 对标竞品 | CloudConvert |
| 竞品 URL | https://cloudconvert.com |
| 预估月流量 | 20M |
| 定价模式 | Freemium (credits based) |

## 核心功能（MVP - 纯前端实现）

### 1. 图片格式转换
- **支持格式**: PNG, JPG/JPEG, WEBP, GIF, BMP, ICO, TIFF
- **实现方式**: Canvas API + Web Workers
- **特点**: 文件不上传服务器，100% 本地处理

### 2. 图片压缩
- 质量调节滑块 (0-100%)
- 实时预览压缩后大小
- 保持/调整分辨率选项

### 3. 图片尺寸调整
- 自定义宽高
- 保持宽高比选项
- 预设尺寸 (社交媒体规格、头像等)

### 4. 批量转换
- 一次处理多个文件
- 统一输出格式
- ZIP 打包下载

## 差异化定位

- ✅ **100% 免费** — 无限制使用，无 credits 系统
- ✅ **无需注册** — 无账号，无登录
- ✅ **隐私第一** — 文件不离开浏览器，无服务器上传
- ✅ **无水印** — 输出无任何品牌标记
- ✅ **即时转换** — 本地处理，无需等待队列

## 截流关键词（🔴 SEO 必用）

### Primary（首页 Title/H1）
- `cloudconvert alternative`
- `cloudconvert free`
- `free file converter online`

### Secondary（独立页面）
- `cloudconvert vs zamzar`
- `best cloudconvert alternatives 2026`
- `online image converter free`

### Long-tail（Programmatic SEO）
- `convert png to jpg online free`
- `png to webp converter no upload`
- `image converter without watermark`
- `cloudconvert alternative no signup`
- `convert {format1} to {format2} free online`

## 技术方案

### 前端
- **框架**: React + Vite (TypeScript)
- **样式**: Tailwind CSS + custom design system
- **图片处理**: Canvas API + Web Workers
- **压缩**: browser-image-compression library
- **ZIP**: JSZip for batch downloads

### 后端 (未来扩展)
- Python FastAPI (for PDF, video conversions)
- ffmpeg-wasm for video (可选前端)

### 部署
- Docker → langsheng
- Ports: Frontend 30120, Backend 30121

## 美学方向

**Industrial Utility** — 工具感、效率感、专业感
- 色彩：深灰 + 橙色警示色 + 白色
- 字体：Mono 字体用于技术信息，Sans 用于 UI
- 布局：清晰的功能分区，拖放区域醒目
- 动画：转换进度条，文件处理状态

## 完成标准

- [x] 图片格式转换可用 (PNG/JPG/WEBP/GIF/BMP)
- [x] 图片压缩可用
- [x] 批量处理可用
- [ ] 部署到 file-converter.demo.densematrix.ai
- [ ] SEO 截流关键词覆盖
- [ ] 7 语言 i18n
- [ ] 95% 测试覆盖率
