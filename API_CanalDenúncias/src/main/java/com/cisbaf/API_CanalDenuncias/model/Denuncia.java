package com.cisbaf.API_CanalDenuncias.model;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "denuncias")
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // id personalizado
    private Long id;

    @Column(nullable = false, unique = true)
    private String protocolo;

    @Column(nullable = false)
    private String tipo_Denunciante;

    @Column(nullable = false)
    private Boolean isAnonimo;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDate data_Registro;

    @Column(nullable = false)
    private String status; // Pendente, Em investigação ou Resolvida

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "id_vitima", nullable = true)
    private Vitima vitima;

    @OneToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "id_ofensor", nullable = false)
    private Ofensor ofensor;

    @OneToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "id_relato", nullable = false)
    private Relato relato;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    @JoinColumn(name = "id_terceiro", nullable = true)
    private Terceiro terceiro;

}