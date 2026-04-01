import { sampleCart, sampleProducts } from "@/test/test-data-state";
import {addToCart, clearCart, loadFromCache, removeFromCart, type State} from "./store-data";
import {getInitialStateWithCart, getInitialStateWithEmptyCart} from "../test/test-data-state";

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

describe('Test cart mutate functions for reducer', () => {
    describe('Test caching', () => {
        it("should load cached cart and correctly reduce product stock", () => {
            const initialState: State = getInitialStateWithEmptyCart()

            const newState = loadFromCache(sampleCart, initialState);

            expect(newState.cart.length).toEqual(sampleCart.length);

            sampleCart.forEach((cachedItem) => {
                const product = newState.products?.find(p => p.id === cachedItem.id);
                const cartItem = newState.cart.find(p => p.id === cachedItem.id);

                expect(product).toBeDefined();
                expect(cartItem).toBeDefined();

                // stock should be reduced by qty (clamped at 0)
                const originalProduct = sampleProducts.find(p => p.id === cachedItem.id)!;
                const expectedStock = Math.max(originalProduct.stock - cachedItem.qty, 0);

                expect(product!.stock).toEqual(expectedStock);
            });
        });

        it("should clamp qty when cached qty exceeds available stock", () => {
            const lowStockProducts = sampleProducts.map(p => ({
                ...p,
                stock: 2, // force low stock
            }));

            const initialState: State = {
                products: structuredClone(lowStockProducts),
                cart: [],
                error: null,
            };

            const newState = loadFromCache(sampleCart, initialState);

            newState.cart.forEach((item) => {
                const product = lowStockProducts.find(p => p.id === item.id)!;

                // qty should never exceed original stock
                expect(item.qty).toBeLessThanOrEqual(product.stock);

                const updatedProduct = newState.products?.find(p => p.id === item.id)!;

                // stock should never go below 0
                expect(updatedProduct.stock).toBeGreaterThanOrEqual(0);
            });
        });

        it("should ignore cached items that do not exist in products", () => {
            const initialState: State = getInitialStateWithEmptyCart()

            const invalidCache = [
                ...sampleCart,
                {
                    id: "does-not-exist",
                    name: "Invalid",
                    image: "x.png",
                    price: 999,
                    qty: 5,
                    dateAdded: new Date(),
                },
            ];

            const newState = loadFromCache(invalidCache, initialState);

            expect(newState.cart.some(p => p.id === "does-not-exist")).toBe(false);
        });
    })


    it('should correctly add to a new state', () => {
        const newState = addToCart(firstProductId, getInitialStateWithCart())
        const { newStateCartProduct, newStateProduct } = getProductsReferencesFromState(newState);

        // ensure product has been added to new cart and removed from products
        expect(newStateProduct!.stock + 1).toEqual(firstProduct.stock)
        expect(newStateCartProduct!.qty - 1).toEqual(firstCart!.qty)
    })

    it('should remove from cart to a new state', () => {
        const newState = removeFromCart(firstProductId, getInitialStateWithCart())
        const { newStateCartProduct, newStateProduct } = getProductsReferencesFromState(newState);

        // ensure product has been removed from the new cart and added to products
        expect(newStateProduct!.stock - 1).toEqual(firstProduct.stock)
        expect(newStateCartProduct!.qty + 1).toEqual(firstCart!.qty)
    })

    it('should empty cart and return items to product list in new state', () => {
        const newState = clearCart(getInitialStateWithCart())

        expect(newState.cart.length).toEqual(0)

        newState.products?.forEach(product => {
            const originalProduct = sampleProducts.find(p => p.id === product.id)
            expect(originalProduct).toBeDefined()
            expect(originalProduct?.stock).toBeLessThan(product.stock)
        })

    })
})