"use client";

import {
  Box,
  Divider,
  Typography,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoBox from "@/shared/infoBox";
import { useState } from "react";
import { Denuncia } from "../schemas/AdminDenunciaSchema";
import { postAnexos } from "@/api/denunciaApi";

interface props {
  denuncia: Denuncia;
  onUpdate?: () => void;
}

export default function DenunciaAnexo({ denuncia, onUpdate }: props) {
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const handlePostAnexos = async () => {
    try {
      const uploadPromises = arquivos.map((arquivo) => {
        const formData = new FormData();
        formData.append("arquivo", arquivo);
        return postAnexos(denuncia.id, formData);
      });
      await Promise.all(uploadPromises);
      setArquivos([]);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Erro ao enviar anexos", error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setArquivos((prev) => [...prev, ...Array.from(files)]);
    }
  };

  function handleSelecionarArquivos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setArquivos((prev) => [...prev, ...Array.from(files)]);
    }
  }

  const removerArquivo = (indexToRemove: number) => {
    setArquivos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Upload de arquivos
  return (
    <Box sx={{ pt: "2rem", pb: "2rem" }}>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 700,
          marginBottom: "8px",
          color: "#374151",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <UploadFileIcon sx={{ color: "var(--primary)" }} /> Upload de Arquivos
        <InfoBox texto="Carregue arquivos relevantes para a denúncia." />
      </Typography>
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          padding: "2rem",
          border: "2px dashed",
          borderColor: isDragActive ? "#3b82f6" : "#cbd5e1",
          borderRadius: "15px",
          backgroundColor: isDragActive ? "#eff6ff" : "#f8fafc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease",
          cursor: "pointer",
          "&:hover": {
            borderColor: "#3b82f6",
            backgroundColor: "#eff6ff",
          },
        }}
        component="label"
      >
        <input
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.xlsx,.xls,.doc,.docx"
          onChange={handleSelecionarArquivos}
          style={{ display: "none" }}
        />
        <CloudUploadIcon
          sx={{
            fontSize: 48,
            color: isDragActive ? "#3b82f6" : "#94a3b8",
            mb: 2,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#334155",
            fontWeight: 600,
            mb: 1,
            textAlign: "center",
          }}
        >
          {isDragActive
            ? "Solte os arquivos aqui"
            : "Arraste e solte seus arquivos aqui"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#64748b", mb: 2, textAlign: "center" }}
        >
          ou clique para selecionar do seu computador
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#94a3b8", textAlign: "center" }}
        >
          Aceita imagens, vídeos, PDF, Excel e Word (Máx. 10MB por arquivo)
        </Typography>
      </Box>

      {arquivos.length > 0 && (
        <Box sx={{ width: "100%", maxWidth: 800, margin: "0 auto", mt: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: "#475569", fontWeight: 600, mb: 2 }}
          >
            Arquivos Selecionados ({arquivos.length})
          </Typography>
          <Stack spacing={1.5}>
            {arquivos.map((f, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <InsertDriveFileIcon sx={{ color: "#3b82f6" }} />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, color: "#334155" }}
                    >
                      {f.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                      {(f.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    removerArquivo(i);
                  }}
                  size="small"
                  sx={{ color: "#ef4444" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
      <Button
        variant="contained"
        onClick={handlePostAnexos}
        sx={{
          alignSelf: "flex-end",
          mt: 2,
          px: 4,
          py: 1,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Anexar documentos
      </Button>
    </Box>
  );
}
