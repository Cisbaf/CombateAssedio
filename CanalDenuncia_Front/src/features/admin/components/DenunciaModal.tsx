import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { Denuncia } from "../schemas/AdminDenunciaSchema";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { getDenunciaFromProtocolo } from "@/api/denunciaApi";

import DenunciaMensagem from "./DenunciaMensagem";
import DenunciaPutStatus from "./DenunciaPutStatus";
import DenunciaDetalhamento from "./DenunciaDetalhamento";
import DenunciaAnexo from "./DenunciaAnexo";

interface props {
  denuncia: Denuncia;
  onClose: () => void;
}

export default function DenunciaModal({ denuncia, onClose }: props) {
  const [currentDenuncia, setCurrentDenuncia] = useState<Denuncia>(denuncia);

  const fetchDenuncia = async () => {
    if (currentDenuncia.protocolo) {
      const data = await getDenunciaFromProtocolo(currentDenuncia.protocolo);
      if (data) setCurrentDenuncia(data);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Detalhes da Denúncia
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <DenunciaDetalhamento denuncia={currentDenuncia} />

          {/* Chat de conversa */}
          <DenunciaMensagem denuncia={currentDenuncia} onUpdate={fetchDenuncia} />

          {/* Anexos */}
          <DenunciaAnexo denuncia={currentDenuncia} onUpdate={fetchDenuncia} />

          {/* Botões de ação - status da denuncia */}
          <DenunciaPutStatus denuncia={currentDenuncia} onUpdate={fetchDenuncia} />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" color="primary">
          Fechar
        </Button>
      </DialogActions>
      
    </Dialog>
  );
}
