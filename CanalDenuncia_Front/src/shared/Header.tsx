"use client";

import { Box, Typography, Divider, Button, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: { xs: "10px 16px", sm: "12px 24px" },
        borderBottom: "1px solid #eaeaea",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          component="a"
          href="/"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {isMobile ? (
            <Image
              src="/LogoCisbafSimples.png"
              alt="Logo Cisbaf"
              width={45}
              height={45}
              style={{ objectFit: "contain", width: "auto", height: "auto" }}
              priority
            />
          ) : (
            <Image
              src="/CISBAF_HORIZONTAL_LOGO.png"
              alt="Logo Cisbaf"
              width={127}
              height={35}
              style={{ objectFit: "contain", width: "auto", height: "auto" }}
              priority
            />
          )}
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: "30px",
            alignSelf: "center",
            borderColor: "#dcdcdc",
            borderWidth: "1px",
            mx: "6px",
          }}
        />

        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            color: "#2d2d2d",
            fontSize: { xs: "0.75rem", sm: "1rem" },
            letterSpacing: "-0.01em",
          }}
        >
          Canal de{" "}
          <span style={{ color: "#0052cc" }}>
            {isMobile ? "Combate ao Assédio" : "Combate ao Assédio e Discriminação"}
          </span>
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{
          borderRadius: "50px",
          padding: { xs: "5px 10px", sm: "6px 18px" },
          fontSize: { xs: "0.7rem", sm: "0.875rem" },
          whiteSpace: "nowrap",
          minWidth: { xs: "unset", sm: "auto" },
        }}
        href="/protocolo"
      >
        {isMobile ? "Protocolo" : "Acompanhamento de Denúncias"}
      </Button>
    </Box>
  );
}
