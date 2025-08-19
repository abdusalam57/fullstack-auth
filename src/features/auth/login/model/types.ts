import z from 'zod'
import { LoginSchema } from './schema'

export type LoginSchemaType = z.infer<typeof LoginSchema>
