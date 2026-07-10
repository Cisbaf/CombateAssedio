package com.cisbaf.API_CanalDenuncias.Form.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cisbaf.API_CanalDenuncias.Form.dto.DenunciaRequest;
import com.cisbaf.API_CanalDenuncias.Form.dto.DenunciaResponse;
import com.cisbaf.API_CanalDenuncias.Form.dto.StatusRequest;
import com.cisbaf.API_CanalDenuncias.Form.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.Form.service.DenunciaService;
import com.cisbaf.API_CanalDenuncias.Form.service.EmailService;
import com.cisbaf.API_CanalDenuncias.Form.service.MensagemService;
import com.cisbaf.API_CanalDenuncias.Form.utils.Utils;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/form/denuncias")
@RequiredArgsConstructor
@Tag(name = "Denúncias", description = "Endpoints para gerenciamento de denúncias")
public class DenunciaController {

    private final DenunciaService denunciaService;
    private final MensagemService mensagemService;
    private final Utils utils;
    private final EmailService emailService;

    @PostMapping
    @Operation(summary = "Cria uma nova denúncia", description = "Registra uma denúncia no sistema e gera um protocolo.")
    public ResponseEntity<DenunciaResponse> criarDenuncia(@RequestBody @Valid DenunciaRequest denunciaRequest) {
        Denuncia savedDenuncia = denunciaService.criarDenuncia(denunciaRequest);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedDenuncia.getId())
                .toUri();
        DenunciaResponse response = new DenunciaResponse(savedDenuncia.getProtocolo());

        //emailService.enviarEmailNovaDenuncia(savedDenuncia.getProtocolo());

        return ResponseEntity.created(uri).body(response);
    }

    @GetMapping
    @Operation(summary = "Lista todas as denúncias", description = "Retorna uma lista com todas as denúncias cadastradas (requer autenticação).")
    public ResponseEntity<List<Denuncia>> getAllDenuncias() {
        List<Denuncia> denuncias = denunciaService.getAllDenuncias();
        return ResponseEntity.ok(denuncias);
    }

    @GetMapping("/protocolo/{protocolo}")
    @Operation(summary = "Busca uma denúncia por protocolo", description = "Busca os detalhes de uma denúncia específica pelo número de protocolo.")
    public ResponseEntity<Denuncia> getDenunciaByProtocolo(@PathVariable String protocolo) {
        return denunciaService.getDenunciaByProtocolo(protocolo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca uma denúncia por ID", description = "Busca os detalhes de uma denúncia específica pelo seu ID (requer autenticação).")
    public ResponseEntity<Denuncia> getDenunciaByCodigo(@PathVariable UUID id) {
        return denunciaService.getDenunciaByCodigo(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/atualizarStatus/{id}")
    @Operation(summary = "Atualiza o status de uma denúncia", description = "Atualiza o status de uma denúncia específica pelo seu ID (requer autenticação).")
    public ResponseEntity<Denuncia> statusUpdate(@PathVariable("id") UUID denunciaId,
            @RequestBody @Valid StatusRequest status) {
        Denuncia denuncia = denunciaService.atualizarStatus(denunciaId, status.status());

        mensagemService.statusUpdate(denunciaId, utils.StringStatus(status.status()));

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(denuncia.getId())
                .toUri();
        return ResponseEntity.created(uri).body(denuncia);
    }

}
