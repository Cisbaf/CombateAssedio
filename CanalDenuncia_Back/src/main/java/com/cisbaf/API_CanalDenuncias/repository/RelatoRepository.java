package com.cisbaf.API_CanalDenuncias.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cisbaf.API_CanalDenuncias.model.Relato;
import java.util.UUID;

@Repository
public interface RelatoRepository extends JpaRepository<Relato, UUID> {

}
