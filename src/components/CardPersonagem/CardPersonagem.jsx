"use client";

import Image from 'next/image';
import styles from './CardPersonagem.module.css';

export default function PersonagemCard({ character, onSelect, isFavorite, onFavorite }) {
    const personagem = character;

    return (
        <div className={styles.card}>
            <button
                className={`${styles.favorite} ${isFavorite ? styles.favoriteActive : ''}`}
                onClick={(event) => {
                    event.stopPropagation();
                    if (onFavorite) onFavorite(personagem);
                }}
                aria-label="Favoritar personagem"
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            <div onClick={() => onSelect && onSelect(personagem)} className={styles.clickArea}>
                <div className={styles.imageContainer}>
                    {personagem.image ? (
                        <Image
                            src={personagem.image}
                            alt={personagem.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 250px"
                            className={styles.image}
                        />
                    ) : (
                        <span>🧙</span>
                    )}
                </div>

                <div className={styles.content}>
                    <h2>{personagem.name}</h2>
                    <p>Casa: {personagem.house || 'Não informada'}</p>
                    <p>Ator/Atriz: {personagem.actor || 'Não informado'}</p>
                </div>
            </div>
        </div>
    );
}