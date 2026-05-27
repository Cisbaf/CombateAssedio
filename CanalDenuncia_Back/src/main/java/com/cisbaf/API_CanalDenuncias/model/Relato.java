package com.cisbaf.API_CanalDenuncias.model;

import java.time.LocalDate;

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

    @Column(nullable = false)
    private String estado_emocional;

    @Column(nullable = false)
    private Boolean testemunhas;

    @Column(nullable = true)
    private Integer numero_testemunhas;

    @Column(nullable = true)
    private String nomes_testemunha;

    @Column(nullable = false)
    private LocalDate data_ocorrido;

    @Column(nullable = false)
    private String ocorrencia_local;

    @Column(nullable = false)
    private Boolean evidencias;

    @Column(nullable = true)
    private String tipo_evidencias;



    
}
