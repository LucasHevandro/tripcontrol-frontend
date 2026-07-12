export function getRedirectTarget(
    search: string | URLSearchParams | null | undefined,
    fallback = "/trips",
): string {
    const params =
        typeof search === "string"
            ? new URLSearchParams(search)
            : search;

    const redirect = params?.get("redirect")?.trim();
    if (!redirect || !redirect.startsWith("/") || redirect.startsWith("//")) {
        return fallback;
    }

    return redirect;
}

export function getInviteLoginHref(token: string): string {
    return `/login?redirect=${encodeURIComponent(`/join/${token}`)}`;
}
