package com.cisbaf.API_CanalDenuncias.Auth.config;

import com.cisbaf.API_CanalDenuncias.Auth.service.jwt.JwtRequestFilter;

import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtRequestFilter jwtRequestFilter;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth


                        // ==========================

                        // ADMIN CONTROLLER

                        // ==========================

                        .requestMatchers(HttpMethod.GET, "/auth/{username}").authenticated()

                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/logout").permitAll()


                        // ==========================

                        // FORM CONTROLLER

                        // ==========================

                        .requestMatchers(HttpMethod.GET, "/form/denuncias").authenticated()

                        .requestMatchers(HttpMethod.GET, "/form/denuncias/{id}").authenticated()

                        .requestMatchers(HttpMethod.GET, "/form/denuncias/protocolo/{protocolo}").permitAll()

                        .requestMatchers(HttpMethod.POST, "/form/denuncias").permitAll()

                        .requestMatchers(HttpMethod.GET, "/form/mensagens/{denunciaId}").authenticated()
                        
                        .requestMatchers(HttpMethod.POST, "/form/mensagens/{denunciaId}").authenticated()

                        .requestMatchers(HttpMethod.PUT, "/form/denuncias/atualizarStatus/{id}").authenticated()
                        
                        .requestMatchers(HttpMethod.POST, "/form/denuncias/{denunciaId}/anexos").permitAll()
                        
                        .requestMatchers(HttpMethod.GET, "/form/denuncias/{denunciaId}/anexos").authenticated()

                        .requestMatchers(HttpMethod.GET, "/uploads/**").authenticated()

                        
                        // ==========================

                        // SWAGGER UI

                        // ==========================

                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()

                )
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) {
        return authenticationConfiguration.getAuthenticationManager();
    }
}