package com.cisbaf.API_CanalDenuncias.Form.dto;

import jakarta.validation.constraints.NotBlank;


public record MensagemDto (
    @NotBlank String conteudo
) {}
