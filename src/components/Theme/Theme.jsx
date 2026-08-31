'use client';

import { useEffect, useState } from 'react';

import styles from './Theme.module.css';

export default function ThemeToggle() {
    const [tema, setTema] = useState('light');

    useEffect(() => {
        const temaAtual =
            document.documentElement.classList.contains('dark')
                ? 'dark'
                : 'light';

        setTema(temaAtual);
    }, []);

    function alternarTema() {
        const novoTema = tema === 'light' ? 'dark' : 'light';

        document.cookie = `tema=${novoTema}; max-age=${60 * 60 * 24 * 30}; path=/`;
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(novoTema);

        // 🔄 Atualizar estado
        setTema(novoTema);

        console.log('🎨 Tema alterado para:', novoTema);
        console.log('🍪 Cookie tema atualizado');
    }

    return (
        <button
            className={styles.button}
            onClick={alternarTema}
            aria-label="Alterar tema"
        >
            {tema === 'light' ? '🌙 Escuro' : '☀️ Claro'}
        </button>
    );
}