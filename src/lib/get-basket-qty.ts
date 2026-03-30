import type {QuantityProduct} from "@/types/Product.ts";

export function getBasketQty(products: QuantityProduct[]) {
    return products.reduce<number>((acc, product) => acc + product.qty,0)
}
