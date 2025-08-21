import z from 'zod'
import { ResetPasswordSchema } from './schema'

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>
