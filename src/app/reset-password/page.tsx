import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen w-full items-center justify-center text-neutral-500">
                <span className="text-sm font-medium">Carregando...</span>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}