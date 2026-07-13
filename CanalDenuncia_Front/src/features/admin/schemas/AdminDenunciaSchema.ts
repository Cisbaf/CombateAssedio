export type StatusDenuncia = "PENDENTE" | "ARQUIVADA" | "RESOLVIDA";

export type TipoDenunciante = "VITIMA" | "TERCEIRO";

export interface Pessoa {
  nome?: string;
  cpf?: string;
  idade?: number;
  telefone?: string;
  email?: string;
  localTrabalho?: string;
}

export interface Relato {
  dataOcorrido?: string;
  horarioOcorrido?: string;
  localOcorrido?: string;
  categoria?: string;
  estadoEmocional?: string;
  descricao?: string;
}

export interface Mensagem {
  id: string;
  conteudo: string;
  dataEnvio: string;
}

export interface Anexo {
  id: string;
  nomeArquivo: string;
  urlArquivo: string;
  tipoArquivo: string;
  dataUpload: string;
}

export interface Denuncia {
  id: string;
  protocolo: string;
  dataRegistro: string;
  status: StatusDenuncia;
  isAnonimo: boolean;
  tipoDenunciante: TipoDenunciante;
  vitima?: Pessoa;
  terceiro?: Pessoa;
  ofensor?: Pessoa;
  relato?: Relato;
  mensagens?: Mensagem[];
  anexos?: Anexo[];
}

export type RequestStatus = {
    status: string;
};

