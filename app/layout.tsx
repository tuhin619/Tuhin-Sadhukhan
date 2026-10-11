import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Personal eBook Store | Tactical Guides by Tuhin Sadhukhan',
  description: 'Production-ready personal eBook store with direct UPI payments, manual verification, and secure digital delivery by Tuhin Sadhukhan.',
  keywords: ['eBooks', 'Tuhin Sadhukhan', 'Freelancing Guide', 'Personal Finance India', 'Digital Products', 'UPI Store'],
  authors: [{ name: 'Tuhin Sadhukhan' }],
  openGraph: {
    title: 'My Personal eBook Store | Tactical Guides by Tuhin Sadhukhan',
    description: 'Production-ready personal eBook store with direct UPI payments, manual verification, and secure digital delivery.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Personal eBook Store | Tactical Guides by Tuhin Sadhukhan',
    description: 'Production-ready personal eBook store with direct UPI payments, manual verification, and secure digital delivery.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className="bg-stone-50 text-stone-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}

