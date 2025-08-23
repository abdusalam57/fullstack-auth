import Credentials from 'next-auth/providers/credentials'
import { LoginSchema } from '@/schemas'
import { prisma } from '@/shared/lib'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (!validatedFields.success) {
          return null
        }

        const { email, password } = validatedFields.data

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user?.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
