package com.cisbaf.API_CanalDenuncias.Form.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.cisbaf.API_CanalDenuncias.Form.dto.MensagemDto;
import com.cisbaf.API_CanalDenuncias.Form.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.Form.model.Mensagem;
import com.cisbaf.API_CanalDenuncias.Form.repository.DenunciaRepository;
import com.cisbaf.API_CanalDenuncias.Form.repository.MensagemRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MensagemService {

    private final DenunciaRepository denunciaRepository;
    private final MensagemRepository mensagemRepository;

    @Transactional(readOnly = true)
    public List<Mensagem> listarMensagensPorDenuncia(UUID denunciaId) {
        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                .orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));
        return denuncia.getMensagens();
    }

    @Transactional(rollbackFor = Exception.class)
    public Mensagem enviar(UUID denunciaId, MensagemDto dto) {

        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                .orElseThrow(() -> new EntityNotFoundException("Denúncia não encontrada: " + denunciaId));

        Mensagem novaMensagem = new Mensagem();
        novaMensagem.setConteudo(dto.conteudo());
        novaMensagem.setDenunciaId(denuncia);

        return mensagemRepository.save(novaMensagem);
    }

    @Transactional(rollbackFor = Exception.class)
    public Mensagem statusUpdate(UUID denunciaId, String status) {
        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                .orElseThrow(() -> new EntityNotFoundException("Denúncia não encontrada: " + denunciaId));

        Mensagem novaMensagem = new Mensagem();

        novaMensagem.setConteudo("Status atualizado para: " + status);
        novaMensagem.setDenunciaId(denuncia);

        return mensagemRepository.save(novaMensagem);
    }
}
