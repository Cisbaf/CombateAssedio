package com.cisbaf.API_CanalDenuncias.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cisbaf.API_CanalDenuncias.model.Terceiro;
import com.cisbaf.API_CanalDenuncias.repository.TerceiroRepository;
import java.util.UUID;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TerceiroService {

    private final TerceiroRepository terceiroRepository;

    public List<Terceiro> getAllTerceiros() {
        return terceiroRepository.findAll();
    }

    public Optional<Terceiro> getTerceiroById(UUID id) {
        return terceiroRepository.findById(id);
    }

    public Terceiro criarTerceiro(Terceiro terceiro) {
        return terceiroRepository.save(terceiro);
    }
}
