package com.cisbaf.API_CanalDenuncias.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cisbaf.API_CanalDenuncias.model.Relato;
import com.cisbaf.API_CanalDenuncias.service.RelatoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/relatos")
@RequiredArgsConstructor
public class RelatoController {

    private final RelatoService relatoService;

    @GetMapping
    public ResponseEntity<List<Relato>> getAllRelatos() {
        List<Relato> relatos = relatoService.getAllRelatos();
        return ResponseEntity.ok(relatos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Relato> getRelatoById(@PathVariable UUID id) {
        return relatoService.getRelatoById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
