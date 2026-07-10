package com.cisbaf.API_CanalDenuncias.Form.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.cisbaf.API_CanalDenuncias.Form.model.enums.Status;
import com.cisbaf.API_CanalDenuncias.Form.dto.DenunciaRequest;
import com.cisbaf.API_CanalDenuncias.Form.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.Form.repository.DenunciaRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DenunciaService {

    private final DenunciaRepository denunciaRepository;

    @Transactional(rollbackFor = Exception.class)
    public Denuncia criarDenuncia(DenunciaRequest denunciaRequest) {
        try {
            Denuncia denuncia = new Denuncia();
            denuncia.setTipoDenunciante(denunciaRequest.tipoDenunciante());
            denuncia.setIsAnonimo(denunciaRequest.isAnonimo());
            denuncia.setVitima(denunciaRequest.vitima());
            denuncia.setTerceiro(denunciaRequest.terceiro());
            denuncia.setOfensor(denunciaRequest.ofensor());
            denuncia.setRelato(denunciaRequest.relato());
            denuncia.setProtocolo("PROT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

            return denunciaRepository.save(denuncia);
        } catch (Exception e) {
            throw new IllegalArgumentException("Erro ao criar denúncia: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public List<Denuncia> getAllDenuncias() {
        return denunciaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Denuncia> getDenunciaByCodigo(UUID id) {
        return denunciaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Denuncia> getDenunciaByProtocolo(String protocolo) {
        return denunciaRepository.findByProtocolo(protocolo);
    }

    @Transactional(rollbackFor = Exception.class)
    public Denuncia atualizarStatus(UUID denunciaId, String newStatus) {
        Denuncia denuncia = getDenunciaByCodigo(denunciaId)
                .orElseThrow(() -> new EntityNotFoundException("Denúncia não encontrada: " + denunciaId));
        denuncia.setStatus(Status.valueOf(newStatus));
        return denunciaRepository.save(denuncia);
    }
}
