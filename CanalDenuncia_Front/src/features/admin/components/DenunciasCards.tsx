import { Box } from "@mui/material";
import CardComponent from "@/features/admin/components/CardComponent";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from '@mui/icons-material/Archive';

interface props {
  stats: {
    total: number;
    pendentes: number;
    em_andamento: number;
    resolvidas: number;
    arquivadas: number;
  };
}

export default function DenunciasCards({ stats }: props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
        },
        gap: 3,
      }}
    >
      <CardComponent 
        title={"Total"} 
        value={stats.total} 
        icon={<AssignmentIcon fontSize="large" />} 
        color="#1976d2" 
      />
      <CardComponent 
        title={"Pendentes"} 
        value={stats.pendentes} 
        icon={<HourglassEmptyIcon fontSize="large" />} 
        color="#ed6c02" 
      />
      <CardComponent 
        title={"Em Andamento"} 
        value={stats.em_andamento} 
        icon={<AutorenewIcon fontSize="large" />} 
        color="#0288d1" 
      />
      <CardComponent 
        title={"Resolvidas"} 
        value={stats.resolvidas} 
        icon={<CheckCircleIcon fontSize="large" />} 
        color="#2e7d32" 
      />
      <CardComponent 
        title={"Arquivadas"} 
        value={stats.arquivadas} 
        icon={<ArchiveIcon fontSize="large" />} 
        color="#757575" 
      />
    </Box>
  );
  
}
