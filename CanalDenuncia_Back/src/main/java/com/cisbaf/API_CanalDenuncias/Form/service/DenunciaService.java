package com.cisbaf.API_CanalDenuncias.Form.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.cisbaf.API_CanalDenuncias.Form.model.enums.Status;
import com.cisbaf.API_CanalDenuncias.Form.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.Form.repository.DenunciaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DenunciaService {

    private final DenunciaRepository denunciaRepository;

    @Transactional
    public Denuncia criarDenuncia(Denuncia denuncia) {
        try{
            denuncia.setProtocolo("PROT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            denuncia.setStatus(Status.PENDENTE);
            return denunciaRepository.save(denuncia);
        }catch(Exception e){
            throw new IllegalArgumentException("Erro ao criar denúncia: " + e.getMessage());
        }
    }

    public List<Denuncia> getAllDenuncias() {
        return denunciaRepository.findAll();
    }

    public Optional<Denuncia> getDenunciaByCodigo(UUID id) {
        return denunciaRepository.findById(id);
    }

    public Optional<Denuncia> getDenunciaByProtocolo(String protocolo) {
        return denunciaRepository.findByProtocolo(protocolo);
    }

    @Transactional
    public Denuncia atualizarStatus(UUID denunciaId, String newStatus){
        Denuncia denuncia = getDenunciaByCodigo(denunciaId).get();
        denuncia.setStatus(Status.valueOf(newStatus));
        return denunciaRepository.save(denuncia);
    }
}
