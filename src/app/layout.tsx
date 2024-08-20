import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import Providers from "@/app/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AutoComplete Component",
  description: "AutoComplete Component By Omar Dugha",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
