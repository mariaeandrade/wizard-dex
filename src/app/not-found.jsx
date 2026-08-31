import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <main className={styles.notFound}>
            <div>
                <span>🪄</span>
                <h1>404</h1>
                <h2>Essa página desapareceu!</h2>
                <p>Parece que você lançou um feitiço e a página não foi encontrada.</p>
                <Link href="/" className={styles.homeButton}>
                    Voltar para a Home
                </Link>
            </div>
        </main>
    );
}