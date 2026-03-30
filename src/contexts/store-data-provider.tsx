import { type ReactNode, useReducer } from "react";
import storeDataReducer  from "@/reducers/store-data";
import { StoreDataContext } from "@/contexts/store-data";

export function StoreDataProvider({children }: { children: ReactNode}) {
    const [state, dispatch] = useReducer(storeDataReducer, { products: null, cart: []})

    return (
        <StoreDataContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreDataContext.Provider>
    )
}
