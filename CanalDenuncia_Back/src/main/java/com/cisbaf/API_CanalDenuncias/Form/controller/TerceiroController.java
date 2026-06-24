package com.cisbaf.API_CanalDenuncias.Form.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cisbaf.API_CanalDenuncias.Form.model.Terceiro;
import com.cisbaf.API_CanalDenuncias.Form.service.TerceiroService;

import io.swagger.v3.oas.annotations.Operation;
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
    public ResponseEntity<List<Terceiro>> getAllTerceiros() {
        List<Terceiro> terceiros = terceiroService.getAllTerceiros();
        return ResponseEntity.ok(terceiros);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca terceiro por ID", description = "Retorna os detalhes de um terceiro específico pelo seu ID (requer autenticação).")
    public ResponseEntity<Terceiro> getTerceiroById(@PathVariable UUID id) {
        return terceiroService.getTerceiroById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
