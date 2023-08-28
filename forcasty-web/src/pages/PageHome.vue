<template>
    <div>
        <ProjectsListe v-if="projects" :list="projects" />
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { Project, forcastyApi } from '../api/forcasty.api';
import { getAuth } from 'firebase/auth';

const ProjectsListe = defineAsyncComponent(() => import('../components/ProjectsList.vue'))
const auth = getAuth()

const projects = ref<Project[]>()


const loadProjects = async () => {
    const token = await auth.currentUser?.getIdToken()
    if(!token) return
    const data = await forcastyApi.projects.get({}, token);
    projects.value = data
}

loadProjects()
</script>