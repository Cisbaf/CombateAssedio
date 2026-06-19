"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Divider,
  Stack,
  Grid
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import ShieldIcon from "@mui/icons-material/Shield";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

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

function formatEnumLabel(text?: string) {
  if (!text) return "-";
  return text.replace(/_/g, " ");
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("pt-BR");
  } catch (e) {
    return dateStr;
  }
}

export default function AdminPage() {
  const [denuncias, setDenuncias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [filtroStatus, setFiltroStatus] = useState<"TODAS" | "ATIVAS" | "ARQUIVADAS">("ATIVAS");
  const [busca, setBusca] = useState("");

  // Modal de Detalhes
  const [selectedDenuncia, setSelectedDenuncia] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchDenuncias = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/form/denuncias`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setDenuncias(data);
        } else {
          if (response.status === 401 || response.status === 403) {
            setError("Não autorizado. Faça login para acessar o painel administrativo.");
          } else {
            setError("Erro ao carregar denúncias do servidor.");
          }
        }
      } catch (err) {
        console.error("Erro ao buscar denúncias:", err);
        setError("Erro de conexão com o servidor de API.");
      } finally {
        setLoading(false);
      }
    };

    fetchDenuncias();
  }, []);

  const totalCount = denuncias.length;
  const ativasCount = denuncias.filter(
    (d) => d.status === "PENDENTE" || d.status === "EM_INVESTIGACAO"
  ).length;
  const resolvidasCount = denuncias.filter((d) => d.status === "RESOLVIDA").length;
  const pendentesCount = denuncias.filter((d) => d.status === "PENDENTE").length;

  const filteredDenuncias = denuncias.filter((denuncia) => {
    // Filtro de Status
    const matchesStatus =
      filtroStatus === "TODAS" ||
      (filtroStatus === "ATIVAS" &&
        (denuncia.status === "PENDENTE" ||
          denuncia.status === "EM_INVESTIGACAO")) ||
      (filtroStatus === "ARQUIVADAS" && denuncia.status === "RESOLVIDA");

    // Filtro de Busca (por protocolo, ofensor ou categoria)
    const matchesBusca =
      busca === "" ||
      denuncia.protocolo.toLowerCase().includes(busca.toLowerCase()) ||
      (denuncia.ofensor?.nome || "").toLowerCase().includes(busca.toLowerCase()) ||
      (denuncia.relato?.categoria || "").toLowerCase().includes(busca.toLowerCase());

    return matchesStatus && matchesBusca;
  });

  function getStatusChip(status: string) {
    switch (status) {
      case "PENDENTE":
        return (
          <Chip
            label="Pendente"
            color="warning"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      case "EM_INVESTIGACAO":
        return (
          <Chip
            label="Em Investigação"
            color="info"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      case "RESOLVIDA":
        return (
          <Chip
            label="Resolvida"
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        );
      default:
        return <Chip label={status} size="small" />;
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Carregando painel de denúncias...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ display: "flex", alignItems: "center", p: 1, boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderRadius: 2, border: "1px solid #e2e8f0" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography color="text.secondary" variant="caption" sx={{ fontWeight: 600, display: "block" }}>
                Total de Denúncias
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color: "#1e293b" }}>
                {totalCount}
              </Typography>
            </CardContent>
            <ShieldIcon sx={{ fontSize: 36, color: "primary.main", mr: 2, opacity: 0.7 }} />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ display: "flex", alignItems: "center", p: 1, boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderRadius: 2, border: "1px solid #e2e8f0" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography color="text.secondary" variant="caption" sx={{ fontWeight: 600, display: "block" }}>
                Denúncias Ativas
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color: "#0288d1" }}>
                {ativasCount}
              </Typography>
            </CardContent>
            <PendingActionsIcon sx={{ fontSize: 36, color: "#0288d1", mr: 2, opacity: 0.7 }} />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ display: "flex", alignItems: "center", p: 1, boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderRadius: 2, border: "1px solid #e2e8f0" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography color="text.secondary" variant="caption" sx={{ fontWeight: 600, display: "block" }}>
                Aguardando Triagem
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color: "#ed6c02" }}>
                {pendentesCount}
              </Typography>
            </CardContent>
            <ErrorIcon sx={{ fontSize: 36, color: "#ed6c02", mr: 2, opacity: 0.7 }} />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ display: "flex", alignItems: "center", p: 1, boxShadow: "0 2px 4px rgba(0,0,0,0.05)", borderRadius: 2, border: "1px solid #e2e8f0" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography color="text.secondary" variant="caption" sx={{ fontWeight: 600, display: "block" }}>
                Resolvidas / Arquivadas
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 0.5, color: "#2e7d32" }}>
                {resolvidasCount}
              </Typography>
            </CardContent>
            <FactCheckIcon sx={{ fontSize: 36, color: "#2e7d32", mr: 2, opacity: 0.7 }} />
          </Card>
        </Grid>
      </Grid>

      {/* Seção de Filtros e Busca */}
      <Paper sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
        <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Tabs
              value={filtroStatus}
              onChange={(_, value) => setFiltroStatus(value)}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab
                label={`Ativas (${ativasCount})`}
                value="ATIVAS"
                sx={{ fontWeight: 600, textTransform: "none" }}
              />
              <Tab
                label={`Arquivadas (${resolvidasCount})`}
                value="ARQUIVADAS"
                sx={{ fontWeight: 600, textTransform: "none" }}
              />
              <Tab
                label={`Todas (${totalCount})`}
                value="TODAS"
                sx={{ fontWeight: 600, textTransform: "none" }}
              />
            </Tabs>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar por protocolo, acusado ou categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  )
                }
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Tabela de Denúncias */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Protocolo</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Registro</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Acusado (Ofensor)</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Categoria</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Privacidade</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#475569" }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: "#475569" }}>Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDenuncias.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                  <SearchOffIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1, opacity: 0.5 }} />
                  <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Nenhuma denúncia encontrada
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Altere os filtros de status ou a pesquisa para encontrar o que procura.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredDenuncias.map((denuncia) => (
                <TableRow key={denuncia.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 600, color: "#0f172a" }}>{denuncia.protocolo}</TableCell>
                  <TableCell>{formatDate(denuncia.dataRegistro)}</TableCell>
                  <TableCell>{denuncia.ofensor?.nome || "-"}</TableCell>
                  <TableCell>
                    {denuncia.relato?.categoria
                      ? denuncia.relato.categoria
                          .split(",")
                          .map((c: string) => formatEnumLabel(c))
                          .join(", ")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {denuncia.isAnonimo ? (
                      <Chip label="Anônimo" size="small" variant="outlined" sx={{ color: "text.secondary", borderColor: "#cbd5e1" }} />
                    ) : (
                      <Chip label="Identificado" size="small" variant="outlined" color="primary" sx={{ borderStyle: "dashed" }} />
                    )}
                  </TableCell>
                  <TableCell>{getStatusChip(denuncia.status)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelectedDenuncia(denuncia);
                        setModalOpen(true);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de Detalhamento */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
        scroll="paper"
        slotProps={{
          paper: {
            sx: { borderRadius: 3, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }
          }
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: 1 }}>
              📋 Detalhamento da Denúncia
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Protocolo: <strong>{selectedDenuncia?.protocolo}</strong> | Registro: {formatDate(selectedDenuncia?.dataRegistro)}
            </Typography>
          </Box>
          <IconButton onClick={() => setModalOpen(false)} sx={{ color: "#64748b" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 3, backgroundColor: "#ffffff" }}>
          {selectedDenuncia && (
            <Stack spacing={4}>
              {/* Status */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#475569" }}>
                  Status Atual da Denúncia:
                </Typography>
                {getStatusChip(selectedDenuncia.status)}
              </Box>

              <Divider />

              {/* SEÇÃO 1: IDENTIFICAÇÃO */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e3a8a", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  👤 1. Identificação do Denunciante
                </Typography>
                <Grid container spacing={3} sx={{ pl: 1 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Tipo de Relato</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
                      {selectedDenuncia.tipoDenunciante === "VITIMA" ? "Própria Vítima" : "Relatado por Testemunha / Terceiro"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Sigilo / Privacidade</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
                      {selectedDenuncia.isAnonimo ? "Anônimo" : "Identificado"}
                    </Typography>
                  </Grid>

                  {!selectedDenuncia.isAnonimo && (
                    <>
                      {/* Dados do denunciante se identificado */}
                      {selectedDenuncia.tipoDenunciante === "VITIMA" && selectedDenuncia.vitima ? (
                        <>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Nome completo</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDenuncia.vitima.nome || "-"}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>CPF</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCPF(selectedDenuncia.vitima.cpf)}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Idade</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDenuncia.vitima.idade ? `${selectedDenuncia.vitima.idade} anos` : "-"}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Telefone</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatTelefone(selectedDenuncia.vitima.telefone)}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>E-mail</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDenuncia.vitima.email || "-"}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Setor / Local de Trabalho</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDenuncia.vitima.localTrabalho || "-"}</Typography>
                          </Grid>
                        </>
                      ) : selectedDenuncia.terceiro ? (
                        <>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Nome da Testemunha</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDenuncia.terceiro.nome || "-"}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>CPF</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCPF(selectedDenuncia.terceiro.cpf)}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Idade</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDenuncia.terceiro.idade ? `${selectedDenuncia.terceiro.idade} anos` : "-"}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Telefone</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatTelefone(selectedDenuncia.terceiro.telefone)}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>E-mail</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDenuncia.terceiro.email || "-"}</Typography>
                          </Grid>
                        </>
                      ) : null}
                    </>
                  )}

                  {/* Se foi feita por terceiro, exibe os dados da vítima inseridos */}
                  {selectedDenuncia.tipoDenunciante === "TERCEIRO" && selectedDenuncia.vitima && (
                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ p: 2, backgroundColor: "#eff6ff", borderRadius: 2, border: "1px solid #bfdbfe", mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#1d4ed8", mb: 1.5 }}>
                          👤 Informações da Vítima
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Nome da Vítima</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDenuncia.vitima.nome || "-"}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Local de Trabalho</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDenuncia.vitima.localTrabalho || "-"}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>CPF da Vítima</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{formatCPF(selectedDenuncia.vitima.cpf)}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Idade da Vítima</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDenuncia.vitima.idade ? `${selectedDenuncia.vitima.idade} anos` : "-"}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>

              <Divider />

              {/* SEÇÃO 2: OFENSOR */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e3a8a", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  ⚠️ 2. Informações do Acusado (Ofensor)
                </Typography>
                <Grid container spacing={3} sx={{ pl: 1 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Nome do Acusado</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#b91c1c" }}>
                      {selectedDenuncia.ofensor?.nome || "-"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Setor / Local de Trabalho</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
                      {selectedDenuncia.ofensor?.localTrabalho || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* SEÇÃO 3: DATA, LOCAL E CONTEXTO */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e3a8a", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  📅 3. Contexto do Incidente
                </Typography>
                <Grid container spacing={3} sx={{ pl: 1 }}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Data do Ocorrido</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
                      {formatDate(selectedDenuncia.relato?.dataOcorrido)}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Horário Aproximado</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
                      {selectedDenuncia.relato?.horarioOcorrido || "-"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Local do Incidente</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
                      {selectedDenuncia.relato?.localOcorrido || "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* SEÇÃO 4: RELATO */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#1e3a8a", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  📝 4. Relato Detalhado dos Fatos
                </Typography>
                <Grid container spacing={3} sx={{ pl: 1 }}>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Categorias Relacionadas</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
                      {selectedDenuncia.relato?.categoria
                        ? selectedDenuncia.relato.categoria
                            .split(",")
                            .map((c: string) => formatEnumLabel(c))
                            .join(", ")
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>Impacto Emocional</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
                      {selectedDenuncia.relato?.estadoEmocional
                        ? selectedDenuncia.relato.estadoEmocional
                            .split(",")
                            .map((e: string) => formatEnumLabel(e))
                            .join(", ")
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ p: 2.5, backgroundColor: "#f8fafc", borderRadius: 2, border: "1px solid #e2e8f0" }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1, fontWeight: 600 }}>Descrição Completa:</Typography>
                      <Typography variant="body2" sx={{ whiteSpace: "pre-line", color: "#334155", lineHeight: 1.7 }}>
                        {selectedDenuncia.relato?.descricao || "-"}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2.5, backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
          <Button variant="outlined" onClick={() => setModalOpen(false)} sx={{ borderRadius: 2, textTransform: "none", px: 3 }}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
