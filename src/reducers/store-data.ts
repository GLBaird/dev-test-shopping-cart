import type { Product, QuantityProduct } from "@/types/Product";

export type State = {
    products: Product[] | null;
    cart: QuantityProduct[];
    error: string | null;
}

export const Actions = {
    setProducts: 'SET_PRODUCTS',
    addToCart: 'ADD_TO_CART',
    removeFromCart: 'REMOVE_FROM_CART',
    loadFromCache: 'LOAD_FROM_CACHE',
    clearCart: 'CLEAR_CART',
    setProductsError: 'SET_PRODUCTS_ERROR'
} as const

export type Action =
    | { type: typeof Actions.setProducts; payload: Product[] | null }
    | { type: typeof Actions.addToCart; payload: { id: string } }
    | { type: typeof Actions.removeFromCart; payload: { id: string } }
    | { type: typeof Actions.loadFromCache; payload: { cache: QuantityProduct[] }}
    | { type: typeof Actions.setProductsError; payload: { error: string | null }}
    | { type: typeof Actions.clearCart }

export function loadFromCache(cache: QuantityProduct[], state: State): State {
    const products = structuredClone(state.products)
    const processedCache = cache.map(cachedProduct => {
        const product = products?.find(p => p.id === cachedProduct.id)
        if (!product) return null;
        const nextStock = product.stock - cachedProduct.qty;
        const adjustedQty = cachedProduct.qty + (nextStock < 0 ? nextStock : 0);
        product.stock = Math.max(nextStock, 0);
        return {
            ...cachedProduct,
            qty: adjustedQty,
        };
    }).filter(Boolean) as QuantityProduct[]

    return { ...state, products, cart: processedCache }
}

export function addToCart(id: string, state: State): State {
    const products = structuredClone(state.products)
    const product = products?.find(p => p.id === id)
    if (!product || product.stock === 0) {
        console.log('unable to add product to cart')
        return state
    }

    const cart = structuredClone(state.cart)
    const cartProduct = cart.find(p => p.id === id)

    product.stock -= 1;

    if (cartProduct) {
        cartProduct.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 })
    }

    return { ...state, products, cart }
}

export function removeFromCart(id: string, state: State): State {
    const cart = structuredClone(state.cart)
    const cartProduct = cart.find(p => p.id === id)
    if (!cartProduct) {
        console.log('unable to remove from car')
        return state
    }
    const products = structuredClone(state.products)
    const product = products?.find(p => p.id === id)

    if (!product) {
        console.error('unable to find product to remove from cart!', id)
    } else {
        product.stock += 1
    }

    cartProduct.qty -= 1

    if (cartProduct.qty <= 0) {
        const index = cart.indexOf(cartProduct)
        cart.splice(index, 1)
    }

    return { ...state, products, cart }
}

export function clearCart(state: State): State {
    const products = structuredClone(state.products)
    state.cart.forEach(cp => {
        const product = products?.find(p => p.id === cp.id)
        if (product) product.stock += cp.qty
    })

    return { ...state, products, cart: []}
}

function storeDataReducer(state: State, action: Action) {
    switch (action.type) {
        case Actions.setProducts:
            return { ...state, products: action.payload }
        case Actions.loadFromCache:
            return loadFromCache(action.payload.cache, state)
        case Actions.addToCart:
            return addToCart(action.payload.id, state)
        case Actions.removeFromCart:
            return removeFromCart(action.payload.id, state)
        case Actions.clearCart:
            return clearCart(state)
        case Actions.setProductsError:
            return { ...state, error: action.payload.error }
        default:
            return state
    }
}

export default storeDataReducer
