import "./globals.css";
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      {/* Header */}
      <Box
        component="header"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: '12px 24px',
          borderBottom: '1px solid #eaeaea',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src="/CISBAF_HORIZONTAL_LOGO.png"
              alt="Logo Cisbaf"
              width={140}
              height={40}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: '30px',
              alignSelf: 'center',
              borderColor: '#dcdcdc',
              borderWidth: '1px'
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              color: '#2d2d2d',
              fontSize: '1rem',
              letterSpacing: '-0.01em'
            }}
          >
            Canal de <span style={{ color: '#0052cc' }}>Combate ao Assédio e Discriminação</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: '#e1f7ec',
            border: '1px solid #a3e2bc',
            borderRadius: '50px',
            padding: '6px 18px',
          }}
        >
          <LockIcon
            sx={{
              color: '#f5a623',
              fontSize: '1.1rem'
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: '#0fa85b',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Conexão Segura
          </Typography>
        </Box>
      </Box>

      {/*Barra de progresso*/}
      <body>
        <div className="container">
          <div className="progress-container">
            <div className="progress-steps">
              <div
                className="progress-line"
                id="progressLine"
                style={{ width: "0%" }}
              ></div>

              <div className="step active" data-step="1">
                <div className="step-circle">A</div>
                <div className="step-label">Identificação</div>
              </div>

              <div className="step" data-step="2">
                <div className="step-circle">B</div>
                <div className="step-label">Ofensor</div>
              </div>

              <div className="step" data-step="3">
                <div className="step-circle">C</div>
                <div className="step-label">Contexto</div>
              </div>

              <div className="step" data-step="4">
                <div className="step-circle">D</div>
                <div className="step-label">Descrição</div>
              </div>

              <div className="step" data-step="5">
                <div className="step-circle">E</div>
                <div className="step-label">Revisão</div>
              </div>

              <div className="step" data-step="6">
                <div className="step-circle">✓</div>
                <div className="step-label">Concluído</div>
              </div>
            </div>
          </div>
          
          {children}
        </div>
      </body>
      <footer>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '12px 24px' }}>
          <Typography variant="body2" sx={{ color: '#2d2d2d', fontWeight: 600, fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} CISBAF - Canal de Combate ao Assédio e Discriminação | Todos os direitos reservados.
          </Typography>
        </Box>
      </footer>
    </html>
  );
}
