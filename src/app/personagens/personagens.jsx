'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

import CharacterCard from '@/components/CardPersonagem/CardPersonagem';
import CharacterModal from '@/components/ModalPersonagem/ModalPersonagem';

import styles from './personagens.module.css';

export default function Personagens() {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getCharacters() {
            try {
                setLoading(true);
                setError('');

                const response = await axios.get('https://hp-api.onrender.com/api/characters');
                setCharacters(response.data);
            } catch (error) {
                console.error(error);
                setError('Não foi possível carregar os personagens. Tente novamente.');
            } finally {
                setLoading(false);
            }
        }

        getCharacters();
    }, []);

    function handleFavorite(character) {
        const alreadyFavorite = favorites.some((favorite) => favorite.id === character.id);
        const nextFavorites = alreadyFavorite
            ? favorites.filter((favorite) => favorite.id !== character.id)
            : [...favorites, character];

        setFavorites(nextFavorites);
        toast.success(
            alreadyFavorite
                ? `${character.name} foi removido dos favoritos.`
                : `${character.name} foi adicionado aos favoritos!`,
        );
    }

    if (loading) {
        return (
            <main className={styles.container}>
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Consultando os arquivos de Hogwarts...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles.container}>
                <div className={styles.error}>
                    <h2>⚠️ Ocorreu um problema</h2>
                    <p>{error}</p>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <p>📜 Arquivos de Hogwarts</p>
                <h1>Personagens</h1>
                <span>{characters.length} personagens encontrados</span>
            </header>

            <section className={styles.grid}>
                {characters.map((character) => (
                    <CharacterCard
                        key={character.id}
                        character={character}
                        onSelect={setSelectedCharacter}
                        onFavorite={handleFavorite}
                        isFavorite={favorites.some((favorite) => favorite.id === character.id)}
                    />
                ))}
            </section>

            <CharacterModal
                character={selectedCharacter}
                onClose={() => setSelectedCharacter(null)}
            />

            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 2500,
                    style: {
                        background: '#1f2937',
                        color: '#fff',
                        borderRadius: '8px',
                    },
                }}
            />
        </main>
    );
}