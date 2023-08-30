<template>
    <div>
        <div v-if="!isLoading" class="grid gap-4">
            <div>
                <h1>
                    <RouterLink :to="`/projects/${id}`" class="hover:underline">{{ project?.name }}</RouterLink>
                </h1>
            </div>
            <ChartForcast v-if="project?.timeline" :data="project?.timeline" />
            <div class="flex flex-col sm:flex-row gap-2">
                <RouterLink :to="`/projects/${id}/edit`" class="btn btn-primary" :class="{'btn-disabled': isSubmitting}" v-if="canUpdateProject">Edit Project</RouterLink>
                <RouterLink :to="`/projects/${id}/members`" class="btn btn-secondary" :class="{'btn-disabled': isSubmitting}">Members</RouterLink>
                <button class="btn btn-secondary" @click="cloneProject" :disabled="isSubmitting">Clone Project</button>
                <ButtonConfirm :onConfirm="leaveProject" v-if="!isUserOwner" :disabled="isSubmitting">Leave Project</ButtonConfirm>
                <ButtonConfirm :onConfirm="onDelete" v-if="canDeleteProject" :disabled="isSubmitting">Delete Project</ButtonConfirm>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue';
import { Permission, ProjectCreateDto, forcastyApi } from '../api/forcasty.api';
import { useRouter } from 'vue-router';
import { getAuth } from 'firebase/auth';
import { useAuth } from '@vueuse/firebase/useAuth.mjs';

const ChartForcast = defineAsyncComponent(() => import('../components/ChartForcast.vue'))
const ButtonConfirm = defineAsyncComponent(() => import('../components/ButtonConfirm.vue'))

const props = defineProps<{
  id: string
}>()

const auth = getAuth()
const { user } = useAuth(auth)
const isUserOwner = computed(() => {
    return project.value?.owner == user.value?.email
})
const canUpdateProject = computed(() => {
    const hasUserEditorPermission = project.value?.members.find((member) => member.email == user.value?.email && member.permissions.includes(Permission.EDITOR))
    return isUserOwner.value || hasUserEditorPermission;
})

const canDeleteProject = computed(() => {
    return isUserOwner.value;
})
const isLoading = ref(true)
const isSubmitting = ref(false)

const router = useRouter()

const project = ref<Awaited<ReturnType<typeof forcastyApi.projects.id.get>>>()

const loadProject = async () => {
    const token = await auth.currentUser?.getIdToken()
    if(!token) return
    project.value = await forcastyApi.projects.id.get(props.id, token)
    isLoading.value = false
}

const leaveProject = async () => {
    const token = await auth.currentUser?.getIdToken()
    if(!token) return

    try {
        await forcastyApi.projects.id.leave.post(props.id, token)
        router.push('/')
    } catch {

    }
}

const cloneProject = async () => {
    isSubmitting.value = true
    try {
        if (!project.value) return
        const token = await auth.currentUser?.getIdToken()
        if (!token) return
        if (!auth.currentUser?.email) return

        const projectCreateDto: ProjectCreateDto = {
            owner: auth.currentUser.email,
            name: `${project.value.name} Clone`,
            timeline: project.value.timeline,
            members: project.value.members
        }
        const newProject = await forcastyApi.projects.post(projectCreateDto, token)
        router.push(`/projects/${newProject._id}`)
    } finally {
        isSubmitting.value = false
    }
}

const onDelete = async () => {
    isSubmitting.value = true
    try {
        const token = await auth.currentUser?.getIdToken()
        if(!token) return
        await forcastyApi.projects.id.delete(props.id, token);
        router.push('/')
    } finally {
        isSubmitting.value = false
    }
}

loadProject()
</script>