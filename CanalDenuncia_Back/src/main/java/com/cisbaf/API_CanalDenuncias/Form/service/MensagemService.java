package com.cisbaf.API_CanalDenuncias.Form.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.cisbaf.API_CanalDenuncias.Form.dto.MensagemDto;
import com.cisbaf.API_CanalDenuncias.Form.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.Form.model.Mensagem;
import com.cisbaf.API_CanalDenuncias.Form.repository.DenunciaRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MensagemService {

    private final DenunciaRepository denunciaRepository;

    public List<Mensagem> listarMensagensPorDenuncia(UUID denunciaId) {
        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                .orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));
        return denuncia.getMensagens();
    }

    @Transactional
    public Mensagem enviar(UUID denunciaId, MensagemDto dto){
        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                            .orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));

        Mensagem novaMensagem = new Mensagem();
        novaMensagem.setConteudo(dto.conteudo());
        
        denuncia.getMensagens().add(novaMensagem);
        Denuncia savedDenuncia = denunciaRepository.saveAndFlush(denuncia);

        // Pega a mensagem gerenciada pelo JPA, que já contém o ID gerado pelo banco
        return savedDenuncia.getMensagens().get(savedDenuncia.getMensagens().size() - 1);
    }
}
