package com.cisbaf.API_CanalDenuncias.Form.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.cisbaf.API_CanalDenuncias.Form.model.Mensagem;

@Repository
public interface MensagemRepository extends JpaRepository<Mensagem, UUID> {

}