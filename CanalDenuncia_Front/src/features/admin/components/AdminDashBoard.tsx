"use client";
import { useState } from "react";
import { Denuncia } from "@/features/admin/schemas/AdminDenunciaSchema";
import DenunciaModal from "@/features/admin/components/DenunciaModal";
import DenunciasCards from "@/features/admin/components/DenunciasCards";
import DenunciasTable from "@/features/admin/components/DenunciasTable";
import { useDenunciasFilter } from "../hooks/useDenunciasFilter";
import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment, 
  Tabs, 
  Tab, 
  Paper,
  Container
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface props {
  initialData: Denuncia[];
}

export default function AdminDashBoard({ initialData }: props) {
  //Hook separando toda a complexidade de filtragem da UI
  const {
    busca,
    setBusca,
    filtroStatus,
    setFiltroStatus,
    filteredDenuncias,
    stats,
  } = useDenunciasFilter(initialData);

  //Estado local da denuncia selecionada para o modal
  const [selectedDenuncia, setSelectedDenuncia] = useState<Denuncia | null>(
    null,
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setFiltroStatus(newValue as any);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" color="text.primary" sx={{ fontWeight: "bold" }}>
          Painel de Denúncias
        </Typography>
      </Box>

      {/* Componente isolado para exibir os números */}
      <DenunciasCards stats={stats} />

      {/* Inputs de Filtro e Busca */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          justifyContent: "space-between", 
          alignItems: "center",
          gap: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3
        }}
      >
        <Tabs 
          value={filtroStatus || "TODAS"} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 48 }}
        >
          <Tab label="Todas" value="TODAS" />
          <Tab label="Ativas" value="ATIVAS" />
          <Tab label="Arquivadas" value="ARQUIVADAS" />
        </Tabs>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Buscar protocolo..."
          value={busca || ""}
          onChange={(e) => setBusca(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }
          }}
          sx={{ minWidth: { xs: "100%", md: "300px" } }}
        />
      </Paper>

      {/* Tabela de exibição (Componente Burro) */}
      <DenunciasTable
        data={filteredDenuncias}
        onViewDetails={(denuncia) => setSelectedDenuncia(denuncia)}
      />

      {/* Modal só renderiza se existir uma denúncia selecionada */}
      {selectedDenuncia && (
        <DenunciaModal
          denuncia={selectedDenuncia}
          onClose={() => setSelectedDenuncia(null)}
        />
      )}
    </Container>
  );
}
