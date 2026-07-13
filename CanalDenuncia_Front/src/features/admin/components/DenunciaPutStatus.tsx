import { Denuncia } from "../schemas/AdminDenunciaSchema";
import { putStatus } from "@/api/denunciaApi";
import InfoBox from "@/shared/infoBox";
import { Box, Button, Typography } from "@mui/material";

interface props {
  denuncia: Denuncia;
  onUpdate?: () => void;
}

import { useRouter } from "next/navigation";

export default function DenunciaPutStatus({ denuncia, onUpdate }: props) {
  const router = useRouter();

  const handlePutStatus = async (status: string) => {
    if (status === denuncia.status) {
      alert("Status atual já é esse!");
      return;
    }

    const aceitou = confirm("Deseja prosseguir com esta ação?");
    if (aceitou) {
      const updatedDenuncia = await putStatus(denuncia, { status });
      if (updatedDenuncia) {
        alert("Status atualizado com sucesso!");
        if (onUpdate) onUpdate();
        router.refresh();
      } else {
        alert("Erro ao atualizar status. Verifique a aba Network.");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <Typography
          variant="h6"
          gutterBottom
          color="primary.main"
          sx={{ fontWeight: "bold" }}
        >
          Atualizar Status{" "}
          <InfoBox
            texto="O status da denúncia pode ser alterado conforme o andamento do processo. 
          Essa ação pode ser revertida a qualquer momento."
          />
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="warning"
          onClick={() => handlePutStatus("PENDENTE")}
        >
          Pendente
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handlePutStatus("ARQUIVADA");
          }}
        >
          Arquivada
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handlePutStatus("RESOLVIDA")}
        >
          Resolvida
        </Button>
      </Box>
    </Box>
  );
}
