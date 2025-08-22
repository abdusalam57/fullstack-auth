import type { PropsWithChildren } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from '@/shared/ui'

import { Social } from '@/features/auth/social'
import Link from 'next/link'

interface CardWrapperProps {
  headerLabel: string
  description?: string
  backButtonLabel?: string
  backButtonHref?: string
  showSocial?: boolean
}

export function CardWrapper({
  children,
  headerLabel,
  description,
  backButtonLabel,
  backButtonHref,
  showSocial = false,
}: PropsWithChildren<CardWrapperProps>) {
  return (
    <Card className="w-[400px] gap-3">
      <CardHeader className="space-y-2">
        <CardTitle>{headerLabel}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {showSocial && <Social />}
        {children}
      </CardContent>
      <CardFooter>
        {backButtonLabel && backButtonHref && (
          <Button
            variant="link"
            className="w-full font-normal"
          >
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
