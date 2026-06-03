package com.cisbaf.API_CanalDenuncias.Form.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cisbaf.API_CanalDenuncias.Form.model.Vitima;
import com.cisbaf.API_CanalDenuncias.Form.service.VitimaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/form/vitimas")
@RequiredArgsConstructor
@Tag(name = "Vítimas", description = "Endpoints para consulta de vítimas cadastradas")
public class VitimaController {

    private final VitimaService vitimaService;

    @GetMapping
    @Operation(summary = "Lista todas as vítimas", description = "Retorna uma lista com todas as vítimas cadastradas no sistema (requer autenticação).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
        @ApiResponse(responseCode = "401", description = "Não autorizado")
    })
    public ResponseEntity<List<Vitima>> getAllVitimas() {
        List<Vitima> vitimas = vitimaService.getAllVitimas();
        return ResponseEntity.ok(vitimas);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca vítima por ID", description = "Retorna os detalhes de uma vítima específica pelo seu ID (requer autenticação).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Vítima encontrada", 
                     content = @Content(schema = @Schema(implementation = Vitima.class))),
        @ApiResponse(responseCode = "401", description = "Não autorizado"),
        @ApiResponse(responseCode = "404", description = "Vítima não encontrada")
    })
    public ResponseEntity<Vitima> getVitimaById(@PathVariable UUID id) {
        return vitimaService.getVitimaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
