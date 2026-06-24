"use client";

import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Denuncia } from "../schemas/AdminDenunciaSchema";
import { FormatDataHora } from "@/shared/components/formatters";
import InfoBox from "@/shared/components/infoBox";

interface props {
  denuncia: Denuncia;
}

async function postMsg(denuncia: Denuncia, mensagem: string) {
  return await fetch(`http://localhost:8080/form/mensagens/${denuncia.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ conteudo: mensagem }),
  });
}

export default function DenunciaMensagem({ denuncia }: props) {
  const [novaMensagem, setNovaMensagem] = useState("");
  const [mensagens, setMensagens] = useState(denuncia.mensagens || []);

  const handleSendMessage = async () => {
    if (!novaMensagem.trim()) return;

    try {
      const response = await postMsg(denuncia, novaMensagem);

      if (response.ok) {
        const novaMsg = await response.json();
        // Atualiza a tela imediatamente com a nova mensagem
        setMensagens([...mensagens, novaMsg]);
        setNovaMensagem("");
      } else {
        alert("Erro ao enviar mensagem. Verifique a aba Network.");
        console.error("Erro na resposta:", response.status);
      }
    } catch (error) {
      console.error("Erro no fetch:", error);
      alert("Erro de conexão ao tentar enviar a mensagem.");
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
        Chat de conversa {" "}
        <InfoBox
          texto="Nesta área, o administrador pode enviar mensagens para o denunciante. 
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
          gap: 2,
          p: 2,
          bgcolor: "grey.50",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        {mensagens.map((mensagem) => (
          <Box
            key={mensagem.id}
            sx={{
              alignSelf: "flex-start",
              maxWidth: "85%",
              bgcolor: "white",
              p: 1.5,
              borderRadius: 2,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
              borderLeft: "4px solid",
            }}
          >
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {mensagem.conteudo}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1, textAlign: "right" }}
            >
              {FormatDataHora(mensagem.dataEnvio)}
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
