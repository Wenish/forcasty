<template>
    <div class="grid [&>*:not(:first-child)]:border-t">
        <RouterLink
            v-for="item of list" :key="item._id" :to="`/projects/${item._id}`"
            class="bg-neutral text-neutral-content p-4 border-neutral-focus hover:bg-neutral-focus grid grid-cols-[1fr_auto] justify-between group transition-colors duration-300"
        >
            <div class="font-bold text-sm pl-0 group-hover:pl-2 transition-all duration-300 truncate">{{ item.name}}</div>
            <div class="flex gap-1 items-center">
                <div v-for="index in item.timeline.length" :key="index" class="h-2 w-2 bg-neutral-focus rounded-full group-hover:bg-neutral transition-colors duration-1000"></div>
            </div>
        </RouterLink>
    </div>
</template>
<script setup lang="ts">
import { Project } from '../api/forcasty.api';

defineProps<{
    list: Project[] | undefined
}>()
</script>