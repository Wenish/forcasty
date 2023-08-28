<template>
    <div>
        <div v-if="!isLoading" class="grid gap-4">
            <div>
                <h1 class="font-bold text-4xl">Project: {{ project?.name }} - Mitglieder</h1>
            </div>
            <div>
                <div class="flex gap-2">
                    <div class="form-control w-full max-w-xs">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input v-model="newMemberEmail" :disabled="!isFormEditable" type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                    </div>
                    <div class="flex items-end">
                        <button @click="addNewMember" :disabled="!isFormEditable" class="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <td>E-Mail</td>
                            <td>Editor</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in members" :key="member.email">
                            <td>{{ member.email }}</td>
                            <td>
                                <label>
                                    <input @click="updateMemberPermission(member, Permission.EDITOR)" :disabled="!isFormEditable" :checked="member.permissions.includes(Permission.EDITOR)" type="checkbox"
                                        class="checkbox" />
                                </label>
                            </td>
                            <td>
                                <ButtonDelete class="btn-xs" :disabled="!isFormEditable" :onDelete="() => onDeleteMember(member)">Remove</ButtonDelete>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getAuth } from 'firebase/auth';
import { computed, defineAsyncComponent, ref } from 'vue';
import { forcastyApi, Member, Project, Permission } from '../api/forcasty.api';
import { useAuth } from '@vueuse/firebase/useAuth.mjs';

const ButtonDelete = defineAsyncComponent(() => import('../components/ButtonDelete.vue'))

const auth = getAuth()
const isLoading = ref(true)

const { user } = useAuth(auth)
const isUserOwner = computed(() => {
    return project.value?.owner == user.value?.uid
})
const canUpdateProject = computed(() => {
    const hasUserEditorPermission = project.value?.members.find((member) => member.email == user.value?.email && member.permissions.includes(Permission.EDITOR))
    return isUserOwner.value || !!hasUserEditorPermission;
})


const isSubmitting = ref(false)

const isFormEditable = computed(() => {
    return canUpdateProject.value && !isSubmitting.value
})

const project = ref<Project>()

const members = ref<Member[]>()

const newMemberEmail = ref('')

const props = defineProps<{
    id: string
}>()

const loadProject = async () => {
    const token = await auth.currentUser?.getIdToken()
    if (!token) return
    const response = await forcastyApi.projects.id.get(props.id, token)
    project.value = response
    members.value = response.members
    isLoading.value = false
}

const addNewMember = async () => {
    isSubmitting.value = true
    try {
        const email = newMemberEmail.value
        const token = await auth.currentUser?.getIdToken()
        if (!token) return
        const response = await forcastyApi.projects.id.members.post(props.id, {
            members: [
                {
                    email: email,
                    permissions: []
                }
            ]
        }, token)
        members.value = response
        newMemberEmail.value = ''
    } finally {
        isSubmitting.value = false
    }
}

const updateMemberPermission = async (member: Member, permission: Permission) => {
    isSubmitting.value = true
    try {
        const hasMemberPermission = member.permissions.includes(permission);
        let newPermissions = member.permissions;
        if (!hasMemberPermission) {
            newPermissions.push(permission);
        } else {
            newPermissions = member.permissions.filter((value) => value != permission)
        }

        const token = await auth.currentUser?.getIdToken()
        if (!token) return

        const response = await forcastyApi.projects.id.members.email.put(props.id, member.email, {
            permissions: newPermissions
        }, token)

        members.value = response
    } finally {
        isSubmitting.value = false
    }
}

const onDeleteMember = async (member: Member) => {
    isSubmitting.value = true
    try {
        const token = await auth.currentUser?.getIdToken()
        if (!token) return
        const response = await forcastyApi.projects.id.members.email.delete(props.id, member.email, token)
        members.value = response
    } finally {
        isSubmitting.value = false
    }
}

loadProject()
</script>