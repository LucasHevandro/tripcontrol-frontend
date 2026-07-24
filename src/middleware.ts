import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login'];
const PROTECTED_PREFIXES = ['/trips', '/profile'];

export function middleware(request: NextRequest) {
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