package com.cisbaf.API_CanalDenuncias.Form.model;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import com.cisbaf.API_CanalDenuncias.Form.model.enums.TipoDenunciante;

import com.cisbaf.API_CanalDenuncias.Form.model.enums.Status;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "denuncias")
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String protocolo;

    @Column(nullable = false, name = "tipo_denunciante")
    @Enumerated(EnumType.STRING)
    private TipoDenunciante tipoDenunciante;

    @Column(nullable = false, name = "is_anonimo")
    private Boolean isAnonimo;

    @CreationTimestamp
    @Column(nullable = false, updatable = false, name = "data_registro")
    private LocalDate dataRegistro;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "denuncia_id", nullable = true)
    @jakarta.persistence.OrderBy("dataEnvio ASC")
    private List<Mensagem> mensagens = new java.util.ArrayList<>();


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Denuncia)) return false;
        Denuncia other = (Denuncia) o;
        return protocolo != null && protocolo.equals(other.protocolo);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
}
}