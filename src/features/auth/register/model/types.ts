import z from 'zod'
import { RegisterSchema } from './schema'

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
