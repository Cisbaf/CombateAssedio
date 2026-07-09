package com.cisbaf.API_CanalDenuncias.Form.config;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * Converter JPA que criptografa o CPF com AES-256-CBC antes de salvar no banco
 * e descriptografa automaticamente ao carregar a entidade.
 *
 * A chave é lida da propriedade {@code cpf.encryption.key} (32 caracteres = 256 bits).
 * O IV (vetor de inicialização) é armazenado junto ao valor cifrado, separado por ":".
 *
 * Formato no banco: Base64(IV) : Base64(ciphertext)
 */
@Converter
@Component
public class CpfCryptoConverter implements AttributeConverter<String, String> {

    private static final String ALGORITHM = "AES/CBC/PKCS5Padding";

    /**
     * Chave AES-256: deve ter exatamente 32 caracteres ASCII.
     * Configure via variável de ambiente CPF_ENCRYPTION_KEY ou no application.properties.
     */
    @Value("${cpf.encryption.key}")
    private String encryptionKey;

    // -------------------------------------------------------------------------
    // Escrita no banco: plaintext → ciphertext
    // -------------------------------------------------------------------------

    @Override
    public String convertToDatabaseColumn(String cpf) {
        if (cpf == null || cpf.isBlank()) {
            return cpf;
        }
        try {
            SecretKeySpec secretKey = buildKey();
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);

            byte[] iv         = cipher.getIV();
            byte[] encrypted  = cipher.doFinal(cpf.getBytes(StandardCharsets.UTF_8));

            String ivB64        = Base64.getEncoder().encodeToString(iv);
            String cipherB64    = Base64.getEncoder().encodeToString(encrypted);

            return ivB64 + ":" + cipherB64;
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao criptografar CPF", e);
        }
    }

    // -------------------------------------------------------------------------
    // Leitura do banco: ciphertext → plaintext
    // -------------------------------------------------------------------------

    @Override
    public String convertToEntityAttribute(String dbValue) {
        if (dbValue == null || dbValue.isBlank()) {
            return dbValue;
        }
        try {
            String[] parts = dbValue.split(":");
            if (parts.length != 2) {
                // Valor já está em plaintext (dados legados sem criptografia)
                return dbValue;
            }

            byte[] iv        = Base64.getDecoder().decode(parts[0]);
            byte[] encrypted = Base64.getDecoder().decode(parts[1]);

            SecretKeySpec secretKey = buildKey();
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey, new IvParameterSpec(iv));

            byte[] decrypted = cipher.doFinal(encrypted);
            return new String(decrypted, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao descriptografar CPF", e);
        }
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    private SecretKeySpec buildKey() {
        byte[] keyBytes = encryptionKey.getBytes(StandardCharsets.UTF_8);
        if (keyBytes.length != 32) {
            throw new IllegalArgumentException(
                "A propriedade 'cpf.encryption.key' deve ter exatamente 32 caracteres (AES-256). " +
                "Tamanho atual: " + keyBytes.length
            );
        }
        return new SecretKeySpec(keyBytes, "AES");
    }
}
