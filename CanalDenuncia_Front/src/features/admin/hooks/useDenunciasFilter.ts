// src/features/admin/hooks/useDenunciasFilter.ts
import { useState, useMemo } from "react";
import { Denuncia } from "@/features/admin/schemas/AdminDenunciaSchema";

export type FiltroStatusType = "TODAS" | "ATIVAS" | "RESOLVIDAS";

export function useDenunciasFilter(initialData: Denuncia[]) {
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatusType>("TODAS");
  const [busca, setBusca] = useState("");

  const filteredDenuncias = useMemo(() => {
    return initialData.filter((denuncia) => {
      const matchesStatus =
        filtroStatus === "TODAS" ||
        (filtroStatus === "ATIVAS" && ["PENDENTE", "EM_INVESTIGACAO"].includes(denuncia.status)) ||
        (filtroStatus === "RESOLVIDAS" && denuncia.status === "RESOLVIDA");

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
    ativas: initialData.filter(d => ["PENDENTE", "EM_INVESTIGACAO"].includes(d.status)).length,
    resolvidas: initialData.filter(d => d.status === "RESOLVIDA").length,
    pendentes: initialData.filter(d => d.status === "PENDENTE").length,
  }), [initialData]);

  return {
    filtroStatus, setFiltroStatus,
    busca, setBusca,
    filteredDenuncias,
    stats
  };
}
