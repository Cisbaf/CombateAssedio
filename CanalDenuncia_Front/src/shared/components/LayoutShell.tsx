import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Image from "next/image";

export function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: "12px 24px",
        borderBottom: "1px solid #eaeaea",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box component= "a" href="/" sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/CISBAF_HORIZONTAL_LOGO.png"
            alt="Logo Cisbaf"
            width={127}
            height={35}
            style={{ objectFit: "contain", width: "auto", height: "auto" }}
            priority
          />
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "30px",
            alignSelf: "center",
            borderColor: "#dcdcdc",
            borderWidth: "1px",
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            color: "#2d2d2d",
            fontSize: "1rem",
            letterSpacing: "-0.01em",
          }}
        >
          Canal de{" "}
          <span style={{ color: "#0052cc" }}>
            Combate ao Assédio e Discriminação
          </span>
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: "50px",
          padding: "6px 18px",
        }}
        href="/protocolo"
      >
        Acompanhamento de Denúncias
      </Button>
    </Box>
  );
}

export function Footer() {
  return (
    <footer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px 24px",
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
    </footer>
  );
}
