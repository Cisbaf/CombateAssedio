package com.cisbaf.API_CanalDenuncias.Form.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cisbaf.API_CanalDenuncias.Form.model.Relato;
import com.cisbaf.API_CanalDenuncias.Form.service.RelatoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/form/relatos")
@RequiredArgsConstructor
@Tag(name = "Relatos", description = "Endpoints para consulta de relatos de denúncia")
public class RelatoController {

    private final RelatoService relatoService;

    @GetMapping
    @Operation(summary = "Lista todos os relatos", description = "Retorna uma lista com todos os relatos cadastrados no sistema (requer autenticação).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
        @ApiResponse(responseCode = "401", description = "Não autorizado")
    })
    public ResponseEntity<List<Relato>> getAllRelatos() {
        List<Relato> relatos = relatoService.getAllRelatos();
        return ResponseEntity.ok(relatos);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca relato por ID", description = "Retorna os detalhes de um relato específico pelo seu ID (requer autenticação).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Relato encontrado", 
                     content = @Content(schema = @Schema(implementation = Relato.class))),
        @ApiResponse(responseCode = "401", description = "Não autorizado"),
        @ApiResponse(responseCode = "404", description = "Relato não encontrado")
    })
    public ResponseEntity<Relato> getRelatoById(@PathVariable UUID id) {
        return relatoService.getRelatoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
