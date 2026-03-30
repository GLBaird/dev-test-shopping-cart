import { Outlet } from 'react-router'
import Navigation from "@/components/Navigation"
import { StoreDataProvider } from "@/contexts/store-data-provider"
import styles from './RootLayout.module.css'

export function RootLayout() {
    return (
        <StoreDataProvider>
            <div className={styles.container}>
                <Navigation />
                <div className={styles.scroll}>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </StoreDataProvider>
    )
}
