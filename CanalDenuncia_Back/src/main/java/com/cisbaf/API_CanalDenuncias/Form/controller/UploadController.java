package com.cisbaf.API_CanalDenuncias.Form.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cisbaf.API_CanalDenuncias.Form.model.Anexo;
import com.cisbaf.API_CanalDenuncias.Form.repository.AnexoRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "Uploads", description = "Download seguro de anexos das denúncias")
public class UploadController {

    private final AnexoRepository anexoRepository;

    @Value("${upload.dir:/uploads}")
    private String uploadDir;

    @GetMapping("/uploads/{nomeArquivo:.+}")
    @Operation(summary = "Baixa o arquivo do servidor mediante autenticação ou protocolo")
    public ResponseEntity<Resource> downloadArquivo(
            @PathVariable String nomeArquivo,
            @RequestParam(required = false) String protocolo) throws IOException {

        Optional<Anexo> anexoOpt = anexoRepository.findByUrlArquivoContaining(nomeArquivo);

        if (anexoOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Anexo anexo = anexoOpt.get();
        boolean autorizado = false;

        // 1. Verifica se tem token JWT de admin válido
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
            autorizado = true;
        }

        // 2. Se não for admin, verifica se forneceu o protocolo correto
        if (!autorizado && protocolo != null && !protocolo.isEmpty()) {
            if (anexo.getDenuncia().getProtocolo().equals(protocolo)) {
                autorizado = true;
            }
        }

        if (!autorizado) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // Lê o arquivo do disco
        Path caminhoArquivo = Paths.get(uploadDir).resolve(nomeArquivo).normalize();
        
        if (!Files.exists(caminhoArquivo)) {
            return ResponseEntity.notFound().build();
        }

        byte[] arquivoBytes = Files.readAllBytes(caminhoArquivo);
        ByteArrayResource resource = new ByteArrayResource(arquivoBytes);

        String contentType = anexo.getTipoArquivo();
        if (contentType == null || contentType.isEmpty()) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + anexo.getNomeArquivo() + "\"")
                .body(resource);
    }
}
