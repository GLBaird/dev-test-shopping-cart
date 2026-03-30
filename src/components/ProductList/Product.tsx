import styles from './Product.module.css'
import type { Product } from "@/types/Product"
import { formatPrice } from "@/lib/format-price";
import {MinusIcon, PlusIcon} from "lucide-react";
import {useContext} from "react";
import {StoreDataContext} from "@/contexts/store-data";
import {Actions} from "@/reducers/store-data";

const imageModules = import.meta.glob('@/assets/images/*', {
    eager: true,
    import: 'default',
})

function getAssetUrl(fileName: string): string | undefined {
    return imageModules[`/src/assets/${fileName}`] as string | undefined
}

const formatAvailable = (stock: number) => {
    if (stock <= 0) return 'Out of stock!'
    if (stock <= 5) return `${stock} items in stock.`
    return 'In stock.'
}

export default function Product({ product }: {product: Product}) {
    const { dispatch } = useContext(StoreDataContext)
    const backgroundImage = getAssetUrl(product.image)

    const handleAdd = () => {
        dispatch({ type: Actions.addToCart, payload: { id: product.id } })
    }

    const handleRemove = () => {
        dispatch({ type: Actions.removeFromCart, payload: { id: product.id } })
    }

    return (
        <div className={styles.product}>
            <div className={styles.imageBox} style={{ backgroundImage: `url('${backgroundImage}')`}} />
            <div className={styles.productInfo}>
                <div>
                    <h2>{product.name}</h2>
                    <div className={styles.price}>{formatPrice(product.price)}</div>
                    <div className={product.stock > 0 ? styles.available : styles.unavailable}>
                        {formatAvailable(product.stock)}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button title='Remove' type='button' onClick={handleRemove}>
                        <MinusIcon />
                    </button>
                    <button title='Add' type='button' onClick={handleAdd}>
                        <PlusIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}
