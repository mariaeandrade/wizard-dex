"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PersonagemCard from "@/components/CardPersonagem/CardPersonagem";
import styles from "./page.module.css";

export default function PersonagensPage() {
  const [personagens, setPersonagens] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarApenasFavoritos, setMostrarApenasFavoritos] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const localData = localStorage.getItem("favoritos");
        const sessionData = sessionStorage.getItem("favoritos");
        const salvos = localData || sessionData;

        if (salvos && salvos !== "undefined") {
          const parsed = JSON.parse(salvos);
          if (Array.isArray(parsed)) {
            setFavoritos(parsed);
          }
        }
      } catch (error) {
        console.error("Erro ao ler do storage:", error);
      }
    }
  }, []);

  useEffect(() => {
    async function buscarPersonagens() {
      try {
        setLoading(true);
        const resposta = await axios.get("https://hp-api.onrender.com/api/characters");
        setPersonagens(resposta.data.slice(0, 24));
      } catch (error) {
        console.error("Erro ao buscar personagens na API:", error);
      } finally {
        setLoading(false);
      }
    }
    buscarPersonagens();
  }, []);

  // 3. Função de favoritar direta com gravação forçada
  const handleToggleFavorite = (personagem) => {
    if (!personagem) return;

    // Define uma chave única garantida
    const idUnico = personagem.id || personagem.name;

    setFavoritos((prevFavoritos) => {
      const jaExiste = prevFavoritos.some((fav) => (fav.id || fav.name) === idUnico);
      
      let novaLista;
      if (jaExiste) {
        novaLista = prevFavoritos.filter((fav) => (fav.id || fav.name) !== idUnico);
      } else {
        novaLista = [...prevFavoritos, personagem];
      }

      // Gravando no Storage com tratamento de erro
      if (typeof window !== "undefined") {
        try {
          const stringified = JSON.stringify(novaLista);
          localStorage.setItem("favoritos", stringified);
          sessionStorage.setItem("favoritos", stringified);
          console.log("💾 Gravação no Storage realizada:", novaLista.length, "itens");
        } catch (e) {
          console.error("Erro ao salvar no Storage:", e);
        }
      }

      return novaLista;
    });
  };

  const listaExibida = mostrarApenasFavoritos ? favoritos : personagens;

  if (loading) return <p className={styles.loading}>Carregando personagens...</p>;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Personagens do Universo Bruxo</h1>

        <button
          className={styles.filterButton}
          onClick={() => setMostrarApenasFavoritos(!mostrarApenasFavoritos)}
        >
          {mostrarApenasFavoritos
            ? "Ver Todos os Personagens"
            : `Ver Meus Favoritos (${favoritos.length})`}
        </button>
      </header>

      {listaExibida.length === 0 ? (
        <div className={styles.emptyState}>
          <p>
            {mostrarApenasFavoritos
              ? "🧙‍♂️ Nenhum personagem foi favoritado ainda. Clique no coração de algum card!"
              : "Nenhum personagem encontrado."}
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {listaExibida.map((personagem) => {
            const idUnico = personagem.id || personagem.name;
            const isFav = favoritos.some((fav) => (fav.id || fav.name) === idUnico);

            return (
              <PersonagemCard
                key={idUnico}
                character={personagem}
                isFavorite={isFav}
                onFavorite={handleToggleFavorite}
                onSelect={(p) => console.log("Selecionou:", p.name)}
              />
            );
          })}
        </div>
      )}
    </main>
  );
}