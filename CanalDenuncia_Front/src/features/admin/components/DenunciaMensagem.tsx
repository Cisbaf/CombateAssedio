"use client";

import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Denuncia } from "../schemas/AdminDenunciaSchema";
import { FormatDataHora } from "@/shared/formatters";
import InfoBox from "@/shared/infoBox";
import { postMsg } from "@/api/denunciaApi";

interface props {
  denuncia: Denuncia;
  onUpdate?: () => void;
}

export default function DenunciaMensagem({ denuncia, onUpdate }: props) {
  const [novaMensagem, setNovaMensagem] = useState("");
  const [mensagens, setMensagens] = useState(denuncia.mensagens || []);

  useEffect(() => {
    setMensagens(denuncia.mensagens || []);
  }, [denuncia.mensagens]);

  const handleSendMessage = async () => {
    if (!novaMensagem.trim()) return;

    const novaMsg = await postMsg(denuncia, novaMensagem);

    if (novaMsg) {
      // Atualiza a tela imediatamente com a nova mensagem
      const novasMensagens = [...mensagens, novaMsg];
      setMensagens(novasMensagens);
      setNovaMensagem("");
      if (onUpdate) onUpdate();
    } else {
      alert("Erro ao enviar mensagem. Verifique a aba Network.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        color="primary.main"
        sx={{ fontWeight: "bold" }}
      >
        Atualização da denúncia{" "}
        <InfoBox
          texto="Nesta área, ficará registrado o histórico de informações sobre a denúncia. 
        Todas as mensagens são registradas e arquivadas junto com a denúncia para garantir transparência e controle.
        O denunciante poderá visualizar as mensagens a partir do protocolo."
        />
      </Typography>
      {mensagens.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Nenhuma mensagem
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          p: 1,
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {mensagens.map((mensagem) => (
          <Box
            key={mensagem.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              position: "relative",
              pl: 2,
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "4px",
                bgcolor: "error.main",
                borderRadius: 4,
                opacity: 0.8,
              },
            }}
          >
            <Typography
              variant="body2"
              color="error.main"
              sx={{ fontWeight: "medium", opacity: 0.9 }}
            >
              Atualização adicionada em {FormatDataHora(mensagem.dataEnvio)}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {mensagem.conteudo}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 1 }}>
        <TextField
          label="Escreva sua mensagem..."
          variant="outlined"
          fullWidth
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          multiline
          maxRows={4}
          sx={{ bgcolor: "white" }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{
            alignSelf: "flex-end",
            px: 4,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
}
