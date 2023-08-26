import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { projectsMock } from "../data/projects.mock";
import { forcastyApi } from "../api/forcasty.api";

export const useProjectsStore = defineStore('projects', () => {
    const projects = reactive<{
        [key: string]: {
            _id: string
            name: string
            timeline: {
                effort: number
                done: number
            }[]
        }
    }>({})

    const projectsArray = computed(() => {
        return Object.entries(projects).map(value => value[1])
    })

    const loadProjects = async () => {
        const data = await forcastyApi.projects.get();
        Object.assign(projects, structuredClone(data))
    }

    return {
        projects,
        projectsArray,
        loadProjects
    }
})