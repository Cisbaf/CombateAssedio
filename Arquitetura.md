# Arquitetura do App de Denúncias de Assédio e Discriminação do Cisbaf

## 1. Stack Tecnológico

### Frontend
* **Next.js** - Framework React com SSR/SSG
* **React** - UI Components
* **TypeScript** - Type safety
* **Tailwind CSS** - Styling

### Backend
* **Spring Boot** - Framework Java (REST API)
* **Spring Data JPA** - ORM
* **Lombok** - Redução de boilerplate
* **MySQL** - Banco de dados principal

---

## 2. Arquitetura de Camadas

### Backend (Spring Boot)
As camadas do backend estão estruturadas sob o pacote base `com.cisbaf.API_CanalDenuncias`:
```
src/main/java/com/cisbaf/API_CanalDenuncias/
├── controller/
│   ├── DenunciaController.java
│   ├── OfensorController.java
│   ├── RelatoController.java
│   ├── TerceiroController.java
│   └── VitimaController.java
├── service/
│   ├── DenunciaService.java
│   ├── OfensorService.java
│   ├── RelatoService.java
│   ├── TerceiroService.java
│   └── VitimaService.java
├── repository/
│   ├── DenunciaRepository.java
│   ├── OfensorRepository.java
│   ├── RelatoRepository.java
│   ├── TerceiroRepository.java
│   └── VitimaRepository.java
├── model/
│   ├── Denuncia.java
│   ├── Ofensor.java
│   ├── Relato.java
│   ├── Terceiro.java
│   └── Vitima.java
├── dto/
│   ├── DenunciaDto.java
│   ├── OfesorDto.java
│   ├── RelatoDto.java
│   ├── TerceiroDto.java
│   └── VitimaDto.java
├── config/ (vazio, preparado para futuras configurações globais)
└── infra/ (vazio, preparado para interceptadores ou segurança avançada)
```

### Frontend (Next.js)
```
src/app/
├── globals.css
├── layout.tsx
└── page.tsx           # Formulário simples de integração e listagem
src/components/
└── types.ts           # Definição de tipos TypeScript unificados (DTOs de Envio/Resposta)
```

---

## 3. Estrutura de Identificação (UUID)

Todas as entidades no banco de dados e APIs utilizam identificadores únicos globais (**UUID**) em vez de IDs numéricos sequenciais (`Long`). Isso aumenta a segurança ao impossibilitar a adivinhação de URLs ou chaves de registros por terceiros.

* **Estratégia de Geração:** `@GeneratedValue(strategy = GenerationType.UUID)`
* **Tipo Java:** `java.util.UUID`
* **Campos Chave afetados:**
  - `Denuncia.id`
  - `Ofensor.id`
  - `Relato.id`
  - `Terceiro.id`
  - `Vitima.id`

---

## 4. Dependências Maven (Backend)

### Core & Web
* `spring-boot-starter-web` - Criação de REST APIs e integração CORS (`@CrossOrigin`)
* `spring-boot-starter-data-jpa` - Camada ORM integrada com o Hibernate

### Database
* `mysql-connector-j` - Driver oficial de conexão com o MySQL
* `lombok` - Anotações para autogeração de getters, setters, construtores e padrões builder (`@Data`, `@RequiredArgsConstructor`)

### Validação
* `spring-boot-starter-validation` - Validações baseadas em anotações (ex: `@CPF` na entidade vítima)

---

## 5. Rotas de API Ativas (REST)

### Denúncias
* `GET /api/denuncias` - Retorna a lista completa de denúncias
* `POST /api/denuncias` - Cadastra uma nova denúncia (com relato e ofensor acoplados)

### Ofensores
* `GET /api/ofensores` - Retorna todos os ofensores
* `GET /api/ofensores/{id}` - Retorna um ofensor específico por UUID
* `POST /api/ofensores` - Cria um novo registro de ofensor

### Vítimas
* `GET /api/vitimas` - Retorna todas as vítimas cadastradas
* `GET /api/vitimas/{id}` - Retorna uma vítima específica por UUID
* `POST /api/vitimas` - Cria um novo registro de vítima

### Relatos
* `GET /api/relatos` - Retorna a lista de relatos
* `GET /api/relatos/{id}` - Detalhes de um relato por UUID

### Terceiros
* `GET /api/terceiros` - Retorna terceiros/testemunhas
* `GET /api/terceiros/{id}` - Detalhes de terceiros por UUID

---

## 6. Fluxo de Dados e Integração

```
USUÁRIO (Frontend)
   ↓
[page.tsx] (Formulário React / useState)
   ↓ (Fetch API POST/GET com JSON)
[Spring Boot Controller] (com CORS liberado via @CrossOrigin)
   ↓
[Spring Boot Service] (Regras de negócio e geração automática de protocolo)
   ↓
[Spring Data JPA Repository] (Tipado com UUID)
   ↓
[MySQL Database] (Tabelas: denuncias, ofensores, relatos, terceiros, vitimas)
```
