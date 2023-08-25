<template>
    <div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
        <TheHeader />
        <main>
            <RouterView />
        </main>
        <TheFooter />
    </div>
</template>
<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
</script>