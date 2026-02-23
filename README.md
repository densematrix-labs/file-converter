# FileConvert — CloudConvert Alternative

Free online image converter. Convert PNG, JPG, WEBP, GIF and more formats instantly in your browser.

🔗 **Live Demo:** https://file-converter.demo.densematrix.ai

## Features

- **100% Client-Side** — Files never leave your browser
- **No Upload Required** — All processing happens locally
- **Multiple Formats** — PNG, JPG, WEBP, GIF, BMP support
- **Batch Conversion** — Convert multiple files at once
- **Quality Control** — Adjust compression quality
- **Resize Options** — Change dimensions with aspect ratio lock
- **7 Languages** — English, 中文, 日本語, Deutsch, Français, 한국어, Español

## Why FileConvert?

| Feature | FileConvert | CloudConvert |
|---------|-------------|--------------|
| Price | Free | Credit-based |
| Privacy | 100% local | Server upload |
| Signup | Not required | Required for features |
| Watermark | None | None |

## Development

```bash
cd frontend
npm install
npm run dev
```

## Testing

```bash
npm run test           # Run tests
npm run test:coverage  # Run with coverage
```

## Docker Deployment

```bash
docker compose up -d
```

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Canvas API for image processing
- JSZip for batch downloads
- i18next for internationalization

## License

MIT
