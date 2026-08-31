import Image from 'next/image';
import Link from 'next/link';
import bannerImage from '../../public/images/banner.jpg';
import styles from './page.module.css';

export default function Home() {
    return (
        <main>
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <p className={styles.welcome}>Seja bem-vindo à WizardDex</p>
                    <h1>WizardDex</h1>
                    <p className={styles.textowelcome}>
                        Uma enciclopédia digital dos personagens do universo Harry Potter, criada
                        para explorar histórias, casas e curiosidades com uma interface moderna.
                    </p>
                    <Link href="/personagens" className={styles.bruxoButton}>
                        Explorar personagens
                    </Link>
                </div>
                <div className={styles.heroImageWrap}>
                    <Image
                        src={bannerImage}
                        alt="Capa de Hogwarts para a WizardDex"
                        className={styles.heroImage}
                        priority
                    />
                </div>
            </section>

            <section className={styles.bruxoSection}>
                <h2>Sobre a enciclopédia</h2>
                <p>
                    O WizardDex reúne informações sobre personagens, casas e curiosidades do mundo
                    mágico em uma experiência intuitiva e visualmente atrativa.
                </p>
            </section>

            <section className={styles.homeSection}>
                <h2>Objetivo</h2>
                <p>
                    O projeto consome uma API pública com Axios e aplica conceitos de Next.js, React
                    e componentização para entregar uma aplicação responsiva e funcional.
                </p>
            </section>

            <section className={styles.technology}>
                <h2>Tecnologias utilizadas</h2>
                <div className={styles.technologyGrid}>
                    <div>React</div>
                    <div>Next.js</div>
                    <div>Axios</div>
                    <div>CSS Modules</div>
                    <div>React Toastify</div>
                    <div>API Harry Potter</div>
                </div>
            </section>
        </main>
    );
}