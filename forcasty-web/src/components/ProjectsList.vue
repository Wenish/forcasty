<template>
    <div class="grid gap-8">
        <div v-for="item of list" :key="item._id" class="grid gap-4">
            <h2 class="font-bold text-4xl">{{ item.name }}</h2>
            <ChartForcast :data="item.timeline" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const ChartForcast = defineAsyncComponent(() => import('./ChartForcast.vue'))

defineProps<{
    list: {
        _id: string
        name: string
        timeline: {
            effort: number
            done: number
        }[]
    }[]
}>()
</script>