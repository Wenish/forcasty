<template>
    <div class="grid gap-4 w-full max-w-md mx-auto">
        <h1>Project - New</h1>
        <div class="grid gap-2">
            <div class="form-control w-full max-w-md">
                <label class="label">
                    <span class="label-text">Project Name</span>
                </label>
                <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-md" v-model="formData.name" :disabled="isSubmitting" />
            </div>
            <h2 class="font-bold pt-4">Timeline</h2>
            
            <div v-for="(item, index) in formData.timeline" :key="index" class="flex gap-4 w-full max-w-md" >
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Effort</span>
                    </label>
                    <input type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="item.effort" :disabled="isSubmitting" />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Done</span>
                    </label>
                    <input type="number" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="item.done" :disabled="isSubmitting" />
                </div>
            </div>
            
            <div class="flex gap-2">
                <button class="btn btn-sm btn-error" :disabled="!canRemoveTimelineRow || isSubmitting" @click="removeLastTimelineRow">Remove</button>
                <button class="btn btn-sm btn-success" :disabled="isSubmitting" @click="addTimelineRow">Add</button>
            </div>
        </div>
        <div class="flex justify-end gap-2">
            <button class="btn btn-ghost" :disabled="isSubmitting" @click="resetForm">Reset</button>
            <button class="btn btn-primary" :disabled="isSubmitting" @click="submitForm">
                <span v-if="isSubmitting"  class="loading loading-spinner"></span>
                <span>Submit</span>
                <IconArrowRight v-if="!isSubmitting" class="h-5 w-5" />
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref } from 'vue';
import { ProjectCreateDto, forcastyApi } from '../api/forcasty.api';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';

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

const canRemoveTimelineRow = computed(() => {
    return formData.timeline.length > 1
})

const removeLastTimelineRow = () => {
    formData.timeline.splice(-1)
}

const addTimelineRow = () => {
    formData.timeline.push({
        effort: formData.timeline[formData.timeline.length - 1].effort,
        done: formData.timeline[formData.timeline.length - 1].done
    })
}

const resetForm = () => {
    formData.name = ''
    formData.timeline = [{
        effort: 0,
        done: 0
    }]
}

const submitForm = async () => {
    isSubmitting.value = true

    try {
        const project = await forcastyApi.projects.post(formData)
        router.push(`/projects/${project._id}`)
        
    } finally {
        isSubmitting.value = false
    }
}
</script>