<template>
    <div class="grid gap-2">
        <h2 class="font-bold text-2xl">Projects</h2>
        <RouterLink
            to="/project-new"
            class="bg-primary text-primary-content py-2 px-4 hover:bg-primary-focus group transition-colors duration-300"
        >
            <div class="text-sm font-bold pl-0 group-hover:pl-2 transition-all duration-300">New Project</div>
        </RouterLink>
        <div class="grid [&>*:not(:first-child)]:border-t">
            <RouterLink
                v-for="item of list" :key="item._id" :to="`/projects/${item._id}`"
                class="bg-neutral text-neutral-content p-4 border-neutral-focus hover:bg-neutral-focus flex justify-between group transition-colors duration-300"
            >
                <div class="font-bold text-sm pl-0 group-hover:pl-2 transition-all duration-300">{{ item.name}}</div>
                <div class="flex gap-1 items-center">
                    <div v-for="index in item.timeline.length" :key="index" class="h-2 w-2 bg-neutral-focus rounded-full group-hover:bg-neutral transition-colors duration-1000"></div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>
<script setup lang="ts">

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