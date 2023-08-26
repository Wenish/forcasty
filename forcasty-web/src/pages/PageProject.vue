<template>
    <div>
        <div>
            <h1 class="font-bold text-4xl">Project: {{ project?.name }}</h1>
            <div class="font-bold text-sm">id: {{ id }}</div>
            <ChartForcast v-if="project?.timeline" :data="project?.timeline" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { forcastyApi } from '../api/forcasty.api';

const ChartForcast = defineAsyncComponent(() => import('../components/ChartForcast.vue'))

const props = defineProps<{
  id: string
}>()

const project = ref<Awaited<ReturnType<typeof forcastyApi.projects.id.get>>>()

const loadProject = async () => {
    project.value = await forcastyApi.projects.id.get(props.id)
}

loadProject()
</script>