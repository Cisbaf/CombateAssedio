package com.cisbaf.API_CanalDenuncias.Form.dto;

import lombok.Builder;

@Builder
public record OfensorDto(
        String nome,
        String email,
        String setor,
        String cargo
) {

}
