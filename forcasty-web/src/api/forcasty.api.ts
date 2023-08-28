import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_FORCASTY_API_HOST}/projects`

export const forcastyApi = {
    projects: {
        post: async (body: ProjectCreateDto, token: string) => {
            const url = `${baseUrl}`
            const { data } = await axios.post<Project>(url, body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return data
        },
        get: async (params: ProjectFilterDto = {}, token: string) => {
            const urlWithParams = new URL(baseUrl)
            urlWithParams.search = objectToSearchParams(params).toString()
            const url = urlWithParams.toString()
            
            const { data } = await axios.get<Project[]>(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return data
        },
        id: {
            get: async (id: string, token: string) => {
                const { data } = await axios.get<Project>(`${baseUrl}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                return data
            },
            patch: async (id: string, body: ProjectPatchDto, token: string) => {
                const { data } = await axios.patch<Project>(`${baseUrl}/${id}`, body, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                return data
            },
            delete: async (id: string, token: string) => {
                const { data } = await axios.delete<Project>(`${baseUrl}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                return data
            },
            leave: {
                post: async (id: string, token: string) => {
                    const url = `${baseUrl}/${id}/leave`
                    const { data } = await axios.post<string>(url, undefined, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    return data
                }
            },
            members: {
                post: async (id: string, body: ProjectMembersPostDto, token: string) => {
                    const url = `${baseUrl}/${id}/members`
                    const { data } = await axios.post<Member[]>(url, body, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    return data
                },
                get: async (id: string, token: string) => {
                    const url = `${baseUrl}/${id}/members`
                    const { data } = await axios.get<Member[]>(url, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    return data
                },
                email: {
                    put: async (id: string, email: string, body: ProjectMemberPutDto, token: string) => {
                        const url = `${baseUrl}/${id}/members/${email}`
                        const { data } = await axios.put<Member[]>(url, body, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        return data
                    },
                    delete: async (id: string, email: string, token: string) => {
                        const url = `${baseUrl}/${id}/members/${email}`
                        const { data } = await axios.delete<Member[]>(url, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        return data
                    }
                }
            }
        }
    }
}

function objectToSearchParams(params: SearchParams): URLSearchParams {
    const searchParams = new URLSearchParams()
    for (const param in params) {
        if (typeof params[param] === 'object') {
            // eslint-disable-next-line
            ; (params[param] as string[]).forEach((item) => {
                searchParams.append(param, item)
            })
        } else {
            searchParams.append(param, params[param] as string)
        }
    }
    return searchParams
}

type SearchParams = {
    [key: string]: string | number | string[]
}


export type Timeline = {
    effort: number
    done: number
}

export enum Permission {
    EDITOR = 'Editor'
}

export type Member = {
    email: string
    permissions: Permission[]
}

export type ProjectCreateDto = {
    owner: string
    name: string
    timeline: Timeline[]
    members: Member[]
}

export type Project = {
    _id: string
    __v: string
    createdAt: string
    updatedAt: string
    owner: string
    name: string
    timeline: Timeline[]
    members: Member[]
}

export type ProjectPatchDto = Partial<ProjectCreateDto>

export type ProjectMembersPostDto = {
    members: Member[]
}

export type ProjectMemberPutDto = {
    permissions: Permission[]
}

export type ProjectFilterDto = {
    owner?: string
}