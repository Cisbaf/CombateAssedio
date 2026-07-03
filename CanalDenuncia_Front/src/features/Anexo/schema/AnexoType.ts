

// --- ANEXO ---
export type RequestAnexo = {
  nomeArquivo: string;
  urlArquivo: string;
  tipoArquivo: string;
};

export type ResponseAnexo = {
  id: string;
  nomeArquivo: string;
  urlArquivo: string;
  tipoArquivo: string;
  dataUpload: string;
};