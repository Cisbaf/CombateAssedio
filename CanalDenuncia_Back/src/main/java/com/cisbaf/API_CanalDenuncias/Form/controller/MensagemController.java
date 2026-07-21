package com.cisbaf.API_CanalDenuncias.Form.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cisbaf.API_CanalDenuncias.Form.dto.MensagemDto;
import com.cisbaf.API_CanalDenuncias.Form.model.Mensagem;
import com.cisbaf.API_CanalDenuncias.Form.service.MensagemService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/form/mensagens")
@RequiredArgsConstructor
@Tag(name = "Mensagens", description = "Endpoints para gerenciamento de mensagens")
public class MensagemController {
    
    private final MensagemService mensagemService;

    @GetMapping("/{denunciaId}")
    @Operation(summary = "Lista todas as mensagens de uma denúncia", description = "Retorna uma lista com todas as mensagens de uma denúncia específica.")
    public ResponseEntity<List<Mensagem>> getMensagensPorDenuncia(@PathVariable UUID denunciaId) {
        List<Mensagem> mensagens = mensagemService.listarMensagensPorDenuncia(denunciaId);
        return ResponseEntity.ok(mensagens);
    }

    @PostMapping("/{denunciaId}")
    @Operation(summary = "Envia uma nova mensagem", description = "Envia uma nova mensagem para uma denúncia.")
    public ResponseEntity<Mensagem> enviarMensagem(@PathVariable UUID denunciaId, @RequestBody @Valid MensagemDto mensagemDto) {
        Mensagem savedMensagem = mensagemService.enviar(denunciaId, mensagemDto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedMensagem.getId())
                .toUri();
        return ResponseEntity.created(uri).body(savedMensagem);
    }
}
