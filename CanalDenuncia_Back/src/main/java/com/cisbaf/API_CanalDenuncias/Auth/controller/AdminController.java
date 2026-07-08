package com.cisbaf.API_CanalDenuncias.Auth.controller;

import com.cisbaf.API_CanalDenuncias.Auth.dto.LoginRequest;
import com.cisbaf.API_CanalDenuncias.Auth.dto.LoginResponse;
import com.cisbaf.API_CanalDenuncias.Auth.model.Admin;
import com.cisbaf.API_CanalDenuncias.Auth.service.AdminService;
import com.cisbaf.API_CanalDenuncias.Auth.service.jwt.JwtRequestFilter;
import com.cisbaf.API_CanalDenuncias.Auth.service.jwt.JwtTokenUtil;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final JwtTokenUtil jwtTokenUtil;
    private final JwtRequestFilter jwtRequestFilter;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest, HttpServletResponse response) {
        try {
            Admin admin = adminService.buscarAdminPorUsername(loginRequest.username());
            if (passwordEncoder.matches(loginRequest.password(), admin.getPassword())) {
                String token = jwtTokenUtil.generateToken(admin.getUsername(), "admin");
                jwtRequestFilter.setCookie(response, JwtRequestFilter.JWT_AUTH_COOKIE_NAME, token);

                LoginResponse loginResponse = new LoginResponse(admin.getId().toString(), admin.getUsername());
                return ResponseEntity.ok(loginResponse);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos.");
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos.");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<LoginResponse> me(Authentication authentication) {
        try {
            Admin admin = adminService.buscarAdminPorUsername(authentication.getName());
            LoginResponse loginResponse = new LoginResponse(admin.getId().toString(), admin.getUsername());
            return ResponseEntity.ok(loginResponse);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        jwtRequestFilter.removeCookie(response, JwtRequestFilter.JWT_AUTH_COOKIE_NAME);
        return ResponseEntity.ok("Logout realizado com sucesso.");
    }
}
