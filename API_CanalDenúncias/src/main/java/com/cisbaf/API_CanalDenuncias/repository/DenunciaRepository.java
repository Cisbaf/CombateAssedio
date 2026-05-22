package com.cisbaf.API_CanalDenuncias.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cisbaf.API_CanalDenuncias.model.Denuncia;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {
    
    Optional<Denuncia> findByProtocolo(String protocolo);

    Optional<List<Denuncia>> findByStatus(String status);
}
