package com.cisbaf.API_CanalDenuncias.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import java.util.UUID;
import com.cisbaf.API_CanalDenuncias.model.Ofensor;
import com.cisbaf.API_CanalDenuncias.repository.OfensorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OfensorService {

    private final OfensorRepository ofensorRepository;

    public List<Ofensor> getAllOfensores() {
        return ofensorRepository.findAll();
    }

    public Optional<Ofensor> getOfensorById(UUID id) {
        return ofensorRepository.findById(id);
    }

    public Ofensor criarOfensor(Ofensor ofensor) {
        return ofensorRepository.save(ofensor);
    }

}
