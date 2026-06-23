package com.cisbaf.API_CanalDenuncias.Form.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.cisbaf.API_CanalDenuncias.Form.dto.MensagemDto;
import com.cisbaf.API_CanalDenuncias.Form.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.Form.model.Mensagem;
import com.cisbaf.API_CanalDenuncias.Form.repository.DenunciaRepository;
import com.cisbaf.API_CanalDenuncias.Form.repository.MensagemRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MensagemService {

    private final MensagemRepository mensagemRepository;
    private final DenunciaRepository denunciaRepository;

    public List<Mensagem> listarMensagensPorDenuncia(UUID denunciaId) {
        return mensagemRepository.findByDenunciaIdOrderByDataEnvioAsc(denunciaId);
    }

    @Transactional
    public Mensagem enviar(UUID denunciaId, MensagemDto dto){
        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                            .orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));

        Mensagem novaMensagem = Mensagem.builder()
                .conteudo(dto.conteudo())
                .is_admin(dto.is_admin())
                .denuncia(denuncia)
                .build();

        return mensagemRepository.save(novaMensagem);
    }
}
