"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";

export function GoogleAuthProvider({ children, nonce }: { children: ReactNode; nonce?: string }) {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    // Se o Client ID não estiver configurado, não quebra o app —
    // apenas o login com Google fica indisponível
    if (!clientId) {
        return <>{children}</>;
    }

    return (
        <GoogleOAuthProvider clientId={clientId} nonce={nonce}>
            {children}
        </GoogleOAuthProvider>
    );
}