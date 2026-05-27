"use client";

import { useState, useEffect } from "react";
import type {RequestOfensor,ResponseOfensor } from "@/components/types";

export default function Home() {
  const [ofensores, setOfensores] = useState<ResponseOfensor[]>([]);

  const [nome, setNome] = useState("");
  const [localTrabalho, setLocalTrabalho] = useState("");
  const [mensagem, setMensagem] = useState("");

  const API_URL = "http://localhost:8080/api/ofensores";

  // Função para buscar a lista de ofensores da API (GET)
  const buscarOfensores = async () => {
    try {
      const resposta = await fetch(API_URL);
      if (resposta.ok) {
        const dados = await resposta.json();
        setOfensores(dados);
      } else {
        console.error("Erro ao buscar dados da API");
      }
    } catch (erro) {
      console.error("Erro na requisição GET:", erro);
    }
  };

  // Buscar dados ao carregar a página
  useEffect(() => {
    buscarOfensores();
  }, []);

  const dadosFormulario: RequestOfensor = {
    nome: nome,
    local_trabalho: localTrabalho,
  }


  // Enviar novo ofensor para a API (POST)
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if (!nome || !localTrabalho) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosFormulario),
      });

      if (resposta.ok) {
        setMensagem("Cadastrado com sucesso!");
        setNome("");
        setLocalTrabalho("");
        buscarOfensores(); // Atualiza a lista
      } else {
        setMensagem("Erro ao cadastrar.");
      }
    } catch (erro) {
      console.error("Erro na requisição POST:", erro);
      setMensagem("Erro de conexão com a API.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }}>

     

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            placeholder="Nome do acusado"
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Local de Trabalho:</label>
          <input
            type="text"
            value={localTrabalho}
            onChange={(e) => setLocalTrabalho(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            placeholder="Ex: Departamento de TI"
          />
        </div>

        <button type="submit" style={{ padding: "10px", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Cadastrar Ofensor (POST)
        </button>
      </form>

      {mensagem && (
        <p style={{ padding: "10px", backgroundColor: "#f0f0f0", borderLeft: "4px solid #0070f3", margin: "10px 0" }}>
          {mensagem}
        </p>
      )}

      {/* Lista vinda da API */}
      <h3>Ofensores Cadastrados (GET)</h3>
      {ofensores.length === 0 ? (
        <p>Nenhum ofensor cadastrado ou API offline.</p>
      ) : (
        <ul style={{ paddingLeft: "20px" }}>
          {ofensores.map((o) => (
            <li key={o.id} style={{ marginBottom: "10px" }}>
              <strong>{o.nome}</strong> - {o.local_trabalho} <span style={{ color: "#888", fontSize: "0.8em" }}>(ID: #{o.id})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
