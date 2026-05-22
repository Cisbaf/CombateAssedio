package com.cisbaf.API_CanalDenuncias.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cisbaf.API_CanalDenuncias.model.Vitima;
import com.cisbaf.API_CanalDenuncias.service.VitimaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vitimas")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class VitimaController {

    private final VitimaService vitimaService;

    @GetMapping
    public ResponseEntity<List<Vitima>> getAllVitimas() {
        List<Vitima> vitimas = vitimaService.getAllVitimas();
        return ResponseEntity.ok(vitimas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vitima> getVitimaById(@PathVariable Long id) {
        return vitimaService.getVitimaById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Vitima> criarVitima(@RequestBody Vitima vitima) {
        Vitima savedVitima = vitimaService.criarVitima(vitima);
        return ResponseEntity.ok(savedVitima);
    }
}
