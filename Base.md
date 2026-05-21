# Criação do Canal de Combate ao Assédio e Discriminação do Cisbaf

**Status:** Em Desenvolvimento  
**Canal Original:** https://combateassedio.cisbaf.org.br/  

---

## 🎯 Objetivo

Criar uma plataforma segura, acessível e confidencial para denúncias de assédio e discriminação, protegendo vítimas, testemunhas e preservando privacidade através de múltiplas camadas de segurança.

---

## 1️⃣ PORTAL DO USUÁRIO - Formulário de Denúncia

### Etapa A - Identificação Inicial
**Objetivo:** Determinar se é vítima/terceiro e nível de anonimato

**Campos:**
- ✅ Como se identifica?
  - ○ Sou a vítima do assédio/discriminação
  - ○ Sou testemunha/terceiro

- ✅ Deseja manter anonimato?
  - ○ Sim, prefiro permanecer anônimo
  - ○ Não, quero me identificar

- ✅ **[Se NÃO anônimo]** Dados do Denunciante:
  - Nome completo *
  - Data de nascimento *
  - CPF * (será encriptado)
  - Telefone/Celular
  - Email * (para confirmação)

**Fluxo:**
- Se ANÔNIMO → vai para Etapa B
- Se IDENTIFICADO → coleta dados → vai para Etapa B

---

### Etapa B - Informações do Ofensor
**Objetivo:** Identificar quem está sendo denunciado

**Campos:**
- Nome completo do acusado *
- Departamento/Setor de trabalho *
- Email ou contato (opcional)

**Validações:**
- ✅ Nome não vazio

---

### Etapa C - Data, Local e Contexto
**Objetivo:** Contextualizar o incidente

**Campos:**
- Data do incidente * (date picker)
- Hora aproximada (time picker, opcional)
- Local do incidente * (ex: sala 301, corredor, evento externo)
- Havia testemunhas? *
  - ○ Sim
  - ○ Não
  - ○ Não tenho certeza
- Quantas testemunhas? (se sim)
- Nomes das testemunhas (opcional, protege privacidade)

**Validações:**
- ✅ Data não pode ser futura
- ✅ Data não pode ser muito antiga (> 5 anos)
- ✅ Local não vazio

---

### Etapa D - Descrição Detalhada
**Objetivo:** Coletar narrativa completa do incidente

**Campos:**
- **Categoria da Denúncia** * (required):
  - ○ Assédio Moral
  - ○ Assédio Sexual
  - ○ Discriminação por Gênero
  - ○ Discriminação Racial
  - ○ Discriminação por Orientação Sexual
  - ○ Discriminação por Idade
  - ○ Discriminação Religiosa
  - ○ Outro (especifique)

- **Descrição dos Fatos** * (text area, mín 50 caracteres):
  - Relatar o que aconteceu com máximo de detalhe
  - Permitir formatação básica (negrito, lista)

- **Estado Emocional da Vítima** *:
  - ○ Nenhum impacto aparente
  - ○ Incômodo/Desconforto
  - ○ Ansiedade/Preocupação
  - ○ Medo/Insegurança
  - ○ Depressão/Angústia
  - ○ Trauma severo

- **Evidências/Anexos** (opcional):
  - Upload de até 5 arquivos (máx 10MB cada)
  - Tipos: imagens, PDFs, áudios, vídeos
  - Será encriptado no servidor

- **Consentimento** * (checkbox obrigatório):
  - ☑ Li e concordo com Política de Privacidade
  - ☑ Li e concordo com Termos de Uso
  - ☑ Autorizo o tratamento de meus dados conforme LGPD
  - ☑ Entendo que minha denúncia será investigada

---

### Etapa E - Revisão e Confirmação
**Objetivo:** Confirmar dados antes do envio

**O que mostra:**
- ✅ Tipo de denunciante (Vítima/Terceiro)
- ✅ Status (Anônimo/Identificado)
- ✅ Nome do acusado e departamento
- ✅ Data e local do incidente
- ✅ Categoria
- ✅ Primeiras 100 caracteres da descrição

**Ações:**
- [VOLTAR] - Editar algum campo
- [ENVIAR DENÚNCIA] - Confirmar envio

---

### Etapa F - Confirmação de Sucesso
**Objetivo:** Confirmar recebimento e mostrar próximos passos

**O que mostra:**
- ✅ Mensagem de sucesso
- ✅ **PROTOCOLO ÚNICO** (ex: DEN-2025-000001)
  - Formato: DEN-YYYY-XXXXXX
  - Gerado automaticamente
  - Essencial para rastreamento

**Para usuário identificado:**
- Email de confirmação com protocolo
- Link para acompanhamento (login)
- Prazos esperados de resposta

**Para usuário anônimo:**
- Salvar protocolo em local seguro
- Usar protocolo para acompanhar status
- Dicas de segurança (não compartilhar)

**Informações úteis:**
- Próximos passos da investigação
- Tempo estimado de resposta
- Link para FAQ
- Canal de suporte (chat/email)

---

## 🛡️ Funcionalidades de Segurança (Usuário)

1. **Salvamento em Rascunho**
   - Auto-save a cada 30 segundos
   - Recuperar rascunho se usuário sair
   - Limpar rascunho após envio

2. **Validação em Tempo Real**
   - CPF válido (máscara + validação)
   - Email válido e confirmação
   - Data válida (não futura)
   - Comprimento mínimo de descrição

3. **Acompanhamento de Denúncia**
   - Portal de acompanhamento (login)
   - Ver status atual da denúncia
   - Notificações por email (se identificado)
   - Histórico de atualizações

4. **Criptografia & Privacidade**
   - ✅ HTTPS obrigatório
   - ✅ CPF encriptado em repouso (AES-256)
   - ✅ Dados sensíveis mascarados em logs
   - ✅ Sessão expira em 30 min (inatividade)

---

## 2️⃣ PORTAL ADMINISTRATIVO - Gestão de Denúncias

### Página de Login (Admin)
**Segurança:**
- ✅ Email/Usuário + Senha
- ✅ 2FA obrigatório (TOTP/SMS)
- ✅ Rate limiting (5 tentativas/5 min)
- ✅ Logs de acesso

---

### Página de Dashboard
**Objetivo:** Visão executiva do sistema

**Widgets:**
- 📊 **Denúncias por Status** (card count)
  - Nova: X
  - Em investigação: X
  - Concluída: X
  - Arquivada: X

- 📈 **Denúncias por Período** (gráfico linha 30 dias)

- 🏢 **Departamentos Mais Afetados** (gráfico barras top 5)

- 🔥 **Categorias** (gráfico pizza):
  - Assédio Moral
  - Assédio Sexual
  - Discriminação
  - Outros

- ⏱️ **Tempo Médio de Resolução**: X dias

- ⚠️ **Alertas** (se houver):
  - Denúncias antigas não atribuídas
  - Padrões suspeitos detectados
  - Mesmos ofensores em múltiplas denúncias

---

### Página de Listagem de Denúncias
**Objetivo:** Buscar e filtrar denúncias

**Filtros Avançados:**
- Status: [Todas / Nova / Em investigação / Concluída / Arquivada]
- Categoria: [Todas / Assédio Moral / Assédio Sexual / Discriminação / etc]
- Prioridade: [Todas / Baixa / Média / Alta / Crítica]
- Data: [De] [a]
- Investigador: [Selecionar]
- Tipo: [Todas / Anônimas / Identificadas]
- Palavras-chave: [Busca de texto]

**Tabela:**
| Protocolo | Categoria | Status | Prioridade | Data | Investigador | Ações |
|-----------|-----------|--------|-----------|------|--------------|-------|
| DEN-2025-001 | Ass. Moral | Nova | ALTA | 15/05 | - | 👁️ Visualizar |

**Ações Rápidas:**
- 👁️ Abrir detalhes
- 📌 Atribuir a investigador
- 🏷️ Mudar status
- ⭐ Marcar como prioritária
- 🔒 Exportar (PDF)

---

### Página de Detalhes da Denúncia
**Objetivo:** Análise completa e investigação

**Seções:**

1. **Status & Atribuição**
   - Status atual: [dropdown: Nova/Inv./Concluída/Arquivada]
   - Prioridade: [dropdown: Baixa/Média/Alta/Crítica]
   - Atribuído a: [dropdown com investigadores]
   - Data de criação
   - Última atualização

2. **Dados do Denunciante**
   - Status: Identificado / Anônimo
   - [Se identificado] Nome, Email, Telefone
   - [Se anônimo] Badge "Anônimo"

3. **Dados do Ofensor**
   - Nome, Departamento, Cargo
   - ⚠️ [Se houver] "X outras denúncias contra este ofensor"
   - Histórico de comportamentos reportados

4. **Detalhes do Incidente**
   - Data, Hora, Local
   - Testemunhas: Sim/Não/Quantidade
   - Categoria da denúncia
   - Estado emocional reportado

5. **Descrição & Evidências**
   - Texto completo da denúncia
   - Anexos (imagens, documentos, áudios)
   - Opção de fazer download (protegido)

6. **Comunicações** (Novo)
   - Chat seguro entre investigador e denunciante (se identificado)
   - Histórico de mensagens criptografadas
   - Notificações de novas mensagens

7. **Notas Internas** (Novo)
   - [Investigador] Adicionar observações privadas
   - Timeline de ações tomadas
   - Assinatura digital + timestamp

8. **Recomendações do Sistema** (Novo - IA)
   - Análise de severidade
   - Padrões identificados
   - Sugestões de ações

**Ações:**
- [MUDAR STATUS]
- [ATRIBUIR A]
- [ENVIAR MENSAGEM]
- [ADICIONAR NOTA]
- [GERAR RELATÓRIO PDF]
- [ARQUIVAR]
- [REABRIR]

---

### Página de Relatórios & Estatísticas
**Objetivo:** Análise de dados e geração de relatórios

**Filtros:**
- Período: [Data Início] a [Data Fim]
- Departamentos: [Multi-select]
- Categorias: [Multi-select]
- Status das denúncias: [Multi-select]

**Gráficos:**
1. Tendência de Denúncias (linha 30/60/90 dias)
2. Distribuição por Categoria (pizza)
3. Distribuição por Departamento (barras)
4. Taxa de Resolução (funil)
5. Tempo Médio de Resolução (evolução)
6. Top 10 Ofensores (barras)
7. Impacto Emocional Reportado (dispersão)

**Tabelas Resumidas:**
- Denúncias por investigador (eficiência)
- Denúncias por período (sazonalidade)
- Padrões identificados (IA)

**Exports:**
- [PDF] - Relatório completo
- [Excel] - Dados brutos para análise
- [CSV] - Para integração com BI

---

## 🔐 Features de Segurança (Admin)

1. **Permissões Granulares**
   - Visualizador (leitura apenas)
   - Investigador (leitura + escrita + comunicação)
   - Supervisor (gerenciamento de investigadores)
   - Admin (acesso total + auditoria)

2. **Auditoria Completa**
   - Log de quem acessou qual denúncia
   - Log de todas as alterações
   - Log de exports/downloads
   - IP, timestamp, ação

3. **2FA Obrigatório**
   - TOTP (Google Authenticator)
   - Backup codes

4. **Session Management**
   - Timeout após 30 min inatividade
   - Logout automático ao fechar
   - Alertas de acesso anômalo

---

## 💡 Features Essenciais (MVP - Fase 1)

✅ Formulário com 6 etapas clarificadas  
✅ Portal Admin com listagem e filtros básicos  
✅ Dashboard com estatísticas principais  
✅ Autenticação (Admin)
✅ Envio de email de confirmação  
✅ Rastreamento via protocolo único  
✅ Encriptação básica de dados sensíveis  
✅ Validações em tempo real  

---

## 🚀 Features para Fase 2

📋 Comunicação segura (chat denunciante/investigador)  
📊 Relatórios avançados com IA  
🔔 Notificações (email, SMS)  
🏷️ Sistema de tags e categorização avançada  
⚙️ Integração com sistemas HR  
👥 Gestão de usuários admin  
🔄 Workflow automático de escalação  
📱 App mobile  

---

##  Canais de Suporte

- **Chat de Suporte**: Durante horário comercial
- **Email**: denuncias@cisbaf.org.br
- **FAQ Dinâmico**: Respostas a perguntas comuns
- **Telefone**: 0800-CISBAF (confidencial)

---

## Checklist LGPD/Privacidade

- ✅ Política de Privacidade clara
- ✅ Consentimento explícito para dados
- ✅ Direito ao esquecimento (delete após X anos)
- ✅ Portabilidade de dados
- ✅ Direito de acesso aos dados próprios
- ✅ Encriptação em trânsito e repouso
- ✅ Responsável de dados (DPO)
- ✅ Incidentes de segurança reportados em 72h

---




