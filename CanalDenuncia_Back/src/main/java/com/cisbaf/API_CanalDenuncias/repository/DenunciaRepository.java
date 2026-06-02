package com.cisbaf.API_CanalDenuncias.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cisbaf.API_CanalDenuncias.model.Denuncia;
import java.util.UUID;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia, UUID> {
    
    Optional<Denuncia> findByProtocolo(String protocolo);

    List<Denuncia> findByStatus(String status);
}
