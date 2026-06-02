package com.cisbaf.API_CanalDenuncias.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cisbaf.API_CanalDenuncias.model.Vitima;
import com.cisbaf.API_CanalDenuncias.service.VitimaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vitimas")
@RequiredArgsConstructor
public class VitimaController {

    private final VitimaService vitimaService;

    @GetMapping
    public ResponseEntity<List<Vitima>> getAllVitimas() {
        List<Vitima> vitimas = vitimaService.getAllVitimas();
        return ResponseEntity.ok(vitimas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vitima> getVitimaById(@PathVariable UUID id) {
        return vitimaService.getVitimaById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
