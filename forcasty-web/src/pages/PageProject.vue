<template>
    <div>
        <div v-if="!isLoading" class="grid gap-4">
            <div>
                <h1 class="font-bold text-4xl">Project: {{ project?.name }}</h1>
                <div class="font-bold text-sm">id: {{ id }}</div>
            </div>
            <ChartForcast v-if="project?.timeline" :data="project?.timeline" />
            <div class="flex flex-col sm:flex-row gap-2">
                <RouterLink :to="`/projects/${id}/edit`" class="btn btn-primary">Edit Project</RouterLink>
                <RouterLink :to="`/projects/${id}/members`" class="btn btn-secondary">Members</RouterLink>
                <ButtonDelete :onDelete="onDelete">Delete Project</ButtonDelete>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { forcastyApi } from '../api/forcasty.api';
import { useRouter } from 'vue-router';
import { getAuth } from 'firebase/auth';

const ChartForcast = defineAsyncComponent(() => import('../components/ChartForcast.vue'))
const ButtonDelete = defineAsyncComponent(() => import('../components/ButtonDelete.vue'))

const props = defineProps<{
  id: string
}>()

const auth = getAuth()
const isLoading = ref(true)

const router = useRouter()

const project = ref<Awaited<ReturnType<typeof forcastyApi.projects.id.get>>>()

const loadProject = async () => {
    const token = await auth.currentUser?.getIdToken()
    if(!token) return
    project.value = await forcastyApi.projects.id.get(props.id, token)
    isLoading.value = false
}

const onDelete = async () => {
    const token = await auth.currentUser?.getIdToken()
    if(!token) return

    try {
        await forcastyApi.projects.id.delete(props.id, token);
        router.push('/')
    } catch {

    }
}

loadProject()
</script>