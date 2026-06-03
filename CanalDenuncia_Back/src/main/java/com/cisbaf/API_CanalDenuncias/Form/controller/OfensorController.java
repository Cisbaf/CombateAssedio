package com.cisbaf.API_CanalDenuncias.Form.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cisbaf.API_CanalDenuncias.Form.model.Ofensor;
import com.cisbaf.API_CanalDenuncias.Form.service.OfensorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/form/ofensores")
@RequiredArgsConstructor
@Tag(name = "Ofensores", description = "Endpoints para consulta de ofensores (denunciados)")
public class OfensorController {

    private final OfensorService ofensorService;

    @GetMapping
    @Operation(summary = "Lista todos os ofensores", description = "Retorna uma lista com todos os ofensores mapeados (requer autenticação).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
        @ApiResponse(responseCode = "401", description = "Não autorizado")
    })
    public ResponseEntity<List<Ofensor>> getAllOfensores() {
        List<Ofensor> ofensores = ofensorService.getAllOfensores();
        return ResponseEntity.ok(ofensores);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca ofensor por ID", description = "Retorna os detalhes de um ofensor específico pelo seu ID (requer autenticação).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Ofensor encontrado", 
                     content = @Content(schema = @Schema(implementation = Ofensor.class))),
        @ApiResponse(responseCode = "401", description = "Não autorizado"),
        @ApiResponse(responseCode = "404", description = "Ofensor não encontrado")
    })
    public ResponseEntity<Ofensor> getOfensorById(@PathVariable UUID id) {
        return ofensorService.getOfensorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
