import { z } from 'zod'

export const productSchema = z.object({
    id: z.string().nonempty(),
    name: z.string().nonempty(),
    image: z.string(),
    dateAdded: z.coerce.date(),
    price: z.number().min(100),
    stock: z.number()
})

export type Product = z.infer<typeof productSchema>

export const quantityProductSchema = productSchema
    .omit({ stock: true })
    .extend({
        qty: z.number().int().nonnegative(),
    })

export type QuantityProduct = z.infer<typeof quantityProductSchema>