import type { Metadata } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'Cove Concept Innovations LTD — Building Brands That Stay Seen',
  description:
    'Cove Concept Innovations LTD is a creative and digital solutions company helping businesses build powerful brand presence through strategy, design, and consistent execution.',
  keywords: [
    'branding',
    'digital marketing',
    'social media management',
    'graphic design',
    'content strategy',
    'Abuja',
    'Nigeria',
  ],
  openGraph: {
    title: 'Cove Concept Innovations LTD',
    description: 'Building Brands That Stay Seen.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
