import { createContext, useContext } from "react";
import AcitivityStore from "./activityStore";

interface Store {
  activityStore: AcitivityStore;
}

export const store: Store = {
  activityStore: new AcitivityStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
