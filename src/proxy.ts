import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login'];
const PROTECTED_PREFIXES = ['/trips', '/profile'];

// Origem da API — usada na diretiva connect-src do CSP
const apiOrigin = (() => {
    try {
        return new URL(
            process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1',
        ).origin;
    } catch {
        return 'http://localhost:3001';
    }
})();

function buildCsp(nonce: string): string {
    return [
        `default-src 'self'`,
        `script-src 'self' 'nonce-${nonce}' https://accounts.google.com`,
        `style-src 'self' 'unsafe-inline'`,
        `img-src 'self' data: https:`,
        `font-src 'self' data:`,
        `connect-src 'self' ${apiOrigin} https://accounts.google.com https://photon.komoot.io`,
        `frame-src https://accounts.google.com`,
        `object-src 'none'`,
        `base-uri 'self'`,
        `form-action 'self'`,
        `frame-ancestors 'self'`,
    ].join('; ');
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublic = PUBLIC_ROUTES.some((route) => pathname === route);
    const isProtected = PROTECTED_PREFIXES.some((prefix) =>
        pathname.startsWith(prefix),
    );

    // Middleware roda no servidor e não tem acesso a localStorage, então lemos o
    // cookie espelho que LocalStorageTokenAdapter grava a cada login (ver local-storage-token.adapter.ts)
    const accessToken = request.cookies.get('tc_access_token')?.value;

    // Rota protegida sem token → redireciona pro login
    if (isProtected && !accessToken) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Já está logado e tenta acessar /login → redireciona pra /trips
    if (isPublic && accessToken) {
        return NextResponse.redirect(new URL('/trips', request.url));
    }

    // Gera um nonce criptográfico por request e injeta no CSP
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const csp = buildCsp(nonce);

    const requestHeaders = new Headers(request.headers);
    // O layout (Server Component) lê esse header via headers() para obter o nonce
    requestHeaders.set('x-csp-nonce', nonce);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });

    response.headers.set('Content-Security-Policy', csp);
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
}

export const config = {
    matcher: [
        /*
         * Aplica o middleware em todas as rotas exceto:
         * - _next/static (arquivos estáticos)
         * - _next/image (otimização de imagens)
         * - favicon.ico
         * - api/ (rotas de API internas do Next.js)
         */
        '/((?!_next/static|_next/image|favicon.ico|api/).*)',
    ],
};