package com.cisbaf.API_CanalDenuncias.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cisbaf.API_CanalDenuncias.model.Relato;
import com.cisbaf.API_CanalDenuncias.service.RelatoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/relatos")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class RelatoController {

    private final RelatoService relatoService;

    @GetMapping
    public ResponseEntity<List<Relato>> getAllRelatos() {
        List<Relato> relatos = relatoService.getAllRelatos();
        return ResponseEntity.ok(relatos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Relato> getRelatoById(@PathVariable Long id) {
        return relatoService.getRelatoById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Relato> criarRelato(@RequestBody Relato relato) {
        Relato savedRelato = relatoService.criarRelato(relato);
        return ResponseEntity.ok(savedRelato);
    }
}
