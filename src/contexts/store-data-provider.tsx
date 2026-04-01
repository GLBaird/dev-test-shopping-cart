import { type ReactNode, useEffect, useReducer, useRef } from "react";
import { z } from 'zod'
import storeDataReducer, { Actions } from "@/reducers/store-data";
import { StoreDataContext } from "@/contexts/store-data";
import { LocalStore } from "@/lib/local-store.ts";
import { quantityProductSchema } from "@/types/Product.ts";
import {getProducts} from "@/data-access/products.ts";

const ShoppingCartKey = 'user_shopping_cart' as const;
const cartSchema = z.array(quantityProductSchema);

export function StoreDataProvider({children }: { children: ReactNode}) {
    const [state, dispatch] = useReducer(storeDataReducer, { products: null, cart: [], error: null })
    const hasHydrated = useRef(false);

    useEffect(() => {
        if (state.products || state.error) return;
        getProducts()
            .then(loadedData => {
                console.log('Loaded data for products')
                dispatch({ type: Actions.setProducts, payload: loadedData })
            })
            .catch(e => {
                console.error('Failed to load product data', e)
                const error = (e as Error).message ?? `${e}`
                dispatch({ type: Actions.setProductsError, payload: { error } })
            })
    }, [state.products, state.error, dispatch]);

    useEffect(() => {
        if (!state.products || hasHydrated.current) return
        const cachedData = LocalStore.loadFromStore(ShoppingCartKey, cartSchema)
        hasHydrated.current = true;
        if (cachedData && cachedData.length > 0) {
            dispatch({ type: Actions.loadFromCache, payload: { cache: cachedData } })
        }
    }, [state.products, dispatch]);

    useEffect(() => {
        if (!hasHydrated.current) return
        LocalStore.saveToStore(ShoppingCartKey, state.cart);
    }, [state.cart]);

    return (
        <StoreDataContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreDataContext.Provider>
    )
}
