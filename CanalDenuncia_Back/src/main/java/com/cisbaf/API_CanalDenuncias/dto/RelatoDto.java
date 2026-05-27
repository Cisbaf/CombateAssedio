package com.cisbaf.API_CanalDenuncias.dto;

import lombok.Builder;

@Builder
public record RelatoDto(
    String categoriaAssedio,
    String tipoRelato,
    String relato,
    String data
) {
    
}
