'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { VerifyEmailAction } from '@/actions'
import { Loading } from '@/shared/ui'

export function VerifyEmail() {
  const token = useSearchParams().get('token')
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        toast.error('Неверная ссылка подтверждения')
        setIsLoading(false)
        return
      }

      try {
        const result = await VerifyEmailAction(token)

        if (result?.error) {
          toast.error(result.error)
        } else if (result?.success) {
          toast.success(result.success)

          setTimeout(() => {
            router.push('/auth/login')
          }, 3000)
        }
      } catch {
        toast.error('Ошибка при подтверждении почты')
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [token, router])

  return isLoading && <Loading />
}
