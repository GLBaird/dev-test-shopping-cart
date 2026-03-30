import type {Product} from "@/types/Product.ts";

export type OrderByFunction = (products: Product[]) => Product[]

export const orderByName: OrderByFunction = (products) => products
    .sort((a, b) => a.name.localeCompare(b.name))

export const orderByDate: OrderByFunction = (products) => products
    .sort((a, b) => a.dateAdded.getTime() - b.dateAdded.getTime())

export const orderByPrice: OrderByFunction = (products) => products
    .sort((a, b) => a.price - b.price)

export const OrderByFunctions = {
    name: orderByName,
    date: orderByDate,
    price: orderByPrice
} satisfies Record<string, OrderByFunction>

