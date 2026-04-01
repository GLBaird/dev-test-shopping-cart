import type {Product, QuantityProduct} from "@/types/Product";
import {State} from "../reducers/store-data";

export const sampleCart: QuantityProduct[] = [
    {
        id: '01',
        name: 'Test Item 1',
        image: 'sample.png',
        price: 100,
        qty: 3,
        dateAdded: new Date()
    },
    {
        id: '02',
        name: 'Test Item 1',
        image: 'sample.png',
        price: 200,
        qty: 1,
        dateAdded: new Date()
    },
    {
        id: '03',
        name: 'Test Item 1',
        image: 'sample.png',
        price: 500,
        qty: 3,
        dateAdded: new Date()
    }
]

export const sampleProducts: Product[] = sampleCart.map(item => ({ ...item, stock: 10 }))

export const getInitialStateWithCart = (): State => structuredClone( { products: sampleProducts, cart: sampleCart, error: null })
export const getInitialStateWithEmptyCart = (): State => ({ products: structuredClone(sampleProducts), cart: [], error: null })