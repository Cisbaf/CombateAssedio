"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  Alert,
  Snackbar,
  Grid,
  CircularProgress,
  Button,
  LinearProgress,
} from "@mui/material";

import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { enviarDenuncia, getDenunciaFromProtocolo, postAnexos } from "@/api/denunciaApi";
import type { DadosFormulario } from "@/features/denuncia/schemas/denunciaType";
import StepHeader from "@/features/denuncia/components/StepHeader";
import ResumoDenuncia from "./ResumoDenuncia";
import { FormatCPF, FormatPhone } from "@/shared/formatters";
/*
function formatCPF(cpf?: string) {
  if (!cpf) return "-";
  if (cpf.length === 11)
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  return cpf;
}

function formatTelefone(tel?: string) {
  if (!tel) return "-";
  if (tel.length === 11)
    return tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  return tel;
}
*/

function formatEnumLabel(text?: string) {
  if (!text) return "-";
  return text.replace(/_/g, " ");
}

interface StepEProps {
  dadosFormulario: DadosFormulario;
  onAvançar: (protocolo: string) => void;
  onVoltar: () => void;
}

export default function StepE({
  dadosFormulario,
  onAvançar,
  onVoltar,
}: StepEProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");

  const step0 = dadosFormulario.step0 || {};
  const step1 = dadosFormulario.step1 || {};
  const step2 = dadosFormulario.step2 || {};
  const step3 = dadosFormulario.step3 || {};

  const isAnonimo: boolean = step0.isAnonimo;
  const tipoDenunciante: string = step0.tipoDenunciante;

  const handleEnviar = async () => {
    setLoading(true);
    setErrorMessage("");
    setUploadProgress(0);
    setUploadMessage("Criando denúncia no sistema...");

    const result = await enviarDenuncia(dadosFormulario);

    if (result && result.protocolo) {
      const arquivosToUpload = step3.arquivos || [];
      if (arquivosToUpload.length > 0) {
        setUploadMessage("Aguardando ID da denúncia...");
        const denunciaCriada = await getDenunciaFromProtocolo(result.protocolo);
        
        if (denunciaCriada && denunciaCriada.id) {
          const total = arquivosToUpload.length;

          for (let i = 0; i < total; i++) {
            const arquivo = arquivosToUpload[i];
            setUploadMessage(`Enviando arquivo ${i + 1} de ${total}: ${arquivo.name}`);
            setUploadProgress(Math.round((i / total) * 100));

            const formData = new FormData();
            formData.append("arquivo", arquivo);
            postAnexos(denunciaCriada.id, formData);
          }
          setUploadProgress(100);
          setUploadMessage("Todos os arquivos enviados!");
        }
      }

      onAvançar(result.protocolo);
    } else {
      setErrorMessage("Não foi possível conectar com o servidor da API.");
      setOpenSnack(true);
    }

    setLoading(false);
  };

  return (
    <Box sx={{ width: "auto", height: "auto", margin: "0 auto" }}>
      <StepHeader
        Icon={RateReviewIcon}
        title="Etapa E - Revisão e Confirmação"
        subtitle="Verifique todas as informações antes de enviar a denúncia"
      />

      <Box sx={{ backgroundColor: "white", padding: "2rem" }}>
        <Alert
          severity="warning"
          sx={{
            borderRadius: "8px",
            border: "1px solid var(--warning)",
            backgroundColor: "#FEF3C7",
            mb: 4,
          }}
        >
          <strong>Revise com atenção!</strong> Após o envio, a denúncia não
          poderá ser alterada.
        </Alert>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: "8px" }}>
            <strong>Erro ao enviar:</strong> {errorMessage}
          </Alert>
        )}

        <ResumoDenuncia dadosFormulario={dadosFormulario} />
      </Box>

      {/* Botões */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 800,
          margin: "0 auto",
          px: 2,
          mt: 4,
          mb: 4,
        }}
      >
        {loading && uploadMessage && (
          <Box sx={{ width: "100%", mb: 3 }}>
            <Typography variant="body2" sx={{ color: "#475569", mb: 1, textAlign: "center", fontWeight: 500 }}>
              {uploadMessage}
            </Typography>
            <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 8, borderRadius: 4 }} />
          </Box>
        )}
        
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", width: "100%" }}>
          <Button
            variant="contained"
            disabled={loading}
            onClick={onVoltar}
            sx={{
              backgroundColor: "gray",
              "&:hover": { backgroundColor: "darkgray" },
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "white", fontWeight: 600 }}
            >
              ← Voltar e Editar
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={loading}
            onClick={handleEnviar}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              px: 4,
              backgroundImage:
                "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              "&:hover": {
                backgroundImage:
                  "linear-gradient(135deg, #059669 0%, #047857 100%)",
              },
            }}
          >
            {loading && !uploadMessage ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : loading ? (
              <Typography
                variant="subtitle2"
                sx={{ color: "white", fontWeight: 600 }}
              >
                Enviando...
              </Typography>
            ) : (
              <Typography
                variant="subtitle2"
                sx={{ color: "white", fontWeight: 600 }}
              >
                ✅ Enviar Denúncia
              </Typography>
            )}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnack(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
