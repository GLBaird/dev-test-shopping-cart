import { NavLink } from "react-router";
import { Logo } from "@/components/Logo"
import { Home, CirclePile, ShoppingBasket } from 'lucide-react'
import styles from './Navigation.module.css'
import {type ReactNode, useContext} from "react";
import {StoreDataContext} from "@/contexts/store-data";
import {getBasketQty} from "@/lib/get-basket-qty";

const StyledNavLink = ({ to, children }: { to: string, children: ReactNode }) => (
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
                        <StyledNavLink to="/">
                            <Home />
                            <span>Home</span>
                        </StyledNavLink>
                    </li>
                    <li>
                        <StyledNavLink to="/products">
                            <CirclePile />
                            <span>Products</span>
                        </StyledNavLink>
                    </li>
                    <li>
                        <StyledNavLink to='/cart'>
                            <ShoppingBasket />
                            <span>Shopping Cart</span>
                            {itemsInBasket > 0 && <span>(x{itemsInBasket})</span>}
                        </StyledNavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}