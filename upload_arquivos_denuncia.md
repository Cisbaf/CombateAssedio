# 📁 Upload de Arquivos na Denúncia — Guia Passo a Passo

> Stack do projeto: **Spring Boot 4 + MySQL + React/TypeScript + Docker Compose**

---

## 1. A Decisão Arquitetural: Banco ou Servidor?

### ❌ Opção A — Salvar o arquivo direto no banco (`BLOB`)

O arquivo inteiro fica numa coluna `LONGBLOB` do MySQL.

| Prós | Contras |
|---|---|
| Simples de implementar | Banco fica **muito pesado** (GBs de imagens = lento) |
| Backup automático junto com os dados | Consultas normais ficam lentas |
| Sem dependência de pasta externa | Sem como usar CDN ou cache HTTP |

### ✅ Opção B — Salvar o arquivo no servidor e o **caminho** no banco *(recomendado)*

O arquivo é salvo numa pasta no servidor (ex: `/uploads/`). No banco você salva apenas uma string com o nome/path do arquivo.

| Prós | Contras |
|---|---|
| Banco permanece leve e rápido | Requer gerenciar a pasta de uploads |
| Fácil de servir os arquivos via HTTP | Backup do banco não inclui os arquivos |
| Pode migrar para S3/MinIO no futuro | Precisa de volume Docker para persistência |

> **Conclusão:** Use a Opção B. É o padrão da indústria para praticamente todos os sistemas de upload.

---

## 2. Visão Geral do Fluxo

```
[Usuário escolhe arquivo no React]
        ↓
[Frontend envia multipart/form-data para POST /form/denuncias/{id}/anexos]
        ↓
[Spring Boot recebe MultipartFile]
        ↓
[Salva o arquivo em /uploads/ no container]
        ↓
[Salva o PATH do arquivo na tabela `anexos` do MySQL]
        ↓
[Retorna a URL pública do arquivo: GET /uploads/{nomeDoArquivo}]
```

---

## 3. Backend — Spring Boot

### 3.1 Criar a entidade `Anexo`

Crie o arquivo `Anexo.java` dentro de `Form/model/`:

```java
// Form/model/Anexo.java
package com.cisbaf.API_CanalDenuncias.Form.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "anexos")
public class Anexo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // Só o nome do arquivo (ex: "abc123_foto.jpg")
    // NÃO salva o caminho absoluto da máquina, só o nome relativo
    @Column(nullable = false, name = "nome_arquivo")
    private String nomeArquivo;

    // URL que o frontend usará para acessar o arquivo
    @Column(nullable = false, name = "url_arquivo")
    private String urlArquivo;

    // Tipo MIME (ex: "image/jpeg", "application/pdf")
    @Column(nullable = false, name = "tipo_arquivo")
    private String tipoArquivo;

    @CreationTimestamp
    @Column(nullable = false, updatable = false, name = "data_upload")
    private LocalDateTime dataUpload;

    // Chave estrangeira para a denúncia
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "denuncia_id", nullable = false)
    private Denuncia denuncia;
}
```

### 3.2 Adicionar o relacionamento em `Denuncia.java`

No modelo `Denuncia`, adicione a lista de anexos:

```java
// Dentro da classe Denuncia.java — adicione este campo:

@OneToMany(mappedBy = "denuncia", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Anexo> anexos = new java.util.ArrayList<>();
```

### 3.3 Criar o `AnexoRepository`

```java
// Form/repository/AnexoRepository.java
package com.cisbaf.API_CanalDenuncias.Form.repository;

import com.cisbaf.API_CanalDenuncias.Form.model.Anexo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface AnexoRepository extends JpaRepository<Anexo, UUID> {
    List<Anexo> findByDenunciaId(UUID denunciaId);
}
```

### 3.4 Criar o `AnexoService`

```java
// Form/service/AnexoService.java
package com.cisbaf.API_CanalDenuncias.Form.service;

import com.cisbaf.API_CanalDenuncias.Form.model.Anexo;
import com.cisbaf.API_CanalDenuncias.Form.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.Form.repository.AnexoRepository;
import com.cisbaf.API_CanalDenuncias.Form.repository.DenunciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AnexoService {

    private final AnexoRepository anexoRepository;
    private final DenunciaRepository denunciaRepository;

    // Vem do application.properties — pasta onde os arquivos ficam no container
    @Value("${upload.dir:/uploads}")
    private String uploadDir;

    // URL base para acessar os arquivos (ex: http://localhost:8080)
    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl;

    public Anexo salvarAnexo(UUID denunciaId, MultipartFile arquivo) throws IOException {
        // 1. Busca a denúncia
        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                .orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));

        // 2. Gera um nome único para evitar conflitos (UUID + nome original)
        String nomeUnico = UUID.randomUUID() + "_" + arquivo.getOriginalFilename();

        // 3. Garante que a pasta de upload existe
        Path pastaUpload = Paths.get(uploadDir);
        Files.createDirectories(pastaUpload);

        // 4. Salva o arquivo físico na pasta
        Path caminhoFinal = pastaUpload.resolve(nomeUnico);
        Files.copy(arquivo.getInputStream(), caminhoFinal);

        // 5. Cria o registro no banco — só salva o NOME, não o caminho absoluto
        Anexo anexo = new Anexo();
        anexo.setNomeArquivo(nomeUnico);
        anexo.setUrlArquivo(baseUrl + "/uploads/" + nomeUnico); // URL pública
        anexo.setTipoArquivo(arquivo.getContentType());
        anexo.setDenuncia(denuncia);

        return anexoRepository.save(anexo);
    }

    public List<Anexo> listarAnexos(UUID denunciaId) {
        return anexoRepository.findByDenunciaId(denunciaId);
    }
}
```

### 3.5 Criar o `AnexoController`

```java
// Form/controller/AnexoController.java
package com.cisbaf.API_CanalDenuncias.Form.controller;

import com.cisbaf.API_CanalDenuncias.Form.model.Anexo;
import com.cisbaf.API_CanalDenuncias.Form.service.AnexoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/form/denuncias/{denunciaId}/anexos")
@RequiredArgsConstructor
@Tag(name = "Anexos", description = "Upload de arquivos para denúncias")
public class AnexoController {

    private final AnexoService anexoService;

    // Recebe um arquivo por vez (multipart/form-data)
    // O campo no form se chama "arquivo"
    @PostMapping(consumes = "multipart/form-data")
    @Operation(summary = "Faz upload de um arquivo para a denúncia")
    public ResponseEntity<Anexo> uploadAnexo(
            @PathVariable UUID denunciaId,
            @RequestParam("arquivo") MultipartFile arquivo) throws IOException {

        Anexo anexo = anexoService.salvarAnexo(denunciaId, arquivo);
        return ResponseEntity.ok(anexo);
    }

    @GetMapping
    @Operation(summary = "Lista todos os anexos de uma denúncia")
    public ResponseEntity<List<Anexo>> listarAnexos(@PathVariable UUID denunciaId) {
        return ResponseEntity.ok(anexoService.listarAnexos(denunciaId));
    }
}
```

### 3.6 Configurar o Spring para servir os arquivos

Para que os arquivos em `/uploads/` sejam acessíveis via URL, configure o `WebMvcConfig`:

```java
// Form/config/WebConfig.java (crie esse arquivo se não existir)
package com.cisbaf.API_CanalDenuncias.Form.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${upload.dir:/uploads}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Qualquer GET /uploads/nomeDoArquivo será mapeado para a pasta física
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadDir + "/");
    }
}
```

### 3.7 Adicionar propriedades ao `application.properties`

```properties
# Pasta onde os arquivos ficam dentro do container
upload.dir=/uploads

# URL base para montar a URL pública dos arquivos
app.base-url=http://localhost:8080

# Limite de tamanho por arquivo (padrão Spring é 1MB — aumente se necessário)
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=50MB
```

---

## 4. Docker — Persistência dos Arquivos

> ⚠️ Sem um **volume**, os arquivos somem toda vez que o container reiniciar!

No seu `docker-compose.yml`, adicione um volume ao serviço do backend:

```yaml
# docker-compose.yml
services:
  backend:
    # ... suas configs existentes ...
    volumes:
      # Mapeia a pasta /uploads do container para uma pasta local
      - uploads_data:/uploads

# No final do arquivo, declare o volume nomeado:
volumes:
  uploads_data:
```

Ou, se preferir ver os arquivos diretamente na sua máquina (mais fácil para dev):

```yaml
volumes:
  - ./uploads:/uploads   # pasta local ./uploads mapeada para /uploads no container
```

---

## 5. Frontend — React/TypeScript

### 5.1 Componente de Upload

```tsx
// src/features/denuncia/components/UploadAnexos.tsx
import React, { useState } from "react";

interface Anexo {
  id: string;
  nomeArquivo: string;
  urlArquivo: string;
  tipoArquivo: string;
}

interface Props {
  denunciaId: string; // UUID da denúncia já criada
}

export function UploadAnexos({ denunciaId }: Props) {
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [anexosEnviados, setAnexosEnviados] = useState<Anexo[]>([]);
  const [enviando, setEnviando] = useState(false);

  function handleSelecionarArquivos(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setArquivos(Array.from(e.target.files));
    }
  }

  async function handleEnviar() {
    setEnviando(true);

    for (const arquivo of arquivos) {
      // Envia um por vez — multipart/form-data
      const formData = new FormData();
      formData.append("arquivo", arquivo); // "arquivo" é o @RequestParam no Spring

      const response = await fetch(
        `http://localhost:8080/form/denuncias/${denunciaId}/anexos`,
        {
          method: "POST",
          body: formData,
          // NÃO defina Content-Type manualmente — o browser define automaticamente
          // com o boundary correto para multipart/form-data
        }
      );

      if (response.ok) {
        const anexo: Anexo = await response.json();
        setAnexosEnviados((prev) => [...prev, anexo]);
      }
    }

    setEnviando(false);
    setArquivos([]);
  }

  return (
    <div>
      <h3>Anexar Arquivos</h3>

      {/* Input de arquivo — aceita imagens e PDFs */}
      <input
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={handleSelecionarArquivos}
      />

      {/* Preview dos arquivos selecionados */}
      {arquivos.length > 0 && (
        <ul>
          {arquivos.map((f, i) => (
            <li key={i}>{f.name} ({(f.size / 1024).toFixed(1)} KB)</li>
          ))}
        </ul>
      )}

      <button onClick={handleEnviar} disabled={enviando || arquivos.length === 0}>
        {enviando ? "Enviando..." : "Enviar Arquivos"}
      </button>

      {/* Lista dos arquivos já enviados */}
      {anexosEnviados.length > 0 && (
        <div>
          <h4>Arquivos Enviados:</h4>
          {anexosEnviados.map((a) => (
            <div key={a.id}>
              {a.tipoArquivo.startsWith("image/") ? (
                // Se for imagem, mostra preview
                <img src={a.urlArquivo} alt={a.nomeArquivo} width={200} />
              ) : (
                // Se for PDF ou outro, mostra link
                <a href={a.urlArquivo} target="_blank" rel="noreferrer">
                  📄 {a.nomeArquivo}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 5.2 Fluxo de Criação da Denúncia + Upload (Recomendado)

Como o upload de arquivos exige que a denúncia **já exista** no banco (para possuir um `id`), a estratégia mais simples no frontend é dividir a submissão final em duas etapas. 

Você deve enviar os dados (textos) da denúncia primeiro, obter o ID gerado pelo backend, e **depois** exibir a tela para anexar os arquivos.

O fluxo ideal no seu componente Pai (que gerencia os passos):

1. O usuário preenche todos os passos normais (Dados, Relato, Consentimento no `StepD`).
2. Ao finalizar o último passo de dados, o frontend faz o `POST` para criar a denúncia.
3. O backend retorna a denúncia criada (com o `id` gerado, ex: `123e4567-e89b...`).
4. O frontend avança para um **Passo Final (Upload de Anexos)**, passando esse `id`.

#### Exemplo de implementação no Componente Principal (que controla os Steps):

```tsx
import { useState } from "react";
import StepD from "./StepD";
import { UploadAnexos } from "./UploadAnexos";

export function FormularioPrincipal() {
  const [passoAtual, setPassoAtual] = useState(1);
  const [denunciaIdGerada, setDenunciaIdGerada] = useState<string | null>(null);

  // ... estados dos outros steps ...

  // Função chamada quando o usuário clica em "Prosseguir" no StepD
  async function handleFinalizarDenuncia(dadosStepD: any) {
    try {
      // 1. Prepara todos os dados da denúncia
      const payload = {
        // ... dados dos passos A, B, C ...
        ...dadosStepD
      };

      // 2. Envia para o Backend para CRIAR a denúncia
      const response = await fetch("http://localhost:8080/form/denuncias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Erro ao criar denúncia");

      const denunciaCriada = await response.json();
      
      // 3. Salva o ID gerado no estado
      setDenunciaIdGerada(denunciaCriada.id);
      
      // 4. Avança para o próximo passo exclusivo de upload
      setPassoAtual(5); 

    } catch (error) {
      console.error(error);
      alert("Erro ao criar denúncia. Tente novamente.");
    }
  }

  return (
    <div>
      {/* ... Outros passos ... */}
      
      {passoAtual === 4 && (
        <StepD 
          onAvançar={handleFinalizarDenuncia} 
          onVoltar={() => setPassoAtual(3)} 
        />
      )}
      
      {/* NOVO PASSO: Aparece apenas DEPOIS que a denúncia foi criada no banco */}
      {passoAtual === 5 && denunciaIdGerada && (
        <div>
          <h2>Denúncia criada com sucesso!</h2>
          <p>O número de protocolo é: {denunciaIdGerada}</p>
          <p>Agora você pode anexar provas (fotos, PDFs, vídeos) se desejar:</p>
          
          <UploadAnexos 
            denunciaId={denunciaIdGerada} 
            // onFinalizar={() => alert("Tudo concluído!")} // opcional
          />
        </div>
      )}
    </div>
  );
}
```

Dessa forma, você garante que a requisição de arquivos sempre tenha um `denunciaId` válido e o usuário entende que os arquivos estão sendo anexados à denúncia que ele acabou de registrar.

---

## 6. Validações Importantes (não esqueça!)

### No Backend:

```java
// Dentro do AnexoService.salvarAnexo(), antes de salvar:

// Valida o tipo do arquivo (evita uploads maliciosos)
List<String> tiposPermitidos = List.of("image/jpeg", "image/png", "image/gif", "application/pdf");
if (!tiposPermitidos.contains(arquivo.getContentType())) {
    throw new RuntimeException("Tipo de arquivo não permitido: " + arquivo.getContentType());
}

// Valida o tamanho máximo por arquivo (10MB)
if (arquivo.getSize() > 10 * 1024 * 1024) {
    throw new RuntimeException("Arquivo muito grande. Máximo: 10MB");
}
```

### No Frontend:

```tsx
// No input, use o atributo accept para filtrar no browser
<input type="file" accept="image/jpeg,image/png,image/gif,application/pdf" />

// E valide antes de enviar:
for (const arquivo of arquivos) {
  if (arquivo.size > 10 * 1024 * 1024) {
    alert(`${arquivo.name} é muito grande (max 10MB)`);
    return;
  }
}
```

---

## 7. Estrutura Final do Banco de Dados

```sql
-- Tabela criada automaticamente pelo Hibernate (JPA)
CREATE TABLE anexos (
    id          BINARY(16) PRIMARY KEY,
    nome_arquivo VARCHAR(255) NOT NULL,
    url_arquivo  VARCHAR(512) NOT NULL,
    tipo_arquivo VARCHAR(100) NOT NULL,
    data_upload  DATETIME     NOT NULL,
    denuncia_id  BINARY(16)   NOT NULL,
    FOREIGN KEY (denuncia_id) REFERENCES denuncias(id)
);
```

> O arquivo `.jpg` fica em `/uploads/abc123_foto.jpg` no servidor.
> No banco, `url_arquivo` salva `"http://localhost:8080/uploads/abc123_foto.jpg"`.

---

## 8. Resumo das Novas Classes

| Arquivo | Onde criar |
|---|---|
| `Anexo.java` | `Form/model/` |
| `AnexoRepository.java` | `Form/repository/` |
| `AnexoService.java` | `Form/service/` |
| `AnexoController.java` | `Form/controller/` |
| `WebConfig.java` | `Form/config/` |
| `UploadAnexos.tsx` | `src/features/denuncia/components/` |

---

## 9. Próximos Passos (quando quiser evoluir)

- [ ] **Migrar para MinIO** (S3 compatível, self-hosted via Docker) para armazenamento dedicado
- [ ] **Limite por denúncia** (ex: máximo 5 arquivos por denúncia)
- [ ] **Excluir arquivo** (deletar do disco E do banco)
- [ ] **Antivírus** (ClamAV via Docker para escanear uploads)
