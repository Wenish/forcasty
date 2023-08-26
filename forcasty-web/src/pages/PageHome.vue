<template>
    <div>
        <ProjectsListe :list="projectsStore.projectsArray" />
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useProjectsStore } from '../stores/projects.store';

const ProjectsListe = defineAsyncComponent(() => import('../components/ProjectsList.vue'))

const projectsStore = useProjectsStore()
projectsStore.loadProjects()
</script>