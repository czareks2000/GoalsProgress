import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/User";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get currentUser() {
        return this.user;
    }

    get isLoggedIn() {
        return !!this.user;
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            });
            router.navigate('/goals');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            store.commonStore.clearInfo();
            runInAction(() => {
                this.user = user;
            });
            router.navigate('/goals');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        store.goalStore.clearStore();
        this.user = null;
        router.navigate('/');
    }
    
    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}