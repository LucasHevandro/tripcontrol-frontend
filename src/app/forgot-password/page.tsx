import { Suspense } from "react";
import ForgotPasswordForm from "./forgot-password-form";

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center text-neutral-500">
                <span className="text-sm font-medium">Carregando...</span>
            </div>
        }>
            <ForgotPasswordForm />
        </Suspense>
    );
}