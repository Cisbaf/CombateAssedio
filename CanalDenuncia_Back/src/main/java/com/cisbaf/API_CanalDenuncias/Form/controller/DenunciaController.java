package com.cisbaf.API_CanalDenuncias.Form.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cisbaf.API_CanalDenuncias.Form.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.Form.service.DenunciaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/form/denuncias")
@RequiredArgsConstructor
@Tag(name = "Denúncias", description = "Endpoints para gerenciamento de denúncias")
public class DenunciaController {

    private final DenunciaService denunciaService;

    @PostMapping
    @Operation(summary = "Cria uma nova denúncia", description = "Registra uma denúncia no sistema e gera um protocolo.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Denúncia criada com sucesso", content = @Content(schema = @Schema(implementation = Denuncia.class))),
            @ApiResponse(responseCode = "400", description = "Dados da denúncia inválidos", content = @Content(schema = @Schema(implementation = com.cisbaf.API_CanalDenuncias.Form.infra.GlobalExceptionHandler.ValidationErrorResponse.class)))
    })
    public ResponseEntity<Denuncia> criarDenuncia(@RequestBody @Valid Denuncia denuncia) {
        Denuncia savedDenuncia = denunciaService.criarDenuncia(denuncia);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedDenuncia.getId())
                .toUri();
        return ResponseEntity.created(uri).body(savedDenuncia);
    }

    @GetMapping
    @Operation(summary = "Lista todas as denúncias", description = "Retorna uma lista com todas as denúncias cadastradas (requer autenticação).")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
            @ApiResponse(responseCode = "401", description = "Não autorizado")
    })
    public ResponseEntity<List<Denuncia>> getAllDenuncias() {
        List<Denuncia> denuncias = denunciaService.getAllDenuncias();
        return ResponseEntity.ok(denuncias);
    }

    @GetMapping("/protocolo/{protocolo}")
    @Operation(summary = "Busca uma denúncia por protocolo", description = "Busca os detalhes de uma denúncia específica pelo número de protocolo.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Denúncia encontrada", content = @Content(schema = @Schema(implementation = Denuncia.class))),
            @ApiResponse(responseCode = "404", description = "Denúncia não encontrada com o protocolo fornecido")
    })
    public ResponseEntity<Denuncia> getDenunciaByProtocolo(@PathVariable String protocolo) {
        return denunciaService.getDenunciaByProtocolo(protocolo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca uma denúncia por ID", description = "Busca os detalhes de uma denúncia específica pelo seu ID (requer autenticação).")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Denúncia encontrada", content = @Content(schema = @Schema(implementation = Denuncia.class))),
        @ApiResponse(responseCode = "401", description = "Não autorizado"),
        @ApiResponse(responseCode = "404", description = "Denúncia não encontrada com o ID fornecido")
    })
    public ResponseEntity<Denuncia> getDenunciaByCodigo(@PathVariable UUID id) {
        return denunciaService.getDenunciaByCodigo(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
