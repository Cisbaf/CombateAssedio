package com.cisbaf.API_CanalDenuncias.Form.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "relatos")
@Data
public class Relato {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String categoria;

    @Column(nullable = true)
    private String descricao;

    @Column(nullable = false, name = "estado_emocional")
    private String estadoEmocional;

    @Column(nullable = false, name = "data_ocorrido")
    private LocalDate dataOcorrido;

    @Column(nullable = false, name = "horario_ocorrido")
    private LocalTime horarioOcorrido;

    @Column(nullable = false, name = "local_ocorrido")
    private String localOcorrido;
    
}
