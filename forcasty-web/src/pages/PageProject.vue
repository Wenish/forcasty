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
import { projectMock } from "../data/project.mock";

const ChartForcast = defineAsyncComponent(() => import('../components/ChartForcast.vue'))

defineProps<{
  id: string
}>()

const project = ref<typeof projectMock>()

const loadProject = async () => {
    await new Promise(r => setTimeout(r, 100));
    project.value = projectMock
}

loadProject()
</script>