<template>
    <div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <TheHeader class="w-full max-w-7xl mx-auto" />
        <main class="w-full max-w-7xl mx-auto p-0 md:p-4 lg:p-8">
            <RouterView />
        </main>
        <TheFooter class="w-full max-w-7xl mx-auto" />
    </div>
</template>
<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
</script>