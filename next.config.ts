import type { NextConfig } from "next";

const apiOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1").origin;
  } catch {
    return "http://localhost:3001";
  }
})();

// Hash do script de tema em src/app/layout.tsx (const themeScript) — se o conteúdo do
// script mudar, recalcular com:
// node -e "console.log('sha256-' + require('crypto').createHash('sha256').update(require('fs').readFileSync('src/app/layout.tsx','utf8').match(/const themeScript = `([\s\S]*?)`;/)[1]).digest('base64'))"
const THEME_SCRIPT_HASH = "sha256-6fVYNlJh3s5kJLeKZ0844boQh6C20pEbMdKZJjhFr90=";

const csp = [
  `default-src 'self'`,
  `script-src 'self' '${THEME_SCRIPT_HASH}' https://accounts.google.com`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: https:`,
  `font-src 'self' data:`,
  `connect-src 'self' ${apiOrigin} https://accounts.google.com`,
  `frame-src https://accounts.google.com`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'self'`,
].join("; ");

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
