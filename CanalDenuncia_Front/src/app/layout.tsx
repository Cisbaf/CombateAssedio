import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import "./globals.css";
import React from "react";
import { Box } from "@mui/material";
import { Header, Footer } from "@/shared/components/LayoutShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body suppressHydrationWarning>
        <AppRouterCacheProvider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />

            <Box
              component="main"
              sx={{
                flex: 1,
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "2rem",
              }}
            >
              {children}
            </Box>

            <Footer />
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
