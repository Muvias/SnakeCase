import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  return formatter.format(price)
}

export function constructMetadata({
  title = "SnakeCase - Capinhas personalizadas de alta qualidade",
  description = "Crie capinhas personalizadas de alta qualidade em segundos",
  image = "/thumbnail.png",
  icons = "/favicon.ico"
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image }]
    },
    icons,
    metadataBase: new URL("https://snake-case.vercel.app/")
  }
}
