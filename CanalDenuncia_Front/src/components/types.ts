// --- OFENSOR ---
export type RequestOfensor = {
    nome: string;
    email: string;
    setor: string;
    cargo: string;
}; //envia para api

export type ResponseOfensor = {
    id: string;
    nome: string;
    local_trabalho: string;
}; //recebe da api

// --- VITIMA ---
export type RequestVitima = {
    nome: string;
    idade: number;
    cpf: string;
    telefone: string;
    email: string;
};

export type ResponseVitima = {
    id: string;
    nome: string;
    idade: number;
    cpf: string;
    telefone: string;
    email: string;
    local_Trabalho: string;
};

// --- TERCEIRO ---
export type RequestTerceiro = {
    nome: string;
    idade: number;
    cpf: string;
    telefone: string;
    email: string;
}; 

export type ResponseTerceiro = {
    id: string;
    nome: string;
    idade: number;
    cpf: string;
    telefone: string;
    email: string;
};

// --- RELATO ---
export type RequestRelato = {
    categoriaAssedio: string;
    tipoRelato: string;
    relato: string;
    data: string;
}; 

export type ResponseRelato = {
    id: string;
    categoria: string;
    descricao: string;
    estado_emocional: string;
    testemunhas: boolean;
    numero_testemunhas?: number;
    nomes_testemunha?: string;
    data_ocorrido: string;
    ocorrencia_local: string;
    evidencias: boolean;
    tipo_evidencias?: string;
}; 

// --- DENUNCIA ---
export type RequestDenuncia = {
    nome: string;
    telefone: string;
    email: string;
    tipoRelato: string;
    categoriaAssedio: string;
    relato: string;
    data: string;
};

export type ResponseDenuncia = {
    id: string;
    protocolo: string;
    tipo_Denunciante: string;
    isAnonimo: boolean;
    data_Registro: string;
    status: string;
    vitima?: ResponseVitima;
    ofensor: ResponseOfensor;
    relato: ResponseRelato;
    terceiro?: ResponseTerceiro;
};
