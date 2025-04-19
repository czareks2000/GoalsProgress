import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/ServerError"
import { Info } from "../models/Info";
import dayjs, { Dayjs } from "dayjs";

export default class CommonStore {
    serverError: ServerError | null = null;
    info: Info | undefined = undefined;
    token: string | null = localStorage.getItem('jwt');
    numberOfDigits: string = localStorage.getItem('digits') || '2';
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

        reaction(
            () => this.numberOfDigits, 
            numberOfDigits => 
                localStorage.setItem('digits', numberOfDigits)
        )
    }

    get digits () {
        return parseInt(this.numberOfDigits);
    }

    setNumberOfDigits = (number: number) => {
        this.numberOfDigits = number.toString();
    }

    roundValue = (value: number) => {
        return Math.round(value * Math.pow(10,this.digits)) / Math.pow(10,this.digits);
      }

    formatDate = (date: Dayjs | Date | undefined, format: string = 'DD MMM YYYY') => {
        return date ? dayjs(date).format(format) : '';
    };
    
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