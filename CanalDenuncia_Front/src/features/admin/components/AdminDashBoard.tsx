"use client";
import { useState } from "react";
import { Denuncia } from "@/features/admin/schemas/AdminDenunciaSchema";
import DenunciaModal from "@/features/admin/components/DenunciaModal";
import DenunciasCards from "@/features/admin/components/DenunciasCards";
import DenunciasTable from "@/features/admin/components/DenunciasTable";
import { useDenunciasFilter } from "../hooks/useDenunciasFilter";
import { Container } from "@mui/material";
import DenunciaBusca from "./DenunciaBusca";

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

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4, display: "flex", flexDirection: "column", gap: 4 }}
    >
      {/* Componente isolado para exibir os números */}
      <DenunciasCards stats={stats} />

      {/* Inputs de Filtro e Busca */}
      <DenunciaBusca
        filtroStatus={filtroStatus}
        setFiltroStatus={setFiltroStatus}
        busca={busca}
        setBusca={setBusca}
      />

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