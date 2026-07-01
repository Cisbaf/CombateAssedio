"use client";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";



export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
      <Box
        component="footer"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px 24px",
          mt: 'auto',
        }}
      >
        
          {isMobile ? (
            <Typography
          variant="body2"
          sx={{ color: "#2d2d2d", fontWeight: 600, fontSize: "0.875rem" }}
        >
            © {new Date().getFullYear()} CISBAF | Todos os direitos reservados. 
            </Typography>
          ) : (
            <Typography
          variant="body2"
          sx={{ color: "#2d2d2d", fontWeight: 600, fontSize: "0.875rem" }}
        >
          © {new Date().getFullYear()} CISBAF - Canal de Combate ao Assédio e
          Discriminação | Todos os direitos reservados.
          </Typography>
          )}
        
      </Box>
  );
}
