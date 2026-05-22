package com.cisbaf.API_CanalDenuncias.dto;

import lombok.Builder;

@Builder
public record TerceiroDto (

    String nome,
    Integer idade,
    String cpf,
    String telefone,
    String email
){
    
}
