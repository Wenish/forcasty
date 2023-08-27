<template>
    <div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <TheHeader class="w-full max-w-7xl mx-auto sticky top-0 z-50 border-b border-secondary" />
        <main class="w-full max-w-7xl mx-auto px-2 py-4 md:p-4 lg:p-8 transition-all">
            <RouterView />
        </main>
        <TheFooter class="w-full max-w-7xl mx-auto" />
    </div>
</template>
<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
</script>