import { Typography, Box, Chip, Button } from "@mui/material";
import { Denuncia, StatusDenuncia } from "../schemas/AdminDenunciaSchema";
import { FormatDate, FormatCPF, FormatPhone } from "@/shared/formatters";
import { AttachFile } from "@mui/icons-material";

interface props {
  denuncia: Denuncia;
}

const getStatusColor = (status: StatusDenuncia) => {
  switch (status) {
    case "PENDENTE":
      return "warning";
    case "EM_ANDAMENTO":
      return "info";
    case "RESOLVIDA":
      return "success";
    default:
      return "default";
  }
};

const getStatusLabel = (status: StatusDenuncia) => {
  switch (status) {
    case "PENDENTE":
      return "Pendente";
    case "EM_ANDAMENTO":
      return "Em andamento";
    case "RESOLVIDA":
      return "Resolvida";
    default:
      return status;
  }
};

export default function DenunciaModal({ denuncia }: props) {


  return (
    <Box>
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
          gap: 4,
        }}
      >
        {/* INFORMAÇÕES DO TERCEIRO */}
        {denuncia.terceiro && (
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
                  {denuncia.terceiro?.nome}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Idade
                </Typography>
                <Typography variant="body1">
                  {denuncia.terceiro?.idade}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  CPF
                </Typography>
                <Typography variant="body1">
                  {denuncia.terceiro?.cpf
                    ? FormatCPF(denuncia.terceiro.cpf)
                    : "--"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Telefone
                </Typography>
                <Typography variant="body1">
                  {denuncia.terceiro?.telefone
                    ? FormatPhone(denuncia.terceiro.telefone)
                    : "--"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  E-mail
                </Typography>
                <Typography variant="body1">
                  {denuncia.terceiro?.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* INFORMAÇÕES DO VÍTIMA */}
        {denuncia.vitima && (
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
                <Typography variant="body1">{denuncia.vitima?.nome}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Idade
                </Typography>
                <Typography variant="body1">
                  {denuncia.vitima?.idade}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  CPF
                </Typography>
                <Typography variant="body1">
                  {denuncia.vitima?.cpf ? FormatCPF(denuncia.vitima.cpf) : "--"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Telefone
                </Typography>
                <Typography variant="body1">
                  {denuncia.vitima?.telefone
                    ? FormatPhone(denuncia.vitima.telefone)
                    : "--"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  E-mail
                </Typography>
                <Typography variant="body1">
                  {denuncia.vitima?.email}
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
          <Typography
            variant="h6"
            gutterBottom
            color="primary.main"
            sx={{ fontWeight: "bold" }}
          >
            Informações do ofensor
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Nome
              </Typography>
              <Typography variant="body1">{denuncia.ofensor?.nome}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Local de Trabalho
              </Typography>
              <Typography variant="body1">
                {denuncia.ofensor?.localTrabalho}
              </Typography>
            </Box>
          </Box>
        </Box>

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
                {denuncia.relato?.dataOcorrido === "1900-01-01"
                  ? "Não informado"
                  : denuncia.relato?.dataOcorrido
                    ? FormatDate(denuncia.relato.dataOcorrido)
                    : "--"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Horário
              </Typography>
              <Typography variant="body1">
                {denuncia.relato?.horarioOcorrido === "00:00:00"
                  ? "Não informado"
                  : denuncia.relato?.horarioOcorrido}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Local
              </Typography>
              <Typography variant="body1">
                {denuncia.relato?.localOcorrido}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Categoria
              </Typography>
              <Typography variant="body1">
                {denuncia.relato?.categoria}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Estado Emocional
              </Typography>
              <Typography variant="body1">
                {denuncia.relato?.estadoEmocional}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Descrição
              </Typography>
              <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                {denuncia.relato?.descricao}
              </Typography>
            </Box>

            {/* INFORMAÇÕES DO ANEXO */}
            {denuncia.anexos && denuncia.anexos.length > 0 && (
              <Box sx={{ border: 1, borderRadius: 1, p: 2, borderColor: "divider" }}>
                <Typography variant="h6" gutterBottom color="primary.main" sx={{ fontWeight: "bold", mb: 1 }}>
                  Anexos
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {denuncia.anexos?.map((anexo, index) => (
                    <Button
                      key={index}
                      component="a"
                      href={`${anexo.urlArquivo}${!anexo.urlArquivo.includes("protocolo=") && denuncia.protocolo ? `?protocolo=${denuncia.protocolo}` : ""}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={anexo.nomeArquivo}
                      variant="text"
                      startIcon={<AttachFile />}
                      sx={{ alignSelf: "flex-start", textTransform: "none" }}
                    >
                      {anexo.nomeArquivo}
                    </Button>
                  ))}
                </Box>
              </Box>
            )}

            
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
