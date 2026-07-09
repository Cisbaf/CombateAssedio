package com.cisbaf.API_CanalDenuncias.Form.model;

import com.cisbaf.API_CanalDenuncias.Form.config.CpfCryptoConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.util.UUID;

@Entity
@Data
@Table(name = "vitimas")
public class Vitima {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)     
    private UUID id;

    @Column(nullable = true)
    private String nome;

    @Column(nullable = true)
    private Integer idade;

    @Column(nullable = true)
    @Convert(converter = CpfCryptoConverter.class)
    private String cpf;

    @Column(nullable = true)
    private String email;

    @Column(nullable = true)
    private String telefone;

    @Column(nullable = true, name = "local_trabalho")
    private String localTrabalho;
}
