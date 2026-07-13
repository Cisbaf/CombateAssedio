import { Box } from "@mui/material";
import CardComponent from "@/features/admin/components/CardComponent";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";

interface props {
  stats: {
    total: number;
    pendentes: number;
    resolvidas: number;
    arquivadas: number;
  };
}

export default function DenunciasCards({ stats }: props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
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
        icon={<PendingActionsIcon fontSize="large" />} 
        color="#ed6c02" 
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
        icon={<WarningIcon fontSize="large" />} 
        color="#d32f2f" 
      />
    </Box>
  );
}
