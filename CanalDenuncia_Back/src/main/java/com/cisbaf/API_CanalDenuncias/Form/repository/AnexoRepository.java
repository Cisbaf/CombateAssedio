package com.cisbaf.API_CanalDenuncias.Form.repository;

import java.util.UUID;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cisbaf.API_CanalDenuncias.Form.model.Anexo;

public interface AnexoRepository extends JpaRepository<Anexo, UUID> {
    List<Anexo> findByDenunciaId(UUID denunciaId);
}
