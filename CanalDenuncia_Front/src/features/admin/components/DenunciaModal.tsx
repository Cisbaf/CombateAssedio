import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Divider,
  Chip,
  IconButton,
  Paper
} from "@mui/material";
import { Denuncia, StatusDenuncia } from "../schemas/AdminDenunciaSchema";
import CloseIcon from "@mui/icons-material/Close";
import { FormatDataHora, FormatDate,FormatCPF,FormatPhone } from "@/shared/components/formatters";

interface props {
  denuncia: Denuncia;
  onClose: () => void;
}

const getStatusColor = (status: StatusDenuncia) => {
  switch (status) {
    case "PENDENTE": return "warning";
    case "EM_INVESTIGACAO": return "info";
    case "RESOLVIDA": return "success";
    case "ARQUIVADA": return "default";
    default: return "default";
  }
};

const getStatusLabel = (status: StatusDenuncia) => {
  switch (status) {
    case "PENDENTE": return "Pendente";
    case "EM_INVESTIGACAO": return "Em Investigação";
    case "RESOLVIDA": return "Resolvida";
    case "ARQUIVADA": return "Arquivada";
    default: return status;
  }
}

export default function DenunciaModal({ denuncia, onClose }: props) {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">Protocolo</Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>{denuncia.protocolo}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Chip 
              label={getStatusLabel(denuncia.status)} 
              color={getStatusColor(denuncia.status) as any} 
              sx={{ fontWeight: "medium" }}
            />
            <Chip 
              label={denuncia.isAnonimo ? "Anônima" : "Identificada"} 
              variant="outlined"
            />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom color="primary.main" sx={{ fontWeight: "bold" }}>
              Informações do Relato
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Data do Ocorrido</Typography>
                <Typography variant="body1">{denuncia.relato?.dataOcorrido ? FormatDate(denuncia.relato.dataOcorrido) : "Não informado"}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Horário</Typography>
                <Typography variant="body1">{denuncia.relato?.horarioOcorrido || "Não informado"}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Local</Typography>
                <Typography variant="body1">{denuncia.relato?.localOcorrido || "Não informado"}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Categoria</Typography>
                <Typography variant="body1">{denuncia.relato?.categoria || "Não informado"}</Typography>
              </Box>
              
            </Box>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom color="primary.main" sx={{ fontWeight: "bold" }}>
              Envolvidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Tipo de Denunciante</Typography>
                <Typography variant="body1">{denuncia.tipoDenunciante}</Typography>
              </Box>
              {!denuncia.isAnonimo && denuncia.vitima?.nome && (
                <Box>
                  <Typography variant="body2" color="text.secondary">Vítima (Nome)</Typography>
                  <Typography variant="body1">{denuncia.vitima.nome}</Typography>
                </Box>
              )}
              {denuncia.ofensor?.nome && (
                <Box>
                  <Typography variant="body2" color="text.secondary">Ofensor (Nome)</Typography>
                  <Typography variant="body1">{denuncia.ofensor.nome}</Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ gridColumn: '1 / -1' }}>
            <Typography variant="h6" gutterBottom color="primary.main" sx={{ fontWeight: "bold" }}>
              Descrição do Ocorrido
            </Typography>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                bgcolor: "grey.50", 
                border: "1px solid", 
                borderColor: "grey.200",
                borderRadius: 2
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {denuncia.relato?.descricao || "Nenhuma descrição fornecida."}
              </Typography>
            </Paper>
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
