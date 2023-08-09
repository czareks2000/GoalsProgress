import { makeAutoObservable, runInAction } from "mobx";

export default class DetailsPageStore {
    showAddForm = false;
    showEditForm = false;
    showProgressList = true;

    constructor() {
        makeAutoObservable(this);
    }

    setInitialValues = async() => {
        runInAction(() => {
            this.showAddForm = false;
            this.showEditForm = false;
            this.showProgressList = true;
        })
    }

    toggleAddForm = async () => {
        runInAction(() => {
            this.showAddForm = !this.showAddForm;
            this.showProgressList = !this.showProgressList;
        })
    }

    toggleEditForm = async () => {
        runInAction(() => {
            this.showEditForm = !this.showEditForm;
            this.showProgressList = !this.showProgressList;
        })
    }
}