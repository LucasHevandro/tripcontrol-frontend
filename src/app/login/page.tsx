import { Suspense } from "react";
import LoginForm from "./login-form";

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center bg-[#f7f6f1] dark:bg-neutral-950 text-neutral-500">
                <span className="text-sm font-medium">Carregando...</span>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}