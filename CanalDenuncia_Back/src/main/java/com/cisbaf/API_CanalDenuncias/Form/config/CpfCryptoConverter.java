package com.cisbaf.API_CanalDenuncias.Form.config;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import jakarta.annotation.PostConstruct;

@Converter
@Component
public class CpfCryptoConverter implements AttributeConverter<String, String> {

    @Value("${canal.crypto.secret}")
    private String encryptionKey;

    @Value("${canal.crypto.salt}")
    private String saltHexadecimal;

    private TextEncryptor cifrador;

    @PostConstruct
    public void init() {
        this.cifrador = Encryptors.text(encryptionKey, saltHexadecimal);
    }

    @Override
    public String convertToDatabaseColumn(String cpf) {
        if (cpf == null || cpf.isBlank()) {
            return cpf;
        }
        try {
            return cifrador.encrypt(cpf);
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao criptografar CPF", e);
        }
    }

    @Override
    public String convertToEntityAttribute(String dbValue) {
        if (dbValue == null || dbValue.isBlank()) {
            return dbValue;
        }
        try {
            return cifrador.decrypt(dbValue);
        } catch (Exception e) {
            return dbValue;
        }
    }
}
