import Image from 'next/image'
import Link from 'next/link'

import { brandLogos } from '@/lib/site-content'
import { siteConfig } from '@/lib/seo'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      className={cn(
        'group inline-flex items-center transition-opacity hover:opacity-90',
        className
      )}
    >
      <Image
        src={brandLogos.logoTransparent}
        alt={siteConfig.name}
        width={220}
        height={56}
        priority
        className="h-11 w-auto sm:h-12"
      />
    </Link>
  )
}
