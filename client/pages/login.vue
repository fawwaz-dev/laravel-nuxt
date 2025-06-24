<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
        <!-- Background Pattern -->
        <div class="absolute inset-0 overflow-hidden">
            <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
            ></div>
            <div
                class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
            ></div>
            <div
                class="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
            ></div>
        </div>

        <div class="relative max-w-md w-full space-y-8">
            <!-- Logo/Header Section -->
            <div class="text-center">
                <div
                    class="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                    <Icon
                        name="heroicons:squares-2x2"
                        class="h-8 w-8 text-white"
                    />
                </div>
                <h2 class="mt-6 text-3xl font-bold text-gray-900">
                    Welcome back
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Sign in to your account to continue
                </p>
            </div>

            <!-- Login Form -->
            <div
                class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8"
            >
                <!-- Error Message -->
                <div
                    v-if="error"
                    class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
                >
                    <div class="flex">
                        <Icon
                            name="heroicons:exclamation-triangle"
                            class="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5"
                        />
                        <div>
                            <h3 class="text-sm font-medium text-red-800">
                                Login Failed
                            </h3>
                            <p class="text-sm text-red-700 mt-1">{{ error }}</p>
                        </div>
                    </div>
                </div>

                <!-- Success Message -->
                <div
                    v-if="successMessage"
                    class="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
                >
                    <div class="flex">
                        <Icon
                            name="heroicons:check-circle"
                            class="h-5 w-5 text-green-400 mr-2"
                        />
                        <span class="text-sm text-green-800">{{
                            successMessage
                        }}</span>
                    </div>
                </div>

                <form @submit.prevent="login" class="space-y-6">
                    <!-- Email Field -->
                    <div>
                        <label
                            for="email"
                            class="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Email Address
                        </label>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                            >
                                <Icon
                                    name="heroicons:envelope"
                                    class="h-5 w-5 text-gray-400"
                                />
                            </div>
                            <input
                                id="email"
                                v-model="form.email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                :disabled="loading"
                                class="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label
                            for="password"
                            class="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Password
                        </label>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                            >
                                <Icon
                                    name="heroicons:lock-closed"
                                    class="h-5 w-5 text-gray-400"
                                />
                            </div>
                            <input
                                id="password"
                                v-model="form.password"
                                :type="showPassword ? 'text' : 'password'"
                                placeholder="Enter your password"
                                required
                                :disabled="loading"
                                class="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                            />
                            <button
                                type="button"
                                @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 pr-4 flex items-center"
                                :disabled="loading"
                            >
                                <Icon
                                    :name="
                                        showPassword
                                            ? 'heroicons:eye-slash'
                                            : 'heroicons:eye'
                                    "
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                                />
                            </button>
                        </div>
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                id="remember-me"
                                v-model="rememberMe"
                                type="checkbox"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                            />
                            <label
                                for="remember-me"
                                class="ml-2 block text-sm text-gray-700"
                            >
                                Remember me
                            </label>
                        </div>
                        <div class="text-sm">
                            <a
                                href="#"
                                class="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <!-- Login Button -->
                    <div>
                        <button
                            type="submit"
                            :disabled="loading || !form.email || !form.password"
                            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <span
                                class="absolute left-0 inset-y-0 flex items-center pl-3"
                            >
                                <Icon
                                    v-if="!loading"
                                    name="heroicons:arrow-right-on-rectangle"
                                    class="h-5 w-5 text-white/80 group-hover:text-white transition-colors"
                                />
                                <Icon
                                    v-else
                                    name="heroicons:arrow-path"
                                    class="h-5 w-5 text-white animate-spin"
                                />
                            </span>
                            {{ loading ? "Signing in..." : "Sign in" }}
                        </button>
                    </div>
                </form>

                <!-- Divider -->
                <div class="mt-8">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500"
                                >Or continue with</span
                            >
                        </div>
                    </div>

                    <!-- Social Login Buttons -->
                    <div class="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            class="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            <Icon
                                name="heroicons:globe-alt"
                                class="h-5 w-5 text-gray-400"
                            />
                            <span class="ml-2">Google</span>
                        </button>
                        <button
                            type="button"
                            class="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            <Icon
                                name="heroicons:device-phone-mobile"
                                class="h-5 w-5 text-gray-400"
                            />
                            <span class="ml-2">GitHub</span>
                        </button>
                    </div>
                </div>

                <!-- Sign Up Link -->
                <div class="mt-8 text-center">
                    <p class="text-sm text-gray-600">
                        Don't have an account?
                        <a
                            href="/register"
                            class="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            Sign up now
                        </a>
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center">
                <p class="text-xs text-gray-500">
                    By signing in, you agree to our
                    <a href="#" class="text-blue-600 hover:text-blue-500"
                        >Terms of Service</a
                    >
                    and
                    <a href="#" class="text-blue-600 hover:text-blue-500"
                        >Privacy Policy</a
                    >
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
definePageMeta({
    middleware: ["guest"],
});

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const form = ref({ email: "", password: "" });
const loading = ref(false);
const error = ref("");
const successMessage = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);

const login = async () => {
    loading.value = true;
    error.value = "";
    successMessage.value = "";

    try {
        const response = await axios.post(
            "http://localhost:8000/api/login",
            form.value,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        // Store token
        localStorage.setItem("token", response.data.token);

        // Store remember me preference
        if (rememberMe.value) {
            localStorage.setItem("remember_me", "true");
        }

        successMessage.value = "Login successful! Redirecting...";

        // Redirect after a short delay to show success message
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    } catch (error: any) {
        console.error("Login failed", error);

        if (error.response?.status === 401) {
            error.value = "Invalid email or password. Please try again.";
        } else if (error.response?.status === 422) {
            error.value = "Please check your input and try again.";
        } else if (error.response?.data?.message) {
            error.value = error.response.data.message;
        } else {
            error.value =
                "Login failed. Please check your connection and try again.";
        }
    } finally {
        loading.value = false;
    }
};

// Auto-fill email if remembered
onMounted(() => {
    const rememberedEmail = localStorage.getItem("remembered_email");
    if (rememberedEmail) {
        form.value.email = rememberedEmail;
        rememberMe.value = true;
    }
});
</script>

<style scoped>
@keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }
    33% {
        transform: translate(30px, -50px) scale(1.1);
    }
    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
        transform: translate(0px, 0px) scale(1);
    }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

/* Custom focus styles */
input:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
    .backdrop-blur-sm {
        backdrop-filter: blur(10px);
    }
}
</style>
