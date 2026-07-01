import { NextRequest, NextResponse } from 'next/server';

// Rotas que não precisam de autenticação
const PUBLIC_ROUTES = ['/login'];

// Prefixos de rotas protegidas
const PROTECTED_PREFIXES = ['/trips', '/profile'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublic = PUBLIC_ROUTES.some((route) => pathname === route);
    const isProtected = PROTECTED_PREFIXES.some((prefix) =>
        pathname.startsWith(prefix),
    );

    // Lê o token do localStorage via cookie — o adapter precisa de ajuste (ver abaixo)
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

    return NextResponse.next();
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