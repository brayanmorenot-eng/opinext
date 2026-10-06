import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OPIMED — Technology for ophthalmology',
  description: 'OPIMED Studio v1 — visual page builder and multimedia experience.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
