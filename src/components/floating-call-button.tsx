import { MessageCircle, Phone } from 'lucide-react'

import { siteConfig } from '@/lib/seo'

function toTelHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`
}

function toWhatsappHref(phone: string) {
  // 06 37 53 43 26 -> 33637534326 (format international sans +)
  const digits = phone.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `33${digits.slice(1)}` : digits
  return `https://wa.me/${intl}`
}

export function FloatingCallButton() {
  const tel = toTelHref(siteConfig.phone)
  const wa = toWhatsappHref(siteConfig.phone)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter par WhatsApp"
        className="group flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-1 ring-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95 sm:size-13"
      >
        <MessageCircle className="size-5 transition-transform duration-300 group-hover:rotate-6" />
      </a>
      <a
        href={tel}
        aria-label={`Appeler le ${siteConfig.phone}`}
        className="group flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 active:scale-95 sm:size-13"
      >
        <Phone className="size-5 transition-transform duration-300 group-hover:rotate-12" />
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" style={{ animationDuration: '3s' }} />
      </a>
    </div>
  )
}
