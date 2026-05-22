package com.cisbaf.API_CanalDenuncias.dto;

import lombok.Builder;


@Builder
public record DenunciaDto(
        String nome,
        String telefone,
        String email,
        String tipoRelato,
        String categoriaAssedio,
        String relato,
        String data
) {

}
