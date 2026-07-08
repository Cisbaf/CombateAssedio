import { Paper, Tabs, TextField, InputAdornment, Tab } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FiltroStatusType } from "../hooks/useDenunciasFilter";

interface props {
  filtroStatus: FiltroStatusType | string;
  setFiltroStatus: (status: FiltroStatusType) => void;
  busca: string;
  setBusca: (busca: string) => void;
}

export default function DenunciaBusca({ filtroStatus, setFiltroStatus, busca, setBusca }: props) {
    
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setFiltroStatus(newValue as any);
  };

  return (
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
          <Tab label="Resolvidas" value="RESOLVIDAS" />
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
  )
}
    