package com.cisbaf.API_CanalDenuncias.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cisbaf.API_CanalDenuncias.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.service.DenunciaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/denuncias")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DenunciaController {

    private final DenunciaService denunciaService;

    @PostMapping
    public ResponseEntity<Denuncia> criarDenuncia(@RequestBody Denuncia denuncia) {
        Denuncia savedDenuncia = denunciaService.criarDenuncia(denuncia);
        return ResponseEntity.ok(savedDenuncia);
    }

    @GetMapping
    public ResponseEntity<List<Denuncia>> getAllDenuncias() {
        List<Denuncia> denuncias = denunciaService.getAllDenuncias();
        return ResponseEntity.ok(denuncias);
    }
}
