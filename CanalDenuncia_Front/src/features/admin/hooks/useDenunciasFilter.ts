// src/features/admin/hooks/useDenunciasFilter.ts
import { useState, useMemo } from "react";
import { Denuncia } from "@/features/admin/schemas/AdminDenunciaSchema";

export type FiltroStatusType = "TODAS" | "PENDENTE" | "EM_ANDAMENTO" | "RESOLVIDA" ;

export function useDenunciasFilter(initialData: Denuncia[]) {
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatusType>("TODAS");
  const [busca, setBusca] = useState("");

  const filteredDenuncias = useMemo(() => {
    return initialData.filter((denuncia) => {
      const matchesStatus =
        filtroStatus === "TODAS" ||
        (filtroStatus === "PENDENTE" && denuncia.status === "PENDENTE") ||
        (filtroStatus === "EM_ANDAMENTO" && denuncia.status === "EM_ANDAMENTO") ||
        (filtroStatus === "RESOLVIDA" && denuncia.status === "RESOLVIDA");

      const matchText = busca.toLowerCase();
      const matchesBusca =
        !busca ||
        denuncia.protocolo.toLowerCase().includes(matchText) ||
        (denuncia.ofensor?.nome || "").toLowerCase().includes(matchText) ||
        (denuncia.relato?.categoria || "").toLowerCase().includes(matchText);

      return matchesStatus && matchesBusca;
    });
  }, [initialData, filtroStatus, busca]);

  const stats = useMemo(() => ({
    total: initialData.length,
    pendentes: initialData.filter(d => d.status === "PENDENTE").length,
    resolvidas: initialData.filter(d => d.status === "RESOLVIDA").length,
    arquivadas: initialData.filter(d => d.isArquivada).length,
  }), [initialData]);

  return {
    filtroStatus, setFiltroStatus,
    busca, setBusca,
    filteredDenuncias,
    stats
  };
}
