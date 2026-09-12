import type { NextConfig } from "next";

// Cabeçalhos de segurança (CSP com nonce, X-Frame-Options, Referrer-Policy)
// são definidos em src/proxy.ts, que roda por request e consegue gerar o nonce.
// Defini-los aqui também faria o navegador aplicar a interseção das duas
// políticas, bloqueando scripts que só constam em uma delas.
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;