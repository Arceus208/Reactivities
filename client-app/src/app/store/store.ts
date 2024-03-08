import { createContext, useContext } from "react";
import AcitivityStore from "./activityStore";
import CommonStore from "./commonStore";

interface Store {
  activityStore: AcitivityStore;
  commonStore: CommonStore;
}

export const store: Store = {
  activityStore: new AcitivityStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
