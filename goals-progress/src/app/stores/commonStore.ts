import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/ServerError"
import { Info } from "../models/Info";

export default class CommonStore {
    serverError: ServerError | null = null;
    info: Info | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
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
}