export function getXsrfTokenFromCookie(): string | null {
    const name = "XSRF-TOKEN=";
    const cookies = decodeURIComponent(document.cookie).split(";");
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name)) {
            return decodeURIComponent(cookie.substring(name.length));
        }
    }
    return null;
}
