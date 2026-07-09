"use client";

import { useState } from "react";
import { Box, Typography, Stack, Button, Paper, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import AddIcon from "@mui/icons-material/Add";
import type { DadosFormulario } from "@/features/denuncia/schemas/denunciaType";
import ResumoDenuncia from "./ResumoDenuncia";

interface StepFProps {
  protocolo: string;
  dadosFormulario?: DadosFormulario;
}

const proximosPassos = [
  { numero: 1, titulo: "Análise Inicial", descricao: "Nossa equipe de compliance avaliará sua denúncia." },
  { numero: 2, titulo: "Investigação", descricao: "Caso necessário, entraremos em contato pelos meios fornecidos para obter mais detalhes." },
  { numero: 3, titulo: "Acompanhamento", descricao: "Utilize o seu número de protocolo para consultar o status de andamento em nosso canal." },
  { numero: 4, titulo: "Resolução", descricao: "Você receberá uma notificação conclusiva assim que a investigação estiver encerrada." },
];

function PassoItem({ numero, titulo, descricao }: (typeof proximosPassos)[number]) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Box sx={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#eff6ff", border: "2px solid #3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563eb", fontWeight: 700, flexShrink: 0 }}>
        {numero}
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#334155" }}>{titulo}</Typography>
        <Typography variant="body2" color="text.secondary">{descricao}</Typography>
      </Box>
    </Box>
  );
}

function GridActions({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "center", gap: 2, "& > button": { flex: { xs: "1 1 100%", sm: "0 1 auto" }, minWidth: 160 } }}>
      {children}
    </Box>
  );
}

export default function StepF({ protocolo, dadosFormulario }: StepFProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => { navigator.clipboard.writeText(protocolo); setCopied(true); setTimeout(() => setCopied(false), 3000); };
  const handlePrint = () => window.print();
  const handleReload = () => window.location.reload();

  return (
    <Box sx={{ width: "auto", height: "auto", margin: "0 auto" }}>
      <Box sx={{ padding: "1rem", width: "100%", backgroundColor: "#10b981", borderRadius: "8px 8px 0 0", color: "white", textAlign: "center", '@media print': { display: 'none' } }}>
        <Typography variant="h5" sx={{ fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckCircleIcon sx={{ fontSize: 32, color: "#fff", marginRight: "8px" }} />
          Denúncia Enviada com Sucesso!
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: "white", padding: "2rem", textAlign: "center", '@media print': { padding: 0 } }}>
        <Stack spacing={4} sx={{ maxWidth: 700, margin: "0 auto", alignItems: "center", justifyContent: "center", '@media print': { display: 'block' } }}>
          <Typography variant="body1" sx={{ color: "#4b5563", fontSize: "1.1rem", '@media print': { display: 'none' } }}>
            Sua denúncia foi registrada e será analisada pela equipe responsável com total sigilo e confidencialidade.
          </Typography>

          <Paper variant="outlined" sx={{ p: 3, backgroundColor: "#f0fdf4", borderColor: "#a7f3d0", borderRadius: "12px", maxWidth: 500, margin: "0 auto", width: "100%", '@media print': { border: '1px solid #e2e8f0', backgroundColor: 'transparent', p: 2, mb: 4, display: 'inline-block' } }}>
            <Typography variant="caption" sx={{ textTransform: "uppercase", color: "#065f46", fontWeight: 700, letterSpacing: 1 }}>Seu Número de Protocolo</Typography>
            <Typography variant="h4" sx={{ fontFamily: "monospace", fontWeight: 700, color: "#047857", my: 1.5, letterSpacing: 2 }}>{protocolo || "DEN-2026-XXXXXX"}</Typography>
            <Alert severity="warning" icon={false} sx={{ backgroundColor: "#fffbeb", color: "#92400e", border: "1px solid #fde68a", borderRadius: "8px", textAlign: "left", fontSize: "0.85rem", '@media print': { display: 'none' } }}>
              ⚠️ <strong>Guarde este número!</strong> Você precisará dele para acompanhar o andamento de sua denúncia.
            </Alert>
          </Paper>

          {dadosFormulario && (
            <Box sx={{ display: 'none', '@media print': { display: 'block', width: '100%', textAlign: 'left', mt: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", mb: 3, borderBottom: '1px solid #e2e8f0', pb: 1 }}>Resumo da Denúncia</Typography>
              <ResumoDenuncia dadosFormulario={dadosFormulario} />
            </Box>
          )}

          <Box sx={{ textAlign: "left", mt: 4, '@media print': { display: 'none' } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e293b", mb: 3 }}>📋 Próximos Passos</Typography>
            <Stack spacing={3}>
              {proximosPassos.map((passo) => <PassoItem key={passo.numero} {...passo} />)}
            </Stack>
          </Box>

          <Box sx={{ pt: 3, borderTop: "1px solid #e2e8f0", width: '100%', '@media print': { display: 'none' } }}>
            <GridActions>
              <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopy} sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600, borderColor: "#cbd5e1", color: "#475569", "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" } }}>{copied ? "Copiado!" : "Copiar Protocolo"}</Button>
              <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint} sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600, borderColor: "#cbd5e1", color: "#475569", "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" } }}>Imprimir</Button>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleReload} sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 600, backgroundImage: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", "&:hover": { backgroundImage: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" } }}>Nova Denúncia</Button>
            </GridActions>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
