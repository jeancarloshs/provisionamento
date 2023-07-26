import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Provisionamento FTTH Naxos Telecom',
  description: 'Página voltada para a Empresa Naxos Telecom, para estar realizando ativações de clientes na rede FTTH na OLT Nokia utilizando ONU/ONT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>{metadata.title}</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
