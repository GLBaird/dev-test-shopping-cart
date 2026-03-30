import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/layouts/RootLayout'
import { Home } from '@/pages/Home'
import { Products } from '@/pages/Products'
import { ShoppingCart } from '@/pages/ShoppingCart'
import { NotFoundPage } from '@/pages/NotFound'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'products',
                element: <Products />,
            },
            {
                path: 'cart',
                element: <ShoppingCart />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
])