import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export const metadata: Metadata = {
    title: "Para Ti 🎀",
    description: "Un regalito especial mi gatita bonita",
    manifest: "/manifest.json",
    icons: {
        icon: "/icon.svg",
        apple: "/icon.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className="font-sans antialiased">
                {children}
                <Analytics />
                <Script id="register-sw" strategy="afterInteractive">
                    {`
                        if ('serviceWorker' in navigator) {
                            window.addEventListener('load', () => {
                                navigator.serviceWorker.register('/sw.js')
                                    .then(reg => console.log('SW registered'))
                                    .catch(err => console.log('SW error:', err));
                            });
                        }
                    `}
                </Script>
            </body>
        </html>
    );
}
