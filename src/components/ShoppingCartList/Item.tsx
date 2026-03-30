import type { QuantityProduct } from "@/types/Product";
import styles from './item.module.css'
import {formatPrice} from "@/lib/format-price";
import {MinusIcon, PlusIcon} from "lucide-react";
import {useContext} from "react";
import {StoreDataContext} from "@/contexts/store-data";
import {Actions} from "@/reducers/store-data";

export default function Item({ item }: { item: QuantityProduct }) {
    const { dispatch } = useContext(StoreDataContext)

    const handleRemove = () => {
        dispatch({ type: Actions.removeFromCart, payload: { id: item.id }})
    }

    const handleAdd = () => {
        dispatch({ type: Actions.addToCart, payload: { id: item.id }})
    }

    return (
        <div className={styles.itemRow}>
            <div>{item.name}</div>
            <div>x{item.qty}</div>
            <div className={styles.buttons}>
                <button type='button' onClick={handleRemove} title='Remove'>
                    <MinusIcon />
                </button>
                <button type='button' onClick={handleAdd} title='Add'>
                    <PlusIcon />
                </button>
            </div>
            <div className={styles.price}>{formatPrice(item.price)}</div>
            <div className={styles.price}>{formatPrice(item.price * item.qty)}</div>
        </div>
    )
}
