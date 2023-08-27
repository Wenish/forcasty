<template>
    <div>
        <ProjectsListe v-if="projects" :list="projects" />
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { Project, forcastyApi } from '../api/forcasty.api';

const ProjectsListe = defineAsyncComponent(() => import('../components/ProjectsList.vue'))

const projects = ref<Project[]>()

const loadProjects = async () => {
    const data = await forcastyApi.projects.get();
    projects.value = data.results
}

loadProjects()
</script>