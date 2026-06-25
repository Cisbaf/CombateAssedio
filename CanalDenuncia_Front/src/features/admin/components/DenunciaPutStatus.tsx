import { Denuncia } from "../schemas/AdminDenunciaSchema";
import { putStatus } from "@/api/denunciaApi";
import InfoBox from "@/shared/components/infoBox";
import { Box, Button, Typography } from "@mui/material";

interface props {
  denuncia: Denuncia;
}

import { useRouter } from "next/navigation";

export default function DenunciaPutStatus({ denuncia }: props) {
  const router = useRouter();

  const handlePutStatus = async (status: string) => {
    const sucesso = await putStatus(denuncia, { status });

    if (sucesso) {
      alert("Status atualizado com sucesso!");
      router.refresh();
    } else {
      alert("Erro ao atualizar status. Verifique a aba Network.");
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
            texto="Ao iniciar a investigação, 
          o status pode ser alterado para 'Em investigação' 
          ou diretamente para 'Resolvida' (caso já existam informações suficientes). 
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
          color="info"
          onClick={() => {
            handlePutStatus("EM_INVESTIGACAO");
          }}
        >
          Em Investigação
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
