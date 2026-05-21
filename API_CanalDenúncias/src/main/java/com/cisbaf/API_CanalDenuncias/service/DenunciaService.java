package com.cisbaf.API_CanalDenuncias.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cisbaf.API_CanalDenuncias.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.repository.DenunciaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DenunciaService {

    private final DenunciaRepository denunciaRepository;

    public Denuncia criarDenuncia(Denuncia denuncia) {
        return denunciaRepository.save(denuncia);
    }

    public List<Denuncia> getAllDenuncias() {
        return denunciaRepository.findAll();
    }
}
