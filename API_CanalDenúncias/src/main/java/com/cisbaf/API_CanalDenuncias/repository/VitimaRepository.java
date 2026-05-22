package com.cisbaf.API_CanalDenuncias.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cisbaf.API_CanalDenuncias.model.Vitima;

@Repository
public interface VitimaRepository extends JpaRepository<Vitima, Long> {

}
