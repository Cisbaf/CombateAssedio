package com.cisbaf.API_CanalDenuncias.Auth.service.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@Getter
public class JwtTokenUtil {
    @Value("${jwt.secret}")
    String secretKey;
    @Value("${jwt.expiration}")
    long expirationTime;

    private SecretKey signingKey;

    @PostConstruct
    private void init() {
        byte[] keyBytes;
        try {
            // Tenta decodificar como Base64
            keyBytes = Decoders.BASE64.decode(secretKey);
        } catch (Exception e) {
            // Se falhar (ex: contém hifens por ser um UUID ou texto simples), pega os bytes diretamente
            keyBytes = secretKey.getBytes(java.nio.charset.StandardCharsets.UTF_8);
        }
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username, String base) {
        if (username == null || username.isEmpty())  {
            throw new IllegalArgumentException("Invalid username");
        }
        return Jwts.builder()
                .subject(username)
                .claim("base", base)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime * 1000))
                .signWith(signingKey)
                .compact();
    }

    private Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    public boolean validateToken(String token) {
        try {
            getClaimsFromToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}