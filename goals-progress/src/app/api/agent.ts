import axios, { AxiosResponse } from "axios";
import { Goal } from "../models/Goal";
import { Progress } from "../models/Progress";
import { GoalStatus } from "../models/enums/GoalStatus";
import { Category } from "../models/Category";

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    patch: <T> (url: string, body: {}) => axios.patch<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Goals = {
    list: () => requests.get<Goal[]>('/goals'),
    details: (id: number) => requests.get<Goal>(`/goal/${id}`),
    progresses: (id: number) => requests.get<Progress[]>(`goal/${id}/progresses`),
    create: (goal: Goal) => requests.post<number>('/goals', goal),
    update: (id: number, goal: Goal) => requests.put<void>(`/goal/${id}`, goal),
    changeStatus: (id: number, status: GoalStatus) => requests.patch<void>(`/goal/${id}/${status}`,{}),
    delete: (id: number) => requests.del<void>(`/goal/${id}`)
}

const Progresses = {
    create: (goalId: number, progress: Progress) => requests.post<number>(`/progresses/${goalId}`, progress),
    delete: (id: number) => requests.del<void>(`/progress/${id}`) 
}

const Categories = {
    list: () => requests.get<Category[]>('/categories')
}

const agent = {
    Goals,
    Progresses,
    Categories
}

export default agent;