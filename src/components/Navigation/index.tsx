import { NavLink } from "react-router";
import { Logo } from "@/components/Logo"
import { Home, CirclePile, ShoppingBasket } from 'lucide-react'
import styles from './Navigation.module.css'
import {useContext} from "react";
import {StoreDataContext} from "@/contexts/store-data";
import {getBasketQty} from "@/lib/get-basket-qty";

const StyledNavLink = ({ to, children }: { to: string, children: string }) => (
    <NavLink
        to={to}
        className={
            ({isActive}) => isActive ? styles.active : ''
        }
    >
        {children}
    </NavLink>
)

export default function Navigation() {
    const { state } = useContext(StoreDataContext)
    const itemsInBasket = getBasketQty(state.cart)
    return (
        <header className={styles.header}>
            <nav>
                <Logo className={styles.logo} />
                <ul>
                    <li>
                        <Home />
                        <StyledNavLink to="/">Home</StyledNavLink>
                    </li>
                    <li>
                        <CirclePile />
                        <StyledNavLink to="/products">Products</StyledNavLink>
                    </li>
                    <li>
                        <ShoppingBasket />
                        <StyledNavLink to='/cart'>Shopping Cart</StyledNavLink>
                        {itemsInBasket > 0 && <span>(x{itemsInBasket})</span>}
                    </li>
                </ul>
            </nav>
        </header>
    )
}