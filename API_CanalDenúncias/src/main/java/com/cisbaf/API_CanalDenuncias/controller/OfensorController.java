package com.cisbaf.API_CanalDenuncias.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cisbaf.API_CanalDenuncias.model.Ofensor;
import com.cisbaf.API_CanalDenuncias.service.OfensorService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ofensores")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class OfensorController {

    private final OfensorService ofensorService;

    @GetMapping
    public ResponseEntity<List<Ofensor>> getAllOfensores() {
        List<Ofensor> ofensores = ofensorService.getAllOfensores();
        return ResponseEntity.ok(ofensores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ofensor> getOfensorById(@PathVariable UUID id) {
        return ofensorService.getOfensorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Ofensor> criarOfensor(@RequestBody Ofensor ofensor) {
        Ofensor savedOfensor = ofensorService.criarOfensor(ofensor);
        return ResponseEntity.ok(savedOfensor);
    }

}
