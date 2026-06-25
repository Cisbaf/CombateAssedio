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

import DenunciaMensagem from "./DenunciaMensagem";
import DenunciaPutStatus from "./DenunciaPutStatus";
import DenunciaDetalhamento from "./DenunciaDetalhamento";

interface props {
  denuncia: Denuncia;
  onClose: () => void;
}


export default function DenunciaModal({ denuncia, onClose }: props) {
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
        <DenunciaDetalhamento denuncia={denuncia} />

          {/* Chat de conversa */}
          <DenunciaMensagem denuncia={denuncia}  />

          {/* Botões de ação - status da denuncia */}
          <DenunciaPutStatus denuncia={denuncia}/>

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
