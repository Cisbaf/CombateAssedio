'use client'
import { useState, useMemo } from 'react';
import { Denuncia } from "@/features/admin/schemas/AdminDenunciaSchema";
import DenunciaModal from "@/features/admin/components/DenunciaModal"
import DenunciasCards from "@/features/admin/components/DenunciasCards"
import DenunciasTable from "@/features/admin/components/DenunciasTable"
import { useDenunciasFilter } from '../hooks/useDenunciasFilter';

interface props {
    initialData: Denuncia[];
}

export default function AdminDashBoard({ initialData }: props) {

    //Hook separando toda a complexidade de filtragem da UI
    const {
        busca, setBusca,
        filtroStatus, setFiltroStatus,
        filteredDenuncias,
        stats
    } = useDenunciasFilter(initialData);


    //Estado local da denuncia selecionada para o modal   
    const [selectedDenuncia, setSelectedDenuncia] = useState<Denuncia | null>(null)
    

    return (

     <div className="w-full space-y-6">
      {/* Componente isolado para exibir os números */}
      <DenunciasCards stats={stats} />
      

      {/* Inputs de Filtro (poderia ser isolado também)*/}
        <div className="flex flex-col md:flex-row justify-between gap-4 p-4 bg-white border rounded-lg shadow-sm">
        {/* Implementar Tabs de Filtro aqui usando props setFiltroStatus 
        Implementar Input de Busca aqui usando props setBusca  */}
        </div>
      

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
    </div>
    )
}