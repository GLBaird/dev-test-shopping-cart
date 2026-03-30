import styles from './ProductList.module.css'
import { useContext, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { getProducts } from "@/data-access/products";
import { StoreDataContext } from "@/contexts/store-data";
import { Actions } from "@/reducers/store-data";
import Product from "@/components/ProductList/Product";
import { OrderByFunctions } from "@/lib/order-by-functions";
import OrderByItems from "@/components/ProductList/OrderByItems";

export default function ProductList() {
    const { state, dispatch } = useContext(StoreDataContext)
    const [error, setError] = useState<string | null>(null)
    const [order, setOrder] = useState<keyof typeof OrderByFunctions>('name')

    useEffect(() => {
        if (state.products || error) return;
        getProducts()
            .then(loadedData => {
                console.log('Loaded data for products')
                dispatch({ type: Actions.setProducts, payload: loadedData })
            })
            .catch(e => {
                console.error('Failed to load product data', e)
                setError((e as Error).message ?? `${e}`)
            })
    }, [state.products, error, dispatch]);

    if (!state.products && !error) {
        return (
            <div className={styles.loadingContainer}>
                <Loading message="Loading products..." />
            </div>
        )
    }

    if (error && !state.products) {
        return (
            <div className={styles.error}>
                Failed to load products. Try again later. <br />
                {error}
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

