import * as z from "zod";

// ==========================================
// ETAPA A - IDENTIFICAÇÃO INICIAL
// ==========================================

export const getStepASchema = (opcaoAnonimato: string, opcaoIdentificacao: string) => {
  return z.object({
    name:
      opcaoAnonimato === "false"
        ? z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres")
        : z.string().optional(),

    idade:
      opcaoAnonimato === "false"
        ? z.string().min(1, "Idade é obrigatória")
        : z.string().optional(),

    cpf:
      opcaoAnonimato === "false"
        ? z.string().length(11, "CPF deve ter exatamente 11 dígitos")
        : z.string().optional(),

    email:
      opcaoAnonimato === "false"
        ? z.string().email("Insira um e-mail válido")
        : z.string().optional(),

    telefone:
      opcaoAnonimato === "false"
        ? z.string().min(11, "Telefone deve conter no mínimo 11 dígitos")
        : z.string().optional(),

    vitima_name:
      opcaoIdentificacao === "terceiro"
        ? z.string().min(3, "Nome da vítima deve ter pelo menos 3 caracteres")
        : z.string().optional(),

    vitima_idade: z.string().optional(),

    vitima_cpf: z.string().optional(),

    vitima_local_trabalho:
      opcaoIdentificacao === "terceiro"
        ? z.string().min(3, "Local de trabalho da vítima é obrigatório")
        : z.string().optional(),
  });
};

// ==========================================
// ETAPA B - INFORMAÇÕES DO OFENSOR
// ==========================================

export const stepBSchema = z.object({
  name: z.string().min(3, "O nome do ofensor deve ter pelo menos 3 caracteres"),
  local_trabalho: z.string().min(3, "O local de trabalho do ofensor deve ter pelo menos 3 caracteres"),
});

export type StepBFormData = z.infer<typeof stepBSchema>;

// ==========================================
// ETAPA C - DATA E LOCAL
// ==========================================

export const stepCSchema = z.object({
  data_ocorrido: z.string().length(10, "Insira uma data válida"),
  horario_ocorrido: z.string().min(5, "Horário inválido"),
  local_ocorrido: z.string().min(1, "Local do ocorrido é obrigatório"),
});

export type StepCFormData = z.infer<typeof stepCSchema>;

// ==========================================
// ETAPA D - DESCRIÇÃO DETALHADA
// ==========================================

export const stepDSchema = z.object({
  categorias: z.string().min(1, "Selecione pelo menos uma categoria"),
  descricao: z
    .string()
    .min(2, "Descreva detalhadamente a denúncia")
    .max(500, "Descrição máxima de 500 caracteres"),
  estado_emocional: z.string().min(1, "Selecione pelo menos um impacto emocional"),
  aceitoPrivacidade: z.boolean().refine((val) => val === true, "Você deve aceitar a Política de Privacidade e os Termos de Uso"),
  autorizoLgpd: z.boolean().refine((val) => val === true, "Você deve autorizar o tratamento de dados conforme a LGPD"),
  entendoSigilo: z.boolean().refine((val) => val === true, "Você deve confirmar que entende o sigilo da denúncia"),
});

export type StepDFormData = z.infer<typeof stepDSchema>;



