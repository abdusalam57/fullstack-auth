import z from 'zod'
import { NewPasswordSchema } from './schema'

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>
