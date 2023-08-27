<template>
    <header class="navbar bg-base-100 h-[68px]">
        <div class="flex-1">
            <RouterLink class="btn btn-ghost normal-case text-xl" to="/">
                <img src="../assets/spyglass.png" class="h-[32px]" />
                <div class="font-bold">Forcasty</div>
            </RouterLink>
        </div>
        <div class="flex-none gap-2">
            <div class="dropdown dropdown-end" v-if="isAuthenticated">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="../assets/user.png" />
                    </div>
                </label>
                <ul tabindex="0" class="mt-3 z-20 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li class="menu-title">{{ user?.displayName }}</li>
                    <!-- 
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    -->
                    <li><RouterLink to="/logout">Logout</RouterLink></li>
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