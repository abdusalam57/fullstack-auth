'use client'

import { Button } from '@/shared/ui'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaYandex } from 'react-icons/fa'

export function Social() {
  return (
    <div className="mb-2 grid grid-cols-2 gap-6 space-y-3">
      <Button
        onClick={() =>
          signIn('google', {
            redirectTo: '/settings',
          })
        }
        variant="outline"
        className="cursor-pointer"
      >
        <FcGoogle className="mr-2 size-4" />
        Google
      </Button>
      <Button
        disabled
        variant="outline"
        className="cursor-pointer"
      >
        <FaYandex className="mr-2 size-4" />
        Яндекс
      </Button>
    </div>
  )
}
