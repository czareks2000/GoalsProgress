import { createContext, useContext } from "react";
import GoalStore from "./goalStore";

interface Store {
    goalStore: GoalStore;
}

export const store: Store = {
    goalStore: new GoalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}