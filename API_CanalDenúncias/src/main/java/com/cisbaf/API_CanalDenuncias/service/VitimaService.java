package com.cisbaf.API_CanalDenuncias.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cisbaf.API_CanalDenuncias.model.Vitima;
import com.cisbaf.API_CanalDenuncias.repository.VitimaRepository;

import lombok.RequiredArgsConstructor;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VitimaService {

    private final VitimaRepository vitimaRepository;

    public List<Vitima> getAllVitimas() {
        return vitimaRepository.findAll();
    }

    public Optional<Vitima> getVitimaById(UUID id) {
        return vitimaRepository.findById(id);
    }

    public Vitima criarVitima(Vitima vitima) {
        return vitimaRepository.save(vitima);
    }
}
