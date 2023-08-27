import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_FORCASTY_API_HOST}/projects`

export const forcastyApi = {
    projects: {
        post: async (body: ProjectCreateDto) => {
            const url = `${baseUrl}`
            const { data } = await axios.post<Project>(url, body)
              return data
        },
        get: async () => {
            const url = `${baseUrl}`
            const { data } = await axios.get<Project[]>(url)
            return data
        },
        id: {
            get: async (id: string) => {
                const { data } = await axios.get<Project>(`${baseUrl}/${id}`)
                return data
            }
        }
    }
}

export type Timeline = {
    effort: number
    done: number
}

export type ProjectCreateDto = {
    owner: string
    name: string
    timeline: Timeline[]
}

export type Project = {
    _id: string
    __v: string
    createdAt: string
    updatedAt: string
    owner: string
    name: string
    timeline: Timeline[]
}