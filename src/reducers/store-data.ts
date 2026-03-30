import type { Product, QuantityProduct } from "@/types/Product";

export type State = {
    products: Product[] | null;
    cart: QuantityProduct[];
}

export const Actions = {
    setProducts: 'SET_PRODUCTS',
    addToCart: 'ADD_TO_CART',
    removeFromCart: 'REMOVE_FROM_CART',
    clearCart: 'CLEAR_CART',
} as const

export type Action =
    | { type: typeof Actions.setProducts; payload: Product[] | null }
    | { type: typeof Actions.addToCart; payload: { id: string } }
    | { type: typeof Actions.removeFromCart; payload: { id: string } }
    | { type: typeof Actions.clearCart }

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

    return { products, cart }
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

    return { products, cart }
}

export function clearCart(state: State): State {
    const products = structuredClone(state.products)
    state.cart.forEach(cp => {
        const product = products?.find(p => p.id === cp.id)
        if (product) product.stock += cp.qty
    })

    return { products, cart: []}
}

function storeDataReducer(state: State, action: Action) {
    switch (action.type) {
        case Actions.setProducts:
            return { ...state, products: action.payload }
        case Actions.addToCart:
            return addToCart(action.payload.id, state)
        case Actions.removeFromCart:
            return removeFromCart(action.payload.id, state)
        case Actions.clearCart:
            return clearCart(state)
        default:
            return state
    }
}

export default storeDataReducer
