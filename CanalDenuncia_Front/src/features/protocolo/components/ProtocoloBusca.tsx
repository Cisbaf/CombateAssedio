"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StepHeader from "@/features/denuncia/components/StepHeader";
import Protocolo from "./Protocolo";
import { getDenunciaFromProtocolo } from "@/api/denunciaApi";
import { useState } from "react";
import { Denuncia } from "@/features/admin/schemas/AdminDenunciaSchema";

const textFieldSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "white",
    transition: "all 0.2s",
    "&:hover fieldset": { borderColor: "#3b82f6" },
    "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
  },
};

export default function ProtocoloBusca() {
  const [protocolo, setProtocolo] = useState("");
  const [denuncia, setDenuncia] = useState<Denuncia | null>(null);

  const handleBusca = async (protocoloBusca: string) => {
    if (!protocoloBusca.trim()) return;

    const data = await getDenunciaFromProtocolo(protocoloBusca);

    if (data) {
      setDenuncia(data);
    } else {
      alert("Erro ao buscar denuncia.");
    }
  };

  return (
    <Box
      sx={{
        background: "white",
        maxWidth: "900px",
        margin: "0 auto",
        boxShadow: "0 5px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      <StepHeader
        Icon={SearchIcon}
        title="Consulte o Status da sua Denúncia"
        subtitle="Acompanhe o andamento e visualize as respostas do administrador."
      />

      <Box sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#1f2937", mb: 1 }}
          >
            Número de Protocolo
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280", mb: 3 }}>
            Insira o código de protocolo recebido no momento da denúncia para
            acessar as informações atualizadas de forma segura e sigilosa.
          </Typography>

          <TextField
            fullWidth
            placeholder="Ex: PROT-A1B2C3D4"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <ReceiptIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                  </InputAdornment>
                ),
                onChange: (e) => setProtocolo(e.target.value),
              },
            }}
            sx={textFieldSx}
          />
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#4b5563", mb: 2 }}
          >
            Importante:
          </Typography>
          <ul
            style={{
              paddingLeft: "20px",
              color: "#6b7280",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            <li style={{ marginBottom: "8px" }}>
              Mantenha seu protocolo em local seguro. Ele é a única forma de
              acessar o andamento do processo.
            </li>
            <li>
              As atualizações são feitas conforme o andamento da investigação,
              garantindo total sigilo.
            </li>
          </ul>
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            textTransform: "none",
            backgroundColor: "#2563eb",
            "&:hover": {
              backgroundImage:
                "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            },
          }}
          onClick={() => handleBusca(protocolo)}
        >
          Consultar Status
        </Button>
      </Box>

      {/* Modal sobrepondo a tela atual */}
      {denuncia && (
        <Protocolo denuncia={denuncia} onClose={() => setDenuncia(null)} />
      )}
    </Box>
  );
}
