<template>
    <header class="navbar bg-base-100 h-[68px]">
        <div class="flex-1">
            <RouterLink class="btn btn-ghost normal-case text-xl" to="/">
                <img src="../assets/spyglass.png" class="h-[32px]" />
                <div class="font-bold">Forcasty</div>
            </RouterLink>
        </div>
        <div class="flex-none gap-2">
            <div class="group dropdown dropdown-end" v-if="isAuthenticated">
                <label tabindex="0" class="btn btn-lg btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full p-0.5">
                        <img src="../assets/user.png" />
                    </div>
                </label>
                <ul class="mt-3 z-20 p-2 shadow border border-base-200/50 menu menu-lg dropdown-content bg-base-100 rounded-box w-52">
                    <li class="menu-title break-all text-transparent group-focus-within:menu-title transition-all">{{ user?.displayName }}</li>
                    <!-- 
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    -->
                    <li><RouterLink to="/logout" class="text-sm group-focus-within:text-lg transition-all py-0 group-focus-within:py-2 text-transparent group-focus-within:text-base-content">Logout</RouterLink></li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { getAuth } from 'firebase/auth'
import { useAuth } from '@vueuse/firebase/useAuth'

const auth = getAuth();
const { isAuthenticated, user } = useAuth(auth)
</script>