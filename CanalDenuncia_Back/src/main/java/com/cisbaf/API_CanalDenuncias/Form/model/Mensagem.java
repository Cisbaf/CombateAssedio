package com.cisbaf.API_CanalDenuncias.Form.model;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Builder
@Entity
@Data
@Table(name = "mensagens")
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Lob
    @Column(nullable = false)
    private String conteudo;

    @Column(nullable = false, name = "is_admin")
    private Boolean is_admin;

    @Column(nullable = false, updatable = false, name = "data_envio")
    private LocalDateTime dataEnvio;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "id_denuncia", nullable = false)
    private Denuncia denuncia;


    @PrePersist
    public void preencherDataEnvio(){
        if(dataEnvio == null){
            this.dataEnvio = LocalDateTime.now();
        }
    }
}
