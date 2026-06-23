import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Box,
  Chip,
  Typography,
  IconButton,
  Tooltip
} from "@mui/material";
import { Denuncia, StatusDenuncia } from "../schemas/AdminDenunciaSchema";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { FormatDate } from "@/shared/components/formatters";

interface props {
  data: Denuncia[];
  onViewDetails: (denuncia: Denuncia) => void;
}

const getStatusColor = (status: StatusDenuncia) => {
  switch (status) {
    case "PENDENTE":
      return "warning";
    case "EM_INVESTIGACAO":
      return "info";
    case "RESOLVIDA":
      return "success";
    case "ARQUIVADA":
      return "default";
    default:
      return "default";
  }
};

const getStatusLabel = (status: StatusDenuncia) => {
  switch (status) {
    case "PENDENTE": return "Pendente";
    case "EM_INVESTIGACAO": return "Em Investigação";
    case "RESOLVIDA": return "Resolvida";
    case "ARQUIVADA": return "Arquivada";
    default: return status;
  }
}

export default function DenunciasTable({ data, onViewDetails }: props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        width: "100%", 
        border: "1px solid", 
        borderColor: "divider", 
        borderRadius: 3,
        overflow: "hidden" 
      }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabela de denúncias">
          <TableHead sx={{ bgcolor: "background.default" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Protocolo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Data</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tipo Denunciante</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Anonimato</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.length > 0 ? (
              [...currentData] 
              .sort((a, b) => new Date(b.dataRegistro).getTime() - new Date(a.dataRegistro).getTime())
              .map((denuncia) => (
                <TableRow 
                  key={denuncia.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                      {denuncia.protocolo}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={getStatusLabel(denuncia.status)} 
                      color={getStatusColor(denuncia.status) as any} 
                      size="small"
                      sx={{ fontWeight: "medium" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {FormatDate(denuncia.dataRegistro) }
                    </Typography>
                  </TableCell>
                   <TableCell>
                    <Chip 
                      label={denuncia.tipoDenunciante == "VITIMA" ? "VITIMA" : "TERCEIRO"} 
                      variant="outlined"
                      size="small"
                      color={denuncia.tipoDenunciante == "VITIMA" ? "error" : "secondary"}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={denuncia.isAnonimo ? "Anônimo" : "Identificado"} 
                      variant="outlined"
                      size="small"
                      color={denuncia.isAnonimo ? "default" : "primary"}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Visualizar Detalhes">
                      <IconButton
                        color="primary"
                        onClick={() => onViewDetails(denuncia)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  <Typography variant="body1" color="text.secondary">
                    Nenhuma denúncia encontrada para os filtros aplicados.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[20, 40, 60]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
      />
    </Paper>
  );
}
