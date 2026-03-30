import ShoppingCartList from "@/components/ShoppingCartList";

export function ShoppingCart() {
    return (
        <section>
            <h1>Shopping Cart</h1>
            <p>You have the following items in your shopping cart:</p>
            <ShoppingCartList />
        </section>
    )
}
