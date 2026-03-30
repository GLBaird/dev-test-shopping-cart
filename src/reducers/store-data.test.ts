import { state, sampleCart, sampleProducts } from "@/test/test-data-state";
import {addToCart, clearCart, removeFromCart, type State} from "./store-data";

const firstProduct = sampleProducts[0]
const firstProductId = firstProduct.id
const firstCart = sampleCart.find(p => p.id === firstProductId)

const getProductsReferencesFromState = (state: State) => {
    const newStateCartProduct = state.cart.find(p => p.id === firstProductId)
    const newStateProduct = state.products?.find(p => p.id === firstProductId)

    expect(newStateCartProduct).toBeDefined()
    expect(newStateProduct).toBeDefined()

    return { newStateCartProduct, newStateProduct }
}

describe('Test cart mutate function for reduce', () => {
    it('should correctly add to a new state', () => {
        const newState = addToCart(firstProductId, state)
        const { newStateCartProduct, newStateProduct } = getProductsReferencesFromState(newState);

        // ensure product has been added to new cart and removed from products
        expect(newStateProduct!.stock + 1).toEqual(firstProduct.stock)
        expect(newStateCartProduct!.qty - 1).toEqual(firstCart!.qty)
    })

    it('should remove from cart to a new state', () => {
        const newState = removeFromCart(firstProductId, state)
        const { newStateCartProduct, newStateProduct } = getProductsReferencesFromState(newState);

        // ensure product has been removed from the new cart and added to products
        expect(newStateProduct!.stock - 1).toEqual(firstProduct.stock)
        expect(newStateCartProduct!.qty + 1).toEqual(firstCart!.qty)
    })

    it('should empty cart and return items to product list in new state', () => {
        const newState = clearCart(state)

        expect(newState.cart.length).toEqual(0)

        newState.products?.forEach(product => {
            const originalProduct = sampleProducts.find(p => p.id === product.id)
            expect(originalProduct).toBeDefined()
            expect(originalProduct?.stock).toBeLessThan(product.stock)
        })

    })
})