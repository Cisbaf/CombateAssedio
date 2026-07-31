import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  DialogActions,
  Button,
} from "@mui/material";

import { Denuncia } from "@/features/admin/schemas/AdminDenunciaSchema";
import DenunciaDetalhamento from "@/features/admin/components/DenunciaDetalhamento";
import { FormatDataHora } from "@/shared/formatters";

interface props {
  denuncia: Denuncia;
  onClose: () => void;
}

export default function Protocolo({ denuncia, onClose }: props) {
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

          {/* Componente extra de mensagens */}
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
              Chat de atualizações
            </Typography>
            {denuncia.mensagens?.length === 0 && (
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
              {denuncia.mensagens?.map((mensagem) => (
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
                    Atualização adicionada em{" "}
                    {FormatDataHora(mensagem.dataEnvio)}
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
          </Box>
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
