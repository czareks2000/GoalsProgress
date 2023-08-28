import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/ServerError"
import { Info } from "../models/Info";

export default class CommonStore {
    serverError: ServerError | null = null;
    info: Info | undefined = undefined;
    token: string | null = localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token, 
            token => {
                if (token) {
                    localStorage.setItem('jwt', token);
                } else {
                    localStorage.removeItem('jwt');
                }
            }
        )
    }

    setServerError(error: ServerError) {
        this.serverError = error;
    }

    clearInfo = async () => {
        this.info = undefined;
    }

    setSuccess = async (message: string) => {
        this.info = {type: "success", message: message}
    }

    setError = async (message: string) => {
        this.info = {type: "error", message: message}
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setApploaded = () => { 
        this.appLoaded = true;
    }
}