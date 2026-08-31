'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';
import ThemeToggle from '@/components/Theme/Theme';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                🪄 Wizard<span>Dex</span>
            </Link>

            <button
                className={styles.menuButton}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
                <Link href="/" onClick={() => setMenuOpen(false)}>
                    Home
                </Link>

                <Link href="/personagens" onClick={() => setMenuOpen(false)}>
                    Personagens
                </Link>

                <Link href="/sobre" onClick={() => setMenuOpen(false)}>
                    Sobre
                </Link>

                <Link href="/favoritos" onClick={() => setMenuOpen(false)}>
                    Favoritos
                </Link>


                <ThemeToggle />
            </div>
        </nav>
    );
}