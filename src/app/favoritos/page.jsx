
'use client';

import { useEffect, useState } from 'react';
import CharacterCard from '@/components/CardPersonagem/CardPersonagem';
import CharacterModal from '@/components/ModalPersonagem/ModalPersonagem';

import styles from './favoritos.module.css';

export default function Favoritos() {
    const [favorites, setFavorites] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    // 📖 Carregar favoritos do SessionStorage
    useEffect(() => {
        try {
            console.log('🚀 Carregando favoritos...');

            const favoritosSalvos = sessionStorage.getItem('favoritos');

            if (favoritosSalvos) {
                const dados = JSON.parse(favoritosSalvos);

                setFavorites(dados);

                console.log(
                    '📂 Favoritos encontrados:',
                    dados.length
                );
            } else {
                console.log('📭 Nenhum favorito encontrado');
            }
        } catch (error) {
            console.error(
                '❌ Erro ao carregar favoritos:',
                error.message
            );
        }
    }, []);

    // 🗑️ Remover favorito
    function handleFavorite(character) {
        const novosFavoritos = favorites.filter(
            (favorite) => favorite.id !== character.id
        );

        // 💾 Atualizar SessionStorage
        sessionStorage.setItem(
            'favoritos',
            JSON.stringify(novosFavoritos)
        );

        // 🔄 Atualizar a interface
        setFavorites(novosFavoritos);

        console.log(
            '🗑️ Favorito removido:',
            character.name
        );
    }

    return (
        <main className={styles.container}>

            <header className={styles.header}>
                <p>❤️ Sua coleção</p>

                <h1>Personagens Favoritos</h1>

                <span>
                    {favorites.length} favoritos
                </span>
            </header>

            {favorites.length === 0 ? (
                <section className={styles.empty}>
                    <div className={styles.emptyIcon}>
                        💔
                    </div>

                    <h2>Nenhum personagem foi favoritado.</h2>

                    <p>
                        Você ainda não possui personagens favoritos.
                    </p>

                    <a href="/personagens">
                        📚 Ver personagens
                    </a>
                </section>
            ) : (
                <section className={styles.grid}>
                    {favorites.map((character) => (
                        <CharacterCard
                            key={character.id}
                            character={character}
                            onSelect={setSelectedCharacter}
                            onFavorite={handleFavorite}
                            isFavorite={true}
                        />
                    ))}
                </section>
            )}

            <CharacterModal
                character={selectedCharacter}
                onClose={() => setSelectedCharacter(null)}
            />

        </main>
    );
}
