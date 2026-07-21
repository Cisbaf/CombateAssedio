package com.cisbaf.API_CanalDenuncias.Form.dto;

import com.cisbaf.API_CanalDenuncias.Form.model.Ofensor;
import com.cisbaf.API_CanalDenuncias.Form.model.Relato;
import com.cisbaf.API_CanalDenuncias.Form.model.Terceiro;
import com.cisbaf.API_CanalDenuncias.Form.model.Vitima;
import com.cisbaf.API_CanalDenuncias.Form.model.enums.TipoDenunciante;

public record DenunciaRequest(

    TipoDenunciante tipoDenunciante,
    Boolean isAnonimo,
    Vitima vitima,
    Terceiro terceiro,
    Ofensor ofensor,
    Relato relato
) {
    
} 
