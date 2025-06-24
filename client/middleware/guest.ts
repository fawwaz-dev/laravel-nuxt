export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return;

    const token = localStorage.getItem("token");
    console.log("Guest middleware, Token:", token);

    if (token && (to.path === "/login" || to.path === "/register")) {
        return navigateTo("/dashboard");
    }
});
