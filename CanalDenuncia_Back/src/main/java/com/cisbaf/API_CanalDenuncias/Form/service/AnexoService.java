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


    // Vem do application.properties — pasta onde os arquivos ficam no container
    @Value("${upload.dir:/uploads}")
    private String uploadDir;

    // URL base para acessar os arquivos (ex: http://localhost:8080)
    @Value("${app.base-url:http://localhost:8080}")
    private String baseUrl; 

    public Anexo salvarAnexo(UUID denunciaId, MultipartFile arquivo) throws IOException {

        // 1. Busca a denúncia
        Denuncia denuncia = denunciaRepository.findById(denunciaId)
                .orElseThrow(() -> new RuntimeException("Denúncia não encontrada"));

        // 2. Gera um nome único para evitar conflitos (UUID + nome original)
        String nomeUnico = UUID.randomUUID() + "_" + arquivo.getOriginalFilename();

        // 3. Garante que a pasta de upload existe
        Path pastaUpload = Paths.get(uploadDir);
        Files.createDirectories(pastaUpload);
        
        // 4. Salva o arquivo físico na pasta
        Path caminhoFinal = pastaUpload.resolve(nomeUnico);
        Files.copy(arquivo.getInputStream(), caminhoFinal);
        
        // 5. Cria o registro no banco — só salva o NOME, não o caminho absoluto
        Anexo anexo = new Anexo();
        
        anexo.setNomeArquivo(nomeUnico);
        anexo.setUrlArquivo(baseUrl + "/uploads/" + nomeUnico); // URL pública
        anexo.setTipoArquivo(arquivo.getContentType());
        anexo.setDenuncia(denuncia);

        return anexoRepository.save(anexo);
    }

    public List<Anexo> listarAnexos(UUID denunciaId) {
        return anexoRepository.findByDenunciaId(denunciaId);
    }
    
}