package com.cisbaf.API_CanalDenuncias.Form.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cisbaf.API_CanalDenuncias.Form.model.Mensagem;

public interface MensagemRepository extends JpaRepository<Mensagem, UUID> {
    List<Mensagem> findByDenunciaIdOrderByDataEnvioAsc(UUID denunciaId);
}
