import styles from './ShoppingCartList.module.css'
import {useContext, useState} from "react";
import {StoreDataContext} from "@/contexts/store-data";
import {getBasketQty} from "@/lib/get-basket-qty";
import {Actions} from "@/reducers/store-data";
import Item from "@/components/ShoppingCartList/Item";
import type {QuantityProduct} from "@/types/Product";
import {formatPrice} from "@/lib/format-price";
import {postOrder} from "@/data-access/products";
import Loading from "@/components/Loading";
import {Link} from "react-router";

function totalCostOfCart(items: QuantityProduct[]) {
    const cost = items.reduce<number>(
        (acc, item) => acc + item.price * item.qty,
        0
    )

    return formatPrice(cost)
}

export default function ShoppingCartList() {
    const { state, dispatch } = useContext(StoreDataContext)
    const [posting, setPosting] = useState(false)
    const [orderNumber, setOrderNumber] = useState('')
    const [error, setError] = useState('')
    const qty = getBasketQty(state.cart)

    const handleEmptyCart = () => {
        dispatch({ type: Actions.clearCart })
    }

    const handlePlaceOrder = () => {
        setError('')
        setPosting(true)
        postOrder(state.cart)
            .then((resp) => {
                if (resp.orderNumber) {
                    console.log('Order placed:', resp.orderNumber)
                    dispatch({ type: Actions.clearCart })
                    setOrderNumber(resp.orderNumber)
                } else {
                    console.error('Error posting order!', resp.error);
                    setError(resp.error ?? 'Unknown error posting order!')
                }
            })
            .catch(e => {
                console.error('Error posting order', e)
                setError((e as Error).message ?? `${e}`)
            })
            .finally(() => setPosting(false))
    }

    if (orderNumber) {
        return (
            <div className={styles.orderNumber}>
                <h2>Your order has been placed!</h2>
                <p>You will get a confirmation email. Your order number (keep for reference) is:</p>
                <p><strong>{orderNumber}</strong>.</p>
                <p>
                    <Link to={'/products'}>Continue shopping!</Link>
                </p>
            </div>
        )
    }

    return (
        <div className={styles.shoppingCart}>
            {qty === 0 && <div>You have no items in your basket.</div>}
            {qty > 0 && (
                <div>
                    <div>You have {qty} items in your basket.</div>
                    <div className={styles.empty}>
                        <button type='button' onClick={handleEmptyCart}>Empty Cart</button>
                    </div>
                </div>
            )}
            {error && <div className={styles.error}>
                <p>There has been an error!</p>
                <p>{error}</p>
            </div>}
            <ul>
                {state.cart.map(product => (
                    <li key={product.id}>
                        <Item item={product} />
                    </li>
                ))}
            </ul>
            <div className={styles.total}>
                <div>Total:</div>
                <div>{totalCostOfCart(state.cart)}</div>
            </div>
            <div className={styles.order}>
                <button type='button' onClick={handlePlaceOrder} disabled={posting}>
                    {posting && <Loading message='Placing order...' />}
                    {!posting && 'Post Order'}
                </button>
            </div>
        </div>
    )
}