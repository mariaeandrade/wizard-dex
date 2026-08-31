import styles from './sobre.module.css';

export default function Sobre() {
    const integrantes = ['Ana Clara Cremasco Luiz', 'Maria Eduarda de Andrade'];
    const professores = ['Thiago', 'Marcelo'];

    return (
        <main className={styles.container}>
            <section className={styles.header}>
                <p>Conheça o projeto</p>
                <h1>Sobre a WizardDex</h1>
            </section>

            <section className={styles.card}>
                <h2>Informações da turma</h2>
                <div className={styles.info}>
                    <p>
                        <strong>Turma:</strong> 2TDS1
                    </p>
                    <p>
                        <strong>Curso:</strong> Desenvolvimento de Sistemas
                    </p>
                    <p>
                        <strong>Professor(es):</strong> {professores.join(', ')}
                    </p>
                </div>
            </section>

            <section className={styles.card}>
                <h2> Integrantes</h2>
                <ul>
                    {integrantes.map((integrante, index) => (
                        <li key={index}>{integrante}</li>
                    ))}
                </ul>
            </section>

            <section className={styles.card}>
                <h2>Sobre o desenvolvimento</h2>
                <p>
                    A WizardDex é um projeto acadêmico desenvolvido com Next.js, React, Axios e CSS.
                    A aplicação consome uma API pública para apresentar informações dos personagens
                    do universo Harry Potter de forma moderna e interativa.
                </p>
            </section>
        </main>
    );
}