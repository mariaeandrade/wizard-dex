import Image from 'next/image';
import styles from './ModalPersonagem.module.css';

export default function PersonagemModal({ character, onClose }) {
    const personagem = character;

    if (!personagem) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
                <button className={styles.close} onClick={onClose}>
                    ✕
                </button>

                <div className={styles.imageContainer}>
                    {personagem.image ? (
                        <Image
                            src={personagem.image}
                            alt={personagem.name}
                            fill
                            sizes="300px"
                            className={styles.image}
                        />
                    ) : (
                        <span>🧙</span>
                    )}
                </div>

                <div className={styles.content}>
                    <h2>{personagem.name}</h2>

                    <div className={styles.info}>
                        <p>
                            <strong>Casa:</strong> {personagem.house || 'Não informada'}
                        </p>
                        <p>
                            <strong>Espécie:</strong> {personagem.species || 'Não informada'}
                        </p>
                        <p>
                            <strong>Patrono:</strong> {personagem.patronus || 'Não informado'}
                        </p>
                        <p>
                            <strong>Nascimento:</strong> {personagem.dateOfBirth || 'Não informado'}
                        </p>
                        <p>
                            <strong>Olhos:</strong> {personagem.eyeColour || 'Não informado'}
                        </p>
                        <p>
                            <strong>Cabelo:</strong> {personagem.hairColour || 'Não informado'}
                        </p>
                        <p>
                            <strong>Ator/Atriz:</strong> {personagem.actor || 'Não informado'}
                        </p>
                        <p>
                            <strong>Situação:</strong>{' '}
                            {personagem.alive ? 'Vivo(a)' : 'Falecido(a)'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}