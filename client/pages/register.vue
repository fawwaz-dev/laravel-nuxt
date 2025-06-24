<template>
    <div
        class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
        <!-- Background Pattern -->
        <div class="absolute inset-0 overflow-hidden h-full">
            <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
            ></div>
            <div
                class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
            ></div>
            <div
                class="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
            ></div>
        </div>

        <div class="relative max-w-md w-full space-y-8">
            <!-- Logo/Header Section -->
            <div class="text-center">
                <div
                    class="mx-auto h-16 w-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                    <Icon
                        name="heroicons:user-plus"
                        class="h-8 w-8 text-white"
                    />
                </div>
                <h2 class="mt-6 text-3xl font-bold text-gray-900">
                    Create your account
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Join us today and get started in minutes
                </p>
            </div>

            <!-- Register Form -->
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
                                Registration Failed
                            </h3>
                            <div class="text-sm text-red-700 mt-1">
                                <div v-if="typeof error === 'string'">
                                    {{ error }}
                                </div>
                                <ul
                                    v-else
                                    class="list-disc list-inside space-y-1"
                                >
                                    <li
                                        v-for="(messages, field) in error"
                                        :key="field"
                                    >
                                        <span class="font-medium capitalize"
                                            >{{ field }}:</span
                                        >
                                        <span
                                            v-for="message in messages"
                                            :key="message"
                                        >
                                            {{ message }}</span
                                        >
                                    </li>
                                </ul>
                            </div>
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

                <form @submit.prevent="register" class="space-y-6">
                    <!-- Name Field -->
                    <div>
                        <label
                            for="name"
                            class="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Full Name
                        </label>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                            >
                                <Icon
                                    name="heroicons:user"
                                    class="h-5 w-5 text-gray-400"
                                />
                            </div>
                            <input
                                id="name"
                                v-model="form.name"
                                type="text"
                                placeholder="Enter your full name"
                                required
                                :disabled="loading"
                                :class="[
                                    'block w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed',
                                    fieldErrors.name
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300',
                                ]"
                                @input="clearFieldError('name')"
                            />
                        </div>
                        <p
                            v-if="fieldErrors.name"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ fieldErrors.name[0] }}
                        </p>
                    </div>

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
                                :class="[
                                    'block w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed',
                                    fieldErrors.email
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300',
                                ]"
                                @input="clearFieldError('email')"
                            />
                        </div>
                        <p
                            v-if="fieldErrors.email"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ fieldErrors.email[0] }}
                        </p>
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
                                placeholder="Create a strong password"
                                required
                                :disabled="loading"
                                :class="[
                                    'block w-full pl-12 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed',
                                    fieldErrors.password
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300',
                                ]"
                                @input="clearFieldError('password')"
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
                        <p
                            v-if="fieldErrors.password"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ fieldErrors.password[0] }}
                        </p>

                        <!-- Password Strength Indicator -->
                        <div v-if="form.password" class="mt-2">
                            <div class="flex items-center space-x-2">
                                <div
                                    class="flex-1 bg-gray-200 rounded-full h-2"
                                >
                                    <div
                                        :class="[
                                            'h-2 rounded-full transition-all duration-300',
                                            passwordStrength.color,
                                        ]"
                                        :style="{
                                            width: passwordStrength.width,
                                        }"
                                    ></div>
                                </div>
                                <span
                                    :class="[
                                        'text-xs font-medium',
                                        passwordStrength.textColor,
                                    ]"
                                >
                                    {{ passwordStrength.text }}
                                </span>
                            </div>
                            <div class="mt-2 text-xs text-gray-600">
                                <p>Password should contain:</p>
                                <ul
                                    class="list-disc list-inside space-y-1 mt-1"
                                >
                                    <li
                                        :class="
                                            form.password.length >= 8
                                                ? 'text-green-600'
                                                : 'text-gray-500'
                                        "
                                    >
                                        At least 8 characters
                                    </li>
                                    <li
                                        :class="
                                            /[A-Z]/.test(form.password)
                                                ? 'text-green-600'
                                                : 'text-gray-500'
                                        "
                                    >
                                        One uppercase letter
                                    </li>
                                    <li
                                        :class="
                                            /[0-9]/.test(form.password)
                                                ? 'text-green-600'
                                                : 'text-gray-500'
                                        "
                                    >
                                        One number
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Confirm Password Field -->
                    <div>
                        <label
                            for="password_confirmation"
                            class="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Confirm Password
                        </label>
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                            >
                                <Icon
                                    name="heroicons:shield-check"
                                    class="h-5 w-5 text-gray-400"
                                />
                            </div>
                            <input
                                id="password_confirmation"
                                v-model="form.password_confirmation"
                                :type="
                                    showConfirmPassword ? 'text' : 'password'
                                "
                                placeholder="Confirm your password"
                                required
                                :disabled="loading"
                                :class="[
                                    'block w-full pl-12 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed',
                                    passwordMismatch
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300',
                                ]"
                            />
                            <button
                                type="button"
                                @click="
                                    showConfirmPassword = !showConfirmPassword
                                "
                                class="absolute inset-y-0 right-0 pr-4 flex items-center"
                                :disabled="loading"
                            >
                                <Icon
                                    :name="
                                        showConfirmPassword
                                            ? 'heroicons:eye-slash'
                                            : 'heroicons:eye'
                                    "
                                    class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                                />
                            </button>
                        </div>
                        <p
                            v-if="
                                passwordMismatch && form.password_confirmation
                            "
                            class="mt-1 text-sm text-red-600"
                        >
                            Passwords do not match
                        </p>
                    </div>

                    <!-- Terms and Conditions -->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input
                                id="terms"
                                v-model="acceptTerms"
                                type="checkbox"
                                required
                                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded transition-colors"
                            />
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="terms" class="text-gray-700">
                                I agree to the
                                <a
                                    href="#"
                                    class="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                                >
                                    Terms of Service
                                </a>
                                and
                                <a
                                    href="#"
                                    class="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </label>
                        </div>
                    </div>

                    <!-- Register Button -->
                    <div>
                        <button
                            type="submit"
                            :disabled="loading || !isFormValid"
                            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <span
                                class="absolute left-0 inset-y-0 flex items-center pl-3"
                            >
                                <Icon
                                    v-if="!loading"
                                    name="heroicons:user-plus"
                                    class="h-5 w-5 text-white/80 group-hover:text-white transition-colors"
                                />
                                <Icon
                                    v-else
                                    name="heroicons:arrow-path"
                                    class="h-5 w-5 text-white animate-spin"
                                />
                            </span>
                            {{
                                loading
                                    ? "Creating account..."
                                    : "Create account"
                            }}
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
                                >Or sign up with</span
                            >
                        </div>
                    </div>

                    <!-- Social Register Buttons -->
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

                <!-- Sign In Link -->
                <div class="mt-8 text-center">
                    <p class="text-sm text-gray-600">
                        Already have an account?
                        <a
                            href="/login"
                            class="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                        >
                            Sign in here
                        </a>
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center">
                <p class="text-xs text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" class="text-purple-600 hover:text-purple-500"
                        >Terms of Service</a
                    >
                    and
                    <a href="#" class="text-purple-600 hover:text-purple-500"
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

import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const form = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});

const loading = ref(false);
const error = ref<string | object>("");
const successMessage = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const acceptTerms = ref(false);
const fieldErrors = ref<Record<string, string[]>>({});

// Password strength computation
const passwordStrength = computed(() => {
    const password = form.value.password;
    if (!password)
        return {
            width: "0%",
            color: "bg-gray-300",
            text: "",
            textColor: "text-gray-500",
        };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2)
        return {
            width: "33%",
            color: "bg-red-500",
            text: "Weak",
            textColor: "text-red-600",
        };
    if (score <= 3)
        return {
            width: "66%",
            color: "bg-yellow-500",
            text: "Medium",
            textColor: "text-yellow-600",
        };
    return {
        width: "100%",
        color: "bg-green-500",
        text: "Strong",
        textColor: "text-green-600",
    };
});

// Password mismatch check
const passwordMismatch = computed(() => {
    return (
        form.value.password !== form.value.password_confirmation &&
        form.value.password_confirmation.length > 0
    );
});

// Form validation
const isFormValid = computed(() => {
    return (
        form.value.name &&
        form.value.email &&
        form.value.password &&
        form.value.password_confirmation &&
        !passwordMismatch.value &&
        acceptTerms.value
    );
});

const clearFieldError = (field: string) => {
    if (fieldErrors.value[field]) {
        delete fieldErrors.value[field];
    }
    if (typeof error.value === "object" && error.value[field]) {
        delete error.value[field];
    }
};

const register = async () => {
    loading.value = true;
    error.value = "";
    successMessage.value = "";
    fieldErrors.value = {};

    try {
        localStorage.removeItem("token");

        const response = await axios.post(
            "http://localhost:8000/api/register",
            form.value,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        localStorage.setItem("token", response.data.token);
        successMessage.value = "Account created successfully! Redirecting...";

        // Redirect after a short delay to show success message
        setTimeout(() => {
            router.push("/dashboard");
        }, 1500);
    } catch (error: any) {
        console.error("Register failed", error);

        if (error.response?.status === 422) {
            // Validation errors
            fieldErrors.value = error.response.data.errors || {};
            error.value =
                error.response.data.errors ||
                "Please check your input and try again.";
        } else if (error.response?.data?.message) {
            error.value = error.response.data.message;
        } else {
            error.value =
                "Registration failed. Please check your connection and try again.";
        }
    } finally {
        loading.value = false;
    }
};
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
    box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
    .backdrop-blur-sm {
        backdrop-filter: blur(10px);
    }
}
</style>
