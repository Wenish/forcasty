<template>
    <div>
        <div v-if="!isLoading" class="grid gap-4">
            <div>
                <h1 class="font-bold text-4xl">Project: {{ project?.name }}</h1>
                <div class="font-bold text-sm">id: {{ id }}</div>
            </div>
            <ChartForcast v-if="project?.timeline" :data="project?.timeline" />
            <div class="flex gap-2">
                <ButtonDelete :onDelete="onDelete">Delete Project</ButtonDelete>
                <RouterLink :to="`/projects/${id}/edit`" class="btn btn-primary">Edit Project</RouterLink>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { forcastyApi } from '../api/forcasty.api';
import { useRouter } from 'vue-router';

const ChartForcast = defineAsyncComponent(() => import('../components/ChartForcast.vue'))
const ButtonDelete = defineAsyncComponent(() => import('../components/ButtonDelete.vue'))

const props = defineProps<{
  id: string
}>()

const isLoading = ref(true)

const router = useRouter()

const project = ref<Awaited<ReturnType<typeof forcastyApi.projects.id.get>>>()

const loadProject = async () => {
    project.value = await forcastyApi.projects.id.get(props.id)
    isLoading.value = false
}

const onDelete = async () => {
    console.log('delete')
    try {
        await forcastyApi.projects.id.delete(props.id);
        router.push('/')
    } catch {

    }
}

loadProject()
</script>