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
  Paper,
} from "@mui/material";
import { Denuncia, StatusDenuncia } from "../schemas/AdminDenunciaSchema";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormatDataHora,
  FormatDate,
  FormatCPF,
  FormatPhone,
} from "@/shared/components/formatters";

interface props {
  denuncia: Denuncia;
  onClose: () => void;
}

const getStatusColor = (status: StatusDenuncia) => {
  switch (status) {
    case "PENDENTE":
      return "warning";
    case "EM_INVESTIGACAO":
      return "info";
    case "RESOLVIDA":
      return "success";
    case "ARQUIVADA":
      return "default";
    default:
      return "default";
  }
};

const getStatusLabel = (status: StatusDenuncia) => {
  switch (status) {
    case "PENDENTE":
      return "Pendente";
    case "EM_INVESTIGACAO":
      return "Em Investigação";
    case "RESOLVIDA":
      return "Resolvida";
    case "ARQUIVADA":
      return "Arquivada";
    default:
      return status;
  }
};

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
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Protocolo
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {denuncia.protocolo}
            </Typography>
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
          }}
        >
          {/* INFORMAÇÕES DO RELATO */}
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              color="primary.main"
              sx={{ fontWeight: "bold" }}
            >
              Informações do Relato
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Data do Ocorrido
                </Typography>
                <Typography variant="body1">
                  {denuncia.relato?.dataOcorrido
                    ? FormatDate(denuncia.relato.dataOcorrido)
                    : "Não informado"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Horário
                </Typography>
                <Typography variant="body1">
                  {denuncia.relato?.horarioOcorrido || "Não informado"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Local
                </Typography>
                <Typography variant="body1">
                  {denuncia.relato?.localOcorrido || "Não informado"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Categoria
                </Typography>
                <Typography variant="body1">
                  {denuncia.relato?.categoria || "Não informado"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* INFORMAÇÕES DO TERCEIRO */}
          {!denuncia.isAnonimo && denuncia.tipoDenunciante === "TERCEIRO" && (
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                Informações do Terceiro
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Nome
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.terceiro?.nome || "Não informado"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Idade
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.terceiro?.idade || "Não informado"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    CPF
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.terceiro?.cpf
                      ? FormatCPF(denuncia.terceiro.cpf)
                      : "Não informado"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Telefone
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.terceiro?.telefone
                      ? FormatPhone(denuncia.terceiro.telefone)
                      : "Não informado"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    E-mail
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.terceiro?.email || "Não informado"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* INFORMAÇÕES DO VÍTIMA */}
          {!denuncia.isAnonimo && denuncia.tipoDenunciante === "VITIMA" && (
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                Informações da Vítima
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Nome
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.vitima?.nome || "Não informado"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Idade
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.vitima?.idade || "Não informado"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    CPF
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.vitima?.cpf
                      ? FormatCPF(denuncia.vitima.cpf)
                      : "Não informado"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Telefone
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.vitima?.telefone
                      ? FormatPhone(denuncia.vitima.telefone)
                      : "Não informado"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    E-mail
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.vitima?.email || "Não informado"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Local de Trabalho
                  </Typography>
                  <Typography variant="body1">
                    {denuncia.vitima?.localTrabalho || "Não informado"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          {/* INFORMAÇÕES DO OFENSOR */}
          <Box>
            <Typography variant="h6" gutterBottom color="primary.main" sx={{ fontWeight: "bold" }}>
              Informações do ofensor
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Nome</Typography>
                <Typography variant="body1">{denuncia.ofensor?.nome || "Não informado"}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Idade</Typography>
                <Typography variant="body1">{denuncia.ofensor?.localTrabalho || "Não informado"}</Typography>
              </Box>
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
