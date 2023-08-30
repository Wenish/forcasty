<template>
    <div>
        <div class="grid gap-4">
            <h1>Projects</h1>
            <RouterLink
                to="/project-new"
                class="bg-primary text-primary-content py-2 px-4 hover:bg-primary-focus group transition-colors duration-300"
            >
                <div class="text-sm font-bold pl-0 group-hover:pl-2 transition-all duration-300">New Project</div>
            </RouterLink>
            <div class="grid gap-2" v-if="myProjects?.length">
                <h2 class="font-bold">My Projects</h2>
                <ProjectsListe v-if="projects" :list="myProjects" />
            </div>
            <div class="grid gap-2" v-if="otherProjects?.length">
                <h2 class="font-bold">Other Projects</h2>
                <ProjectsListe v-if="projects" :list="otherProjects" />
            </div>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { Project, forcastyApi } from '../api/forcasty.api';
import { getAuth } from 'firebase/auth';
import { useAuth } from '@vueuse/firebase/useAuth.mjs';

const ProjectsListe = defineAsyncComponent(() => import('../components/ProjectsList.vue'))
const auth = getAuth()
const { user } = useAuth(auth)

const projects = ref<Project[]>()

const myProjects = computed(() => {
    return projects.value?.filter(project => project.owner == user.value?.email)
})

const otherProjects = computed(() => {
    return projects.value?.filter(project => project.owner != user.value?.email)
})


const loadProjects = async () => {
    const token = await auth.currentUser?.getIdToken()
    if(!token) return
    const data = await forcastyApi.projects.get({}, token);
    projects.value = data
}

loadProjects()
</script>