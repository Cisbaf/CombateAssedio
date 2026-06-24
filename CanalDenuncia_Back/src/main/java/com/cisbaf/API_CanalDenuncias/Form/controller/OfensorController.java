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
    public ResponseEntity<List<Ofensor>> getAllOfensores() {
        List<Ofensor> ofensores = ofensorService.getAllOfensores();
        return ResponseEntity.ok(ofensores);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca ofensor por ID", description = "Retorna os detalhes de um ofensor específico pelo seu ID (requer autenticação).")
    
    public ResponseEntity<Ofensor> getOfensorById(@PathVariable UUID id) {
        return ofensorService.getOfensorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
