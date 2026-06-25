package com.cisbaf.API_CanalDenuncias.Form.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record StatusRequest(@Enumerated(EnumType.STRING) String status) {

}
