<template>
    <div>
        <div v-if="!isLoading" class="grid gap-4  w-full max-w-md mx-auto">
            <div>
                <h1>
                    <RouterLink :to="`/projects/${id}`" class="hover:underline">{{ project?.name }}</RouterLink>
                </h1>
                <div class="font-bold text-2xl">Edit</div>
            </div>
            <div class="grid gap-4 w-full max-w-md mx-auto">
                <ProjectForm v-model:name="formData.name" v-model:timeline="formData.timeline" :disabled="isSubmitting" />
                <div class="flex justify-end gap-2">
                    <button class="btn btn-ghost" :disabled="isSubmitting" @click="resetForm">Reset</button>
                    <button class="btn btn-primary" :disabled="isSubmitting" @click="submitForm">
                        <span v-if="isSubmitting" class="loading loading-spinner"></span>
                        <span>Save Edit</span>
                        <IconArrowRight v-if="!isSubmitting" class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue';
import { Timeline, forcastyApi } from '../api/forcasty.api';
import { useRouter } from 'vue-router';
import { getAuth } from 'firebase/auth';

const ProjectForm = defineAsyncComponent(() => import('../components/ProjectForm.vue'))
const IconArrowRight = defineAsyncComponent(() => import('../components/IconArrowRight.vue'))

const props = defineProps<{
    id: string
}>()

const auth = getAuth()
const router = useRouter()
const isLoading = ref(true)
const isSubmitting = ref(false)

const formData = reactive<{
    name: string,
    timeline: Timeline[]
}>({
    name: '',
    timeline: [
        {
            effort: 0,
            done: 0
        }
    ]
})

const project = ref<Awaited<ReturnType<typeof forcastyApi.projects.id.get>>>()

const loadProject = async () => {
    const token = await auth.currentUser?.getIdToken()
    if(!token) return
    const response = await forcastyApi.projects.id.get(props.id, token)
    project.value = response
    formData.name = project.value.name
    formData.timeline = JSON.parse(JSON.stringify((project.value.timeline)))
    isLoading.value = false
}

loadProject()

const resetForm = () => {
    formData.name = project.value?.name || ''
    formData.timeline = JSON.parse(JSON.stringify((project.value?.timeline || []))) || [
        {
            effort: 0,
            done: 0
        }
    ]
}

const submitForm = async () => {
    isSubmitting.value = true
    const token = await auth.currentUser?.getIdToken()
    if(!token) return
    try {
        const project = await forcastyApi.projects.id.patch(props.id, formData, token)
        router.push(`/projects/${project._id}`)

    } finally {
        isSubmitting.value = false
    }
}
</script>