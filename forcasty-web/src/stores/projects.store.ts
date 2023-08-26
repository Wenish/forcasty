import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { projectsMock } from "../data/projects.mock";

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
        await new Promise(r => setTimeout(r, 300));
        const data = projectsMock;
        Object.assign(projects, structuredClone(data))
    }

    return {
        projects,
        projectsArray,
        loadProjects
    }
})