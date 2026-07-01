import { Box, Typography } from "@mui/material";



export default function Footer() {
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
        <Typography
          variant="body2"
          sx={{ color: "#2d2d2d", fontWeight: 600, fontSize: "0.875rem" }}
        >
          © {new Date().getFullYear()} CISBAF - Canal de Combate ao Assédio e
          Discriminação | Todos os direitos reservados.
        </Typography>
      </Box>
  );
}
