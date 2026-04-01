import styles from './ProductList.module.css'
import { useContext, useState } from "react";
import Loading from "@/components/Loading";
import { StoreDataContext } from "@/contexts/store-data";
import Product from "@/components/ProductList/Product";
import { OrderByFunctions } from "@/lib/order-by-functions";
import OrderByItems from "@/components/ProductList/OrderByItems";

export default function ProductList() {
    const { state } = useContext(StoreDataContext)
    const [order, setOrder] = useState<keyof typeof OrderByFunctions>('name')

    if (!state.products && !state.error) {
        return (
            <div className={styles.loadingContainer}>
                <Loading message="Loading products..." />
            </div>
        )
    }

    if (state.error && !state.products) {
        return (
            <div className={styles.error}>
                Failed to load products. Try again later. <br />
                {state.error}
            </div>
        )
    }

    const handleOrderChange = (sortName: keyof typeof OrderByFunctions) => {
        setOrder(sortName)
    }

    const sortedProducts = OrderByFunctions[order](state.products!)

    return (
        <div className={styles.productList}>
            <OrderByItems onChange={handleOrderChange} />
            <ul>
                {sortedProducts.map(product => (
                    <li key={product.id}>
                        <Product product={product} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

