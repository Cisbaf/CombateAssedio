package com.cisbaf.API_CanalDenuncias.Form.utils;

import org.springframework.stereotype.Component;

@Component
public class Utils {

    public String StringStatus(String status){
        if(status.equals("PENDENTE")){
            return "Pendente";
        }else if(status.equals("EM_INVESTIGACAO")){
            return "Em Investigação";
        }else if(status.equals("RESOLVIDA")){
            return "Resolvida";
        }else{
            return "";
        }
    }
}
