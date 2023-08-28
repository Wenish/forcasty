<template>
    <div class="grid gap-4 w-full max-w-md mx-auto">
        <h1>Project - New</h1>
        <ProjectForm v-model:name="formData.name" v-model:timeline="formData.timeline" :disabled="isSubmitting" />
        <div class="flex justify-end gap-2">
            <button class="btn btn-ghost" :disabled="isSubmitting" @click="resetForm">Reset</button>
            <button class="btn btn-primary" :disabled="isSubmitting" @click="submitForm">
                <span v-if="isSubmitting"  class="loading loading-spinner"></span>
                <span>Create Project</span>
                <IconArrowRight v-if="!isSubmitting" class="h-5 w-5" />
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from 'vue';
import { ProjectCreateDto, forcastyApi } from '../api/forcasty.api';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';

const ProjectForm = defineAsyncComponent(() => import('../components/ProjectForm.vue'))
const IconArrowRight = defineAsyncComponent(() => import('../components/IconArrowRight.vue'))

const router = useRouter()
const auth = getAuth()

const isSubmitting = ref(false)

const formData = reactive<ProjectCreateDto>({
    owner: auth.currentUser?.uid || '',
    name: '',
    timeline: [
        {
            effort: 0,
            done: 0
        }
    ]
})

const resetForm = () => {
    formData.name = ''
    formData.timeline = [{
        effort: 0,
        done: 0
    }]
}

const submitForm = async () => {
    isSubmitting.value = true
    const token = await auth.currentUser?.getIdToken()
    if(!token) return
    try {
        const project = await forcastyApi.projects.post(formData, token)
        router.push(`/projects/${project._id}`)
        
    } finally {
        isSubmitting.value = false
    }
}
</script>