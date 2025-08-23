import NextAuth from 'next-auth'
import { UserRole } from '@prisma/client'
import { prisma } from '@/shared/lib'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from '@/auth.config'

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token
      }

      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      })

      if (!existingUser) {
        return null
      }

      token.role = existingUser.role

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
