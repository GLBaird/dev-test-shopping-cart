import type {Product, QuantityProduct} from "@/types/Product"
import productsJson from '@/sample-json/products.json'
import { parseProductsFromJson } from "@/lib/parse-products-json";
import { pause } from "@/lib/pause";
import {generateUUID} from "@/lib/generate-uuid";

/**
 * Networking Layer in real production version of app
 * would use fetch/axios for downloading data from server APIs
 * @description this will simulate download with a short pause
 */
export async function getProducts(): Promise<Product[]> {
    console.log('simulating the download of products from API')
    const parsedProducts = parseProductsFromJson(productsJson)
    await pause(1)

    return  parsedProducts
}

/**
 * Networking Layer in real production version of app
 * would use fetch/axios for posting data to server APIs
 * @description will simulate posting a new order from the basket to server APIs
 * @param products {QuantityProductp[]} items on the order
 */
export async function postOrder(products: QuantityProduct[]): Promise<{ orderNumber?: string, error?: string }> {
    // Networking Layer in real production version of app
    console.log('Simulating posting product order', products)
    if (products.length === 0) {
        console.error('cannot post order as order needs to contain at least 1 product')
        return { error: 'order must contain at least 1 product' }
    }

    await pause(1)

    const orderNumber = generateUUID();

    console.log('order placed with order number:', orderNumber)

    return { orderNumber }
}
