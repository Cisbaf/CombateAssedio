# Arquitetura do App de Denúncias de Assédio e Discriminação do Cisbaf

## 1. Stack Tecnológico

### Frontend
* **Next.js** - Framework React com SSR/SSG
* **React** - UI Components
* **TypeScript** - Type safety
* **Tailwind CSS** - Styling

### Backend
* **Spring Boot** - Framework Java
* **Spring Security** - Autenticação e autorização
* **Spring Data JPA** - ORM
* **JWT** - Autenticação via tokens

### Banco de Dados
* **MySQL** - Principal

---

## 2. Arquitetura de Camadas

### Backend (Spring Boot)
```
src/main/java/br/cisbaf/denuncias/
├── controller/
│   ├── DenunciaController
│   ├── UsuarioController
│   ├── AdminController
│   └── AuthController
├── service/
│   ├── DenunciaService
│   ├── UsuarioService
│   ├── AdminService
│   ├── EncriptacaoService
│   ├── ValidacaoService
│   ├── NotificacaoService
│   └── RelatorioService
├── repository/
│   ├── DenunciaRepository
│   ├── UsuarioRepository
│   ├── AuditoriaRepository
│   └── ComunicacaoRepository
├── entity/
│   ├── Usuario
│   ├── Denuncia
│   ├── Ofensor
│   ├── Comunicacao
│   ├── Auditoria
│   └── Notificacao
├── dto/
│   ├── DenunciaDTO
│   ├── UsuarioDTO
│   └── RelatorioDTO
├── security/
│   ├── JwtTokenProvider
│   ├── SecurityConfig
│   ├── CustomUserDetailsService
│   └── RoleBasedAccessControl
├── util/
│   ├── EncriptacaoUtil
│   ├── ValidacaoCPFUtil
│   ├── GeracaoCodigo
│   └── ConversaoPDF
├── exception/
│   ├── DenunciaException
│   ├── UsuarioException
│   └── SecurityException
└── config/
    ├── SecurityConfig
    ├── DatabaseConfig
    └── EmailConfig
```

### Frontend (Next.js)
```
app/
├── (auth)/
│   ├── login/
│   ├── recuperar-senha/
│   └── logout/
├── (user)/
│   ├── formulario/
│   │   ├── etapa-a/          # Identificação
│   │   ├── etapa-b/          # Dados do ofensor
│   │   ├── etapa-c/          # Data/Local
│   │   ├── etapa-d/          # Descrição
│   │   └── confirmacao/      # Protocolo
│   ├── acompanhamento/       # Rastrear denúncia
│   └── minha-conta/
├── (admin)/
│   ├── dashboard/
│   ├── denuncias/
│   │   ├── lista/
│   │   ├── [id]/
│   │   └── [id]/comunicacao/
│   ├── relatorios/
│   ├── usuarios-admin/
│   ├── auditoria/
│   └── configuracoes/
├── api/
│   └── (rotas backend proxy)
├── components/
│   ├── formulario/
│   ├── admin/
│   ├── common/
│   └── charts/
└── lib/
    ├── api.ts
    ├── auth.ts
    └── utils.ts
```

---

## 3. Dependências Maven (Backend)

### Core
* `spring-boot-starter-web` - REST APIs
* `spring-boot-starter-data-jpa` - ORM
* `spring-boot-starter-security` - Autenticação
* `spring-boot-starter-mail` - Envio de emails

### Segurança
* `jjwt` - JWT tokens
* `spring-security-crypto` - Hashing de senhas (bcrypt)
* `jasypt-spring-boot-starter` - Encriptação de propriedades

### Database
* `mysql-connector-java` - Driver MySQL
* `lombok` - Reduz boilerplate
* `mapstruct` - Conversão DTO/Entity

### Validação & Utilitários
* `spring-boot-starter-validation` - Bean validation
* `commons-validator` - Validação de CPF/email
* `apache-commons-lang3` - Utilitários

### Relatórios
* `jasperreports` - Geração de PDFs
* `poi` - Exportação Excel

### Observabilidade
* `spring-boot-starter-actuator` - Métricas
* `spring-boot-starter-logging` - Logs

---

## 4. Dependências npm (Frontend)

### Core
* `next` - Framework
* `react` - UI
* `typescript` - Type safety

### Formulários & Validação
* `react-hook-form` - Gerenciamento de formulários
* `zod` - Schema validation
* `axios` - HTTP client

### Estado & Dados
* `zustand` - State management
* `@tanstack/react-query` - Data fetching
* `swr` - Data fetching alternativa

### UI & Styling
* `tailwindcss` - CSS framework
* `framer-motion` - Animações
* `recharts` - Gráficos
* `react-hot-toast` - Notificações

### Utilitários
* `date-fns` - Manipulação de datas
* `js-cookie` - Gestão de cookies
* `crypto-js` - Encriptação cliente-side

### Dev Tools
* `eslint` - Linting
* `prettier` - Code formatting
* `jest` - Testes unitários
* `testing-library` - Testes de componentes

---

## 5. Camadas de Segurança

### Nível 1: Transmissão
- ✅ SSL/TLS obrigatório (HTTPS)
- ✅ HSTS (HTTP Strict Transport Security)
- ✅ Rate limiting (API Gateway)

### Nível 2: Autenticação
- ✅ JWT com expiração
- ✅ Refresh tokens
- ✅ 2FA para admin (TOTP)
- ✅ Bcrypt/Argon2 para senhas

### Nível 3: Dados
- ✅ Encriptação AES-256 para CPF/PII
- ✅ Hashing de emails sensíveis
- ✅ Mascaramento de dados em logs

### Nível 4: Aplicação
- ✅ CORS configurado
- ✅ CSRF tokens
- ✅ SQL Injection prevention (prepared statements)
- ✅ XSS protection (sanitização)
- ✅ Input validation (backend)

### Nível 5: Auditoria
- ✅ Logs de todas as ações
- ✅ Rastreamento de quem acessou qual denúncia
- ✅ Trilha de auditoria imutável
- ✅ Alertas de atividades suspeitas

---

## 6. Fluxo de Dados

```
USUARIO
   ↓
[Frontend - Next.js]
   ↓ (HTTPS + JWT)
[Gateway/Load Balancer]
   ↓
[Backend - Spring Boot]
   ├→ Controller (validação)
   ├→ Service (lógica)
   ├→ Security (autorização)
   └→ Repository (dados)
   ↓
[MySQL Database]
   ├→ Tabela: usuarios
   ├→ Tabela: denuncias
   ├→ Tabela: ofensores
   ├→ Tabela: comunicacoes
   ├→ Tabela: auditoria
   └→ Tabela: notificacoes
   ↓
[Cache - Redis (opcional)]
   ↓
[Fila de Mensagens - RabbitMQ/Kafka (opcional)]
   ├→ Email Queue
   ├→ SMS Queue
   └→ Notificações Queue
```

---

## 7. Deploy & Infra

### Recomendado
* **Docker** - Containerização
* **Docker Compose** - Ambiente local
* **Kubernetes** - Orquestração (produção)
* **AWS/Azure/GCP** - Cloud provider

### CI/CD
* GitHub Actions / GitLab CI
* Testes automáticos
* Análise de código (SonarQube)
* Deploy automático

### Monitoramento
* **Prometheus** - Métricas
* **Grafana** - Dashboards
* **ELK Stack** - Logs centralizados
* **Sentry** - Error tracking

---

## 8. Padrões de Design

* **MVC** - Separação de responsabilidades
* **Injeção de Dependência** - Spring IoC
* **Repository Pattern** - Abstração de dados
* **Service Layer** - Lógica de negócio
* **DTO** - Transferência de dados
* **Middleware** - Autenticação/Autorização

