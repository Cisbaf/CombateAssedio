package com.cisbaf.API_CanalDenuncias.Form.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cisbaf.API_CanalDenuncias.Form.model.Mensagem;

public interface MensagemRepository extends JpaRepository<Mensagem, UUID> {
}
