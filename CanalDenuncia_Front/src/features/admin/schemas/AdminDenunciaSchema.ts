export type StatusDenuncia = "PENDENTE" | "EM_INVESTIGACAO" | "RESOLVIDA" | "ARQUIVADA";

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
}

export type RequestStatus = {
    status: string;
};

