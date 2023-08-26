import { projectsMock } from "../data/projects.mock";

const projectsMockData = projectsMock;

export const forcastyApi = {
    projects: {
        get: async () => {
            await new Promise(r => setTimeout(r, 150));
            const data = projectsMockData
            return projectsMockData
        },
        id: {
            get: async (id: string) => {
                await new Promise(r => setTimeout(r, 150));
                const data = Object.entries(projectsMockData).find(value => value[1]._id == id)?.[1]
                return data
            }
        }
    }
}