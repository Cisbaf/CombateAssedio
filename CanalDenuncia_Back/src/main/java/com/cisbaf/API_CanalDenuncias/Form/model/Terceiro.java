package com.cisbaf.API_CanalDenuncias.Form.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.util.UUID;

@Entity
@Table(name = "terceiros")
@Data
public class Terceiro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = true)
    private String nome;

    @Column(nullable = true)
    private Integer idade;

    @Column(nullable = true)
    private String cpf;

    @Column(nullable = true)
    private String telefone;

    @Column(nullable = true)
    private String email;
}
