import { z } from 'zod'
import {type Product, productSchema} from "@/types/Product.ts"

export function parseProductsFromJson(json:string|object[]): Product[] {
    const parsed = z.array(productSchema).safeParse(json)
    if (!parsed.success) {
        console.error('failed to parse JSON data:', parsed.error.message)
        return []
    }
    return parsed.data
}
