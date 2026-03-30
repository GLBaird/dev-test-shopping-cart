import { type ActionDispatch, createContext } from "react";
import { type Action, type State } from "@/reducers/store-data";

type StoreContextData = {
    state: State;
    dispatch: ActionDispatch<[action: Action]>
}

export const StoreDataContext = createContext<StoreContextData>(
    { state: { products: null, cart: []}, dispatch: () => {}}
)
