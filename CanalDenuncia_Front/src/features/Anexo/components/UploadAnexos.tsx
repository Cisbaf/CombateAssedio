// src/features/denuncia/components/UploadAnexos.tsx
import React, { useState } from "react";

interface Anexo {
  id: string;
  nomeArquivo: string;
  urlArquivo: string;
  tipoArquivo: string;
}

export function UploadAnexos() {
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [anexosEnviados, setAnexosEnviados] = useState<Anexo[]>([]);

  function handleSelecionarArquivos(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setArquivos(Array.from(e.target.files));
    }
  }

  return (
    <div style={{ margin: "10px", padding: "10px", border: "1px solid black" }}>
      <h3>Anexar Arquivos</h3>

      {/* Input de arquivo — aceita imagens e PDFs */}
      <input
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={handleSelecionarArquivos}
        style={{ margin: "10px", padding: "10px", border: "1px solid black" }}
      />

      {/* Preview dos arquivos selecionados */}
      {arquivos.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            margin: "10px",
            padding: "10px",
            border: "1px solid black",
          }}
        >
          {arquivos.map((f, i) => (
            <li key={i}>
              {f.name} ({(f.size / 1024).toFixed(1)} KB)
            </li>
          ))}
        </ul>
      )}

      {/* Lista dos arquivos já enviados */}
      {anexosEnviados.length > 0 && (
        <div>
          <h4>Arquivos Enviados:</h4>
          {anexosEnviados.map((a) => (
            <div key={a.id}>
              {a.tipoArquivo.startsWith("image/") ? (
                // Se for imagem, mostra preview
                <img src={a.urlArquivo} alt={a.nomeArquivo} width={200} />
              ) : (
                // Se for PDF ou outro, mostra link
                <a href={a.urlArquivo} target="_blank" rel="noreferrer">
                  📄 {a.nomeArquivo}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
