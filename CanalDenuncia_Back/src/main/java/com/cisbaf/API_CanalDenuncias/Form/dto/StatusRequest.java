package com.cisbaf.API_CanalDenuncias.Form.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record StatusRequest(
    @NotBlank @Enumerated(EnumType.STRING) String status
) {}
