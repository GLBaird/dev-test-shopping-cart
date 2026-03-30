import {Link} from "react-router";

export function NotFoundPage() {
    return (
        <section>
            <h1>Page not found</h1>
            <p>Please check your URL or return to home</p>
            <Link to='/'>Return to home</Link>
        </section>
    )
}