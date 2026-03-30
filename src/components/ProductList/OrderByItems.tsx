import { useState } from "react";
import { OrderByFunctions } from "@/lib/order-by-functions";
import styles from './ProductList.module.css'

export default function OrderByItems({ onChange }: { onChange: (sortName: keyof typeof OrderByFunctions) => void}) {
    const keys = Object.keys(OrderByFunctions)
    const [selected, setSelected] = useState<keyof typeof OrderByFunctions>(keys[0] as keyof typeof OrderByFunctions)

    return (
        <div className={styles.orderBy}>
            {'Sort by: '}
            <select
                value={selected}
                onChange={(e) => {
                    const value = e.target.value as keyof  typeof OrderByFunctions
                    setSelected(value)
                    onChange(value)
                }}
            >
                {keys.map(key => (
                    <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
                ))}
            </select>
        </div>
    )
}
