<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <!-- Header -->
        <header
            class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <div class="flex items-center space-x-3">
                            <div class="p-2 bg-blue-600 rounded-lg">
                                <Icon
                                    name="heroicons:squares-2x2"
                                    class="h-6 w-6 text-white"
                                />
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">
                                    Dashboard
                                </h1>
                                <p class="text-sm text-gray-500">
                                    User Management System
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center space-x-4">
                        <!-- Notifications -->
                        <button
                            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Icon name="heroicons:bell" class="h-6 w-6" />
                        </button>

                        <!-- User Menu -->
                        <div v-if="user" class="flex items-center space-x-3">
                            <div
                                class="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2"
                            >
                                <div
                                    class="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                                >
                                    <span
                                        class="text-sm font-medium text-white"
                                        >{{
                                            user.name.charAt(0).toUpperCase()
                                        }}</span
                                    >
                                </div>
                                <div class="hidden md:block">
                                    <p
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        {{ user.name }}
                                    </p>
                                    <p class="text-xs text-gray-500">
                                        {{ user.email }}
                                    </p>
                                </div>
                            </div>

                            <button
                                @click="logout"
                                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <Icon
                                    name="heroicons:arrow-right-on-rectangle"
                                    class="h-4 w-4 mr-2"
                                />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Stats Cards -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div
                    class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                    <div class="flex items-center">
                        <div class="p-3 bg-blue-100 rounded-lg">
                            <Icon
                                name="heroicons:users"
                                class="h-6 w-6 text-blue-600"
                            />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">
                                Total Users
                            </p>
                            <p class="text-2xl font-bold text-gray-900">
                                {{ users.length }}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                    <div class="flex items-center">
                        <div class="p-3 bg-green-100 rounded-lg">
                            <Icon
                                name="heroicons:user-plus"
                                class="h-6 w-6 text-green-600"
                            />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">
                                Active Users
                            </p>
                            <p class="text-2xl font-bold text-gray-900">
                                {{ users.length }}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                    <div class="flex items-center">
                        <div class="p-3 bg-purple-100 rounded-lg">
                            <Icon
                                name="heroicons:chart-bar"
                                class="h-6 w-6 text-purple-600"
                            />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">
                                Growth
                            </p>
                            <p class="text-2xl font-bold text-gray-900">+12%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <!-- Users Section -->
            <div
                class="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden"
            >
                <div
                    class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6"
                >
                    <div class="flex items-center text-white">
                        <Icon name="heroicons:users" class="h-8 w-8 mr-3" />
                        <div>
                            <h2 class="text-2xl font-bold">User Management</h2>
                            <p class="text-blue-100 mt-1">
                                Manage your application users
                            </p>
                        </div>
                    </div>
                </div>

                <div class="p-8">
                    <!-- Success/Error Messages -->
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

                    <div
                        v-if="error"
                        class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
                    >
                        <div class="flex">
                            <Icon
                                name="heroicons:exclamation-triangle"
                                class="h-5 w-5 text-red-400 mr-2"
                            />
                            <span class="text-sm text-red-800">{{
                                error
                            }}</span>
                        </div>
                    </div>

                    <!-- User Form -->
                    <form @submit.prevent="saveUser" class="mb-10">
                        <div
                            class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200"
                        >
                            <div class="flex items-center justify-between mb-6">
                                <h3
                                    class="text-xl font-semibold text-gray-900 flex items-center"
                                >
                                    <Icon
                                        :name="
                                            editing
                                                ? 'heroicons:pencil-square'
                                                : 'heroicons:user-plus'
                                        "
                                        class="h-6 w-6 mr-3 text-blue-600"
                                    />
                                    {{ editing ? "Edit User" : "Add New User" }}
                                </h3>
                                <div
                                    v-if="editing"
                                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                >
                                    Editing Mode
                                </div>
                            </div>

                            <div
                                class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
                            >
                                <div class="space-y-2">
                                    <label
                                        class="block text-sm font-semibold text-gray-700"
                                        >Full Name</label
                                    >
                                    <div class="relative">
                                        <Icon
                                            name="heroicons:user"
                                            class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                                        />
                                        <input
                                            v-model="form.name"
                                            type="text"
                                            placeholder="Enter full name"
                                            required
                                            class="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                        />
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label
                                        class="block text-sm font-semibold text-gray-700"
                                        >Email Address</label
                                    >
                                    <div class="relative">
                                        <Icon
                                            name="heroicons:envelope"
                                            class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                                        />
                                        <input
                                            v-model="form.email"
                                            type="email"
                                            placeholder="Enter email address"
                                            required
                                            class="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                        />
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label
                                        class="block text-sm font-semibold text-gray-700"
                                    >
                                        Password
                                        {{
                                            editing
                                                ? "(leave blank to keep current)"
                                                : ""
                                        }}
                                    </label>
                                    <div class="relative">
                                        <Icon
                                            name="heroicons:lock-closed"
                                            class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                                        />
                                        <input
                                            v-model="form.password"
                                            type="password"
                                            placeholder="Enter password"
                                            :required="!editing"
                                            class="pl-12 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <button
                                        type="submit"
                                        :disabled="loading"
                                        class="inline-flex items-center px-8 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Icon
                                            v-if="!loading"
                                            :name="
                                                editing
                                                    ? 'heroicons:pencil-square'
                                                    : 'heroicons:plus'
                                            "
                                            class="h-5 w-5 mr-2"
                                        />
                                        <Icon
                                            v-else
                                            name="heroicons:arrow-path"
                                            class="h-5 w-5 mr-2 animate-spin"
                                        />
                                        {{
                                            loading
                                                ? "Processing..."
                                                : editing
                                                ? "Update User"
                                                : "Add User"
                                        }}
                                    </button>

                                    <button
                                        v-if="editing"
                                        type="button"
                                        @click="cancelEdit"
                                        class="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        <Icon
                                            name="heroicons:x-mark"
                                            class="h-5 w-5 mr-2"
                                        />
                                        Cancel
                                    </button>
                                </div>

                                <div class="text-sm text-gray-500">
                                    {{
                                        editing
                                            ? "Editing existing user"
                                            : "Creating new user"
                                    }}
                                </div>
                            </div>
                        </div>
                    </form>

                    <!-- Users List -->
                    <div>
                        <div class="flex items-center justify-between mb-6">
                            <h3
                                class="text-xl font-semibold text-gray-900 flex items-center"
                            >
                                <Icon
                                    name="heroicons:list-bullet"
                                    class="h-6 w-6 mr-3 text-blue-600"
                                />
                                Users Directory
                            </h3>
                            <div class="flex items-center space-x-3">
                                <div class="relative">
                                    <Icon
                                        name="heroicons:magnifying-glass"
                                        class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                                    />
                                    <input
                                        v-model="searchQuery"
                                        type="text"
                                        placeholder="Search users..."
                                        class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <span
                                    class="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg"
                                >
                                    {{ filteredUsers.length }} users
                                </span>
                            </div>
                        </div>

                        <div
                            v-if="filteredUsers && filteredUsers.length > 0"
                            class="grid gap-4"
                        >
                            <div
                                v-for="u in filteredUsers"
                                :key="u.id"
                                class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200"
                            >
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-4">
                                        <div class="relative">
                                            <div
                                                class="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                                            >
                                                <span
                                                    class="text-lg font-bold text-white"
                                                    >{{
                                                        u.name
                                                            .charAt(0)
                                                            .toUpperCase()
                                                    }}</span
                                                >
                                            </div>
                                            <div
                                                class="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"
                                            ></div>
                                        </div>
                                        <div>
                                            <h4
                                                class="text-lg font-semibold text-gray-900"
                                            >
                                                {{ u.name }}
                                            </h4>
                                            <p
                                                class="text-gray-500 flex items-center mt-1"
                                            >
                                                <Icon
                                                    name="heroicons:envelope"
                                                    class="h-4 w-4 mr-2"
                                                />
                                                {{ u.email }}
                                            </p>
                                            <div
                                                class="flex items-center mt-2 space-x-4"
                                            >
                                                <span
                                                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                >
                                                    <Icon
                                                        name="heroicons:check-circle"
                                                        class="h-3 w-3 mr-1"
                                                    />
                                                    Active
                                                </span>
                                                <span
                                                    class="text-xs text-gray-500"
                                                    >ID: #{{ u.id }}</span
                                                >
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex items-center space-x-3">
                                        <button
                                            @click="editUser(u)"
                                            class="inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                        >
                                            <Icon
                                                name="heroicons:pencil"
                                                class="h-4 w-4 mr-2"
                                            />
                                            Edit
                                        </button>
                                        <button
                                            @click="confirmDelete(u)"
                                            :disabled="user && user.id === u.id"
                                            class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Icon
                                                name="heroicons:trash"
                                                class="h-4 w-4 mr-2"
                                            />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="text-center py-16">
                            <div
                                class="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6"
                            >
                                <Icon
                                    name="heroicons:users"
                                    class="h-12 w-12 text-gray-400"
                                />
                            </div>
                            <h3 class="text-xl font-medium text-gray-900 mb-2">
                                {{
                                    searchQuery
                                        ? "No users found"
                                        : "No users yet"
                                }}
                            </h3>
                            <p class="text-gray-500 mb-6">
                                {{
                                    searchQuery
                                        ? "Try adjusting your search terms"
                                        : "Add your first user to get started!"
                                }}
                            </p>
                            <button
                                v-if="!searchQuery"
                                @click="scrollToForm"
                                class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                <Icon
                                    name="heroicons:plus"
                                    class="h-4 w-4 mr-2"
                                />
                                Add First User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Delete Confirmation Modal -->
        <div
            v-if="showDeleteModal"
            class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center"
        >
            <div
                class="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
            >
                <div class="text-center">
                    <div
                        class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
                    >
                        <Icon
                            name="heroicons:exclamation-triangle"
                            class="h-6 w-6 text-red-600"
                        />
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">
                        Delete User
                    </h3>
                    <p class="text-sm text-gray-500 mb-6">
                        Are you sure you want to delete
                        <strong>{{ userToDelete?.name }}</strong
                        >? This action cannot be undone.
                    </p>
                    <div class="flex space-x-3 justify-center">
                        <button
                            @click="showDeleteModal = false"
                            class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            @click="deleteUser(userToDelete.id)"
                            class="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import type { User } from "../types/user";

const router = useRouter();
const user = ref<User | null>(null);
const users = ref<User[]>([]);
const form = ref<User>({ id: 0, name: "", email: "", password: "" });
const editing = ref(false);
const error = ref<string>("");
const successMessage = ref<string>("");
const loading = ref(false);
const searchQuery = ref("");
const showDeleteModal = ref(false);
const userToDelete = ref<User | null>(null);

const fetchUser = async () => {
    if (!process.client) return;

    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/login");
        return;
    }

    try {
        const response = await axios.get("http://localhost:8000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            withCredentials: true,
        });
        user.value = response.data;
    } catch (error) {
        console.error("Fetch user failed", error);
        router.push("/login");
    }
};

const fetchUsers = async () => {
    if (!process.client) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const response = await axios.get("http://localhost:8000/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            withCredentials: true,
        });
        users.value = response.data;
    } catch (error) {
        console.error("Fetch users failed", error);
    }
};

const saveUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    loading.value = true;
    error.value = "";
    successMessage.value = "";

    const payload: any = {
        name: form.value.name,
        email: form.value.email,
    };
    if (form.value.password) {
        payload.password = form.value.password;
    }

    try {
        if (editing.value) {
            await axios.put(
                `http://localhost:8000/api/users/${form.value.id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            successMessage.value = "User updated successfully!";
        } else {
            await axios.post("http://localhost:8000/api/users", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            successMessage.value = "User created successfully!";
        }

        form.value = { id: 0, name: "", email: "", password: "" };
        editing.value = false;
        fetchUsers();

        // Clear success message after 3 seconds
        setTimeout(() => {
            successMessage.value = "";
        }, 3000);
    } catch (error: any) {
        console.error("Save user failed", error);
        error.value = error.response?.data?.message || "Failed to save user";
    } finally {
        loading.value = false;
    }
};

const editUser = (u: User) => {
    form.value = { ...u, password: "" };
    editing.value = true;
    error.value = "";
    successMessage.value = "";
    scrollToForm();
};

const cancelEdit = () => {
    form.value = { id: 0, name: "", email: "", password: "" };
    editing.value = false;
    error.value = "";
    successMessage.value = "";
};

const confirmDelete = (u: User) => {
    userToDelete.value = u;
    showDeleteModal.value = true;
};

const deleteUser = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (user.value && user.value.id === id) {
        error.value = "Cannot delete current user";
        showDeleteModal.value = false;
        return;
    }

    try {
        await axios.delete(`http://localhost:8000/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        successMessage.value = "User deleted successfully!";
        error.value = "";
        fetchUsers();
        showDeleteModal.value = false;

        // Clear success message after 3 seconds
        setTimeout(() => {
            successMessage.value = "";
        }, 3000);
    } catch (error: any) {
        console.error("Delete user failed", error);
        error.value = error.response?.data?.message || "Failed to delete user";
        showDeleteModal.value = false;
    }
};

const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
        await axios.post(
            "http://localhost:8000/api/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );
        localStorage.removeItem("token");
        router.push("/login");
    } catch (error) {
        console.error("Logout failed", error);
    }
};

const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// Computed property for filtered users
const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;
    return users.value.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

onMounted(() => {
    fetchUser();
    fetchUsers();
});
</script>
