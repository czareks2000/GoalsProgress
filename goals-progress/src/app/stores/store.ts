import { createContext, useContext } from "react";
import GoalStore from "./goalStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import DetailsPageStore from "./detailsPageStore";

interface Store {
    goalStore: GoalStore;
    commonStore: CommonStore;
    userStore: UserStore;
    detailsPageStore: DetailsPageStore;
}

export const store: Store = {
    goalStore: new GoalStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    detailsPageStore: new DetailsPageStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}