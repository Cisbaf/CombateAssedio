package com.cisbaf.API_CanalDenuncias.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.cisbaf.API_CanalDenuncias.model.enums.Status;
import com.cisbaf.API_CanalDenuncias.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.repository.DenunciaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DenunciaService {

    private final DenunciaRepository denunciaRepository;

    public Denuncia criarDenuncia(Denuncia denuncia) {
        denuncia.setProtocolo("PROT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        denuncia.setStatus(Status.PENDENTE);
        return denunciaRepository.save(denuncia);
    }

    public List<Denuncia> getAllDenuncias() {
        return denunciaRepository.findAll();
    }

    public Optional<Denuncia> getDenunciaByCodigo(UUID id) {
        return denunciaRepository.findById(id);
    }
}
