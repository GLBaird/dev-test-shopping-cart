import { LoaderIcon } from "lucide-react";
import styles from './Loading.module.css'

type LoadingProps = {
    message?: string
}

export default function Loading({ message }: LoadingProps) {
    return (
        <div className={styles.loader}>
            <LoaderIcon className={styles.spinner} />
            <div>{message ?? 'Loading...'}</div>
        </div>
    )
}