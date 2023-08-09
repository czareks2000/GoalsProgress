import { createContext, useContext } from "react";
import GoalStore from "./goalStore";
import CommonStore from "./commonStore";
import DetailsPageStore from "./detailsPageStore";

interface Store {
    goalStore: GoalStore;
    detailsPageStore: DetailsPageStore;
    commonStore: CommonStore;
}

export const store: Store = {
    goalStore: new GoalStore(),
    detailsPageStore: new DetailsPageStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}