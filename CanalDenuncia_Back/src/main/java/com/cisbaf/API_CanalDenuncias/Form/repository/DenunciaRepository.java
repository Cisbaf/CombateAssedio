package com.cisbaf.API_CanalDenuncias.Form.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cisbaf.API_CanalDenuncias.Form.model.Denuncia;
import java.util.UUID;

import com.cisbaf.API_CanalDenuncias.Form.model.enums.Status;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia, UUID> {
    
    Optional<Denuncia> findByProtocolo(String protocolo);
    List<Denuncia> findByStatus(Status status);
}
