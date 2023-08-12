import axios, { AxiosError, AxiosResponse } from "axios";
import { Goal } from "../models/Goal";
import { Progress } from "../models/Progress";
import { GoalStatus } from "../models/enums/GoalStatus";
import { Category } from "../models/Category";
import { router } from "../router/Routes";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    await sleep(1);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && Object.hasOwnProperty.bind(data.errors)('id')) {
                router.navigate('/not-found');
            }

            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                store.commonStore.setError(data);
            }
            break;
        case 401:
            router.navigate('unauthorised')
            break;
        case 403:
            router.navigate('forbidden')
            break;
        case 404:
            router.navigate('not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})

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
    progresses: (id: number) => requests.get<Progress[]>(`/goal/${id}/progresses`),
    categories: (id: number) => requests.get<Category[]>(`/goal/${id}/categories`),
    create: (goal: Goal) => requests.post<number>('/goals', goal),
    update: (id: number, goal: Goal) => requests.put<void>(`/goal/${id}`, goal),
    changeStatus: (id: number, status: GoalStatus) => requests.patch<void>(`/goal/${id}/${status}`,{}),
    delete: (id: number) => requests.del<void>(`/goal/${id}`)
}

const Progresses = {
    create: (goalId: number, progress: Progress) => requests.post<number>(`/progresses/${goalId}`, progress),
    update: (id: number, progress: Progress) => requests.put<void>(`/progress/${id}`, progress),
    delete: (id: number) => requests.del<void>(`/progress/${id}`) 
}

const Categories = {
    create: (goalId: number, category: Category) => requests.post<number>(`/categories/${goalId}`, category),
    delete: (id: number) => requests.del<void>(`/categories/${id}`)
}

const agent = {
    Goals,
    Progresses,
    Categories
}

export default agent;