export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return; // Hanya jalankan di client-side

    const token = localStorage.getItem("token");
    console.log("Auth:", token, "To:", to.path, "From:", from.path); // Debug

    if (token && to.path !== "/dashboard") {
        return navigateTo("/dashboard");
    }

    if (!token && to.path !== "/login" && to.path !== "/register") {
        return navigateTo("/login");
    }
});
