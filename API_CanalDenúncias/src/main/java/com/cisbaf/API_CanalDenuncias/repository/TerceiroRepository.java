package com.cisbaf.API_CanalDenuncias.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cisbaf.API_CanalDenuncias.model.Terceiro;
import java.util.UUID;

@Repository
public interface TerceiroRepository extends JpaRepository<Terceiro,UUID> {

}
