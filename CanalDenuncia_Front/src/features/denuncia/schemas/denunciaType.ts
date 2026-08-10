// --- PAYLOAD DO FORMULÁRIO MULTI-STEP ---
export type DadosFormulario = {
  step0?: any;
  step1?: any;
  step2?: any;
  step3?: any;
};

// --- StepA ---
export type StepAFormData = {
  name?: string;
  idade?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  vitima_name?: string;
  vitima_idade?: string;
  vitima_cpf?: string;
  vitima_local_trabalho?: string;
  isAnonimo?: boolean;
  tipoDenunciante?: string;
};
