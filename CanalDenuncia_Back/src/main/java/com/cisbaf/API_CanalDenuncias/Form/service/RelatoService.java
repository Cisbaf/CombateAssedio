package com.cisbaf.API_CanalDenuncias.Form.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cisbaf.API_CanalDenuncias.Form.model.Relato;
import com.cisbaf.API_CanalDenuncias.Form.repository.RelatoRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RelatoService {

    private final RelatoRepository relatoRepository;

    public List<Relato> getAllRelatos() {
        return relatoRepository.findAll();
    }

    public Optional<Relato> getRelatoById(UUID id) {
        return relatoRepository.findById(id);
    }

    public Relato criarRelato(Relato relato) {
        return relatoRepository.save(relato);
    }
}
