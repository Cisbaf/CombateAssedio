package com.cisbaf.API_CanalDenuncias.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cisbaf.API_CanalDenuncias.model.Terceiro;
import com.cisbaf.API_CanalDenuncias.service.TerceiroService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/terceiros")
@RequiredArgsConstructor
public class TerceiroController {

    private final TerceiroService terceiroService;

    @GetMapping
    public ResponseEntity<List<Terceiro>> getAllTerceiros() {
        List<Terceiro> terceiros = terceiroService.getAllTerceiros();
        return ResponseEntity.ok(terceiros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Terceiro> getTerceiroById(@PathVariable UUID id) {
        return terceiroService.getTerceiroById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
