package com.cisbaf.API_CanalDenuncias.Form.model;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
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
    @CPF(message = "CPF inválido")
    private String cpf;

    @Column(nullable = true)
    @Email(message = "Email inválido")
    private String email;

    @Column(nullable = true)
    private String telefone;

    @Column(nullable = true, name = "local_trabalho")
    private String localTrabalho;
}
