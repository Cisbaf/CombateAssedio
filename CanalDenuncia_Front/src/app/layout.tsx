import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import "./globals.css";
import React from 'react';
import { Box } from '@mui/material';
import { Header, Footer } from '@/components/LayoutShell';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>
        <AppRouterCacheProvider>
          <Header />

          <Box sx={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '2rem',
          }}>
            {children}
          </Box>

          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
