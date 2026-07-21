package com.cisbaf.API_CanalDenuncias.Form.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cisbaf.API_CanalDenuncias.Form.model.Anexo;
import com.cisbaf.API_CanalDenuncias.Form.service.AnexoService;
import com.cisbaf.API_CanalDenuncias.Form.service.MensagemService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.io.IOException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/form/denuncias/{denunciaId}/anexos")
@RequiredArgsConstructor
@Tag(name = "Anexos", description = "Upload de arquivos para denúncias")
public class AnexoController {

    private final AnexoService anexoService;
    private final MensagemService mensagemService;

    @PostMapping(consumes = "multipart/form-data")
    @Operation(summary = "Faz upload de um arquivo para a denúncia")
    public ResponseEntity<Anexo> uploadAnexo(
            @PathVariable UUID denunciaId,
            @RequestParam("arquivo") MultipartFile arquivo) throws IOException {

        mensagemService.anexoEnviado(denunciaId, arquivo.getOriginalFilename());

        Anexo anexo = anexoService.salvarAnexo(denunciaId, arquivo);
        return ResponseEntity.ok(anexo);
    }

    @GetMapping
    @Operation(summary = "Lista todos os anexos de uma denúncia")
    public ResponseEntity<List<Anexo>> listarAnexos(@PathVariable UUID denunciaId) {
        return ResponseEntity.ok(anexoService.listarAnexos(denunciaId));
    }
}
