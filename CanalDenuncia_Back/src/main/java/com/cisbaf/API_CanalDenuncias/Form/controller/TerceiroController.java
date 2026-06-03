package com.cisbaf.API_CanalDenuncias.Form.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cisbaf.API_CanalDenuncias.Form.model.Terceiro;
import com.cisbaf.API_CanalDenuncias.Form.service.TerceiroService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/form/terceiros")
@RequiredArgsConstructor
@Tag(name = "Terceiros", description = "Endpoints para consulta de terceiros (denunciantes não-vítimas)")
public class TerceiroController {

    private final TerceiroService terceiroService;

    @GetMapping
    @Operation(summary = "Lista todos os terceiros", description = "Retorna uma lista com todos os terceiros cadastrados no sistema (requer autenticação).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
        @ApiResponse(responseCode = "401", description = "Não autorizado")
    })
    public ResponseEntity<List<Terceiro>> getAllTerceiros() {
        List<Terceiro> terceiros = terceiroService.getAllTerceiros();
        return ResponseEntity.ok(terceiros);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca terceiro por ID", description = "Retorna os detalhes de um terceiro específico pelo seu ID (requer autenticação).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Terceiro encontrado", 
                     content = @Content(schema = @Schema(implementation = Terceiro.class))),
        @ApiResponse(responseCode = "401", description = "Não autorizado"),
        @ApiResponse(responseCode = "404", description = "Terceiro não encontrado")
    })
    public ResponseEntity<Terceiro> getTerceiroById(@PathVariable UUID id) {
        return terceiroService.getTerceiroById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
