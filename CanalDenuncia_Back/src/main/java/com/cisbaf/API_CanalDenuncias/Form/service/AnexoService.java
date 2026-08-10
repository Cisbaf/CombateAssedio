package com.cisbaf.API_CanalDenuncias.Form.service;

import java.nio.file.Files;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cisbaf.API_CanalDenuncias.Form.model.Anexo;
import com.cisbaf.API_CanalDenuncias.Form.model.Denuncia;
import com.cisbaf.API_CanalDenuncias.Form.repository.AnexoRepository;
import com.cisbaf.API_CanalDenuncias.Form.repository.DenunciaRepository;

import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.IOException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnexoService {
    
    private final AnexoRepository anexoRepository;
    private final DenunciaRepository denunciaRepository;


    @Value("${upload.dir}")
    private String uploadDir;

    @Value("${app.public-url}")
    private String baseUrl; 

    public Anexo salvarAnexo(UUID denunciaId, MultipartFile arquivo) throws IOException {

        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                .orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));

        String nomeUnico = UUID.randomUUID().toString() + "_" + arquivo.getOriginalFilename();

        Path pastaUpload = Paths.get(uploadDir);
        Files.createDirectories(pastaUpload);
        
        Path caminhoFinal = pastaUpload.resolve(nomeUnico);
        Files.copy(arquivo.getInputStream(), caminhoFinal);
        
        Anexo anexo = new Anexo();
        
        anexo.setNomeArquivo(arquivo.getOriginalFilename() != null ? arquivo.getOriginalFilename() : "arquivo");
        anexo.setUrlArquivo(baseUrl + "/api/uploads/" + nomeUnico);
        anexo.setTipoArquivo(arquivo.getContentType());
        anexo.setDenuncia(denuncia);

        return anexoRepository.save(anexo);
    }

    public List<Anexo> listarAnexos(UUID denunciaId) {
        return anexoRepository.findByDenunciaId(denunciaId);
    }
    
}