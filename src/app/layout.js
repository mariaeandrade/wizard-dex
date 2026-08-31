import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import { cookies } from 'next/headers';

export const metadata = {
    title: 'WizardDex',
    description: 'A Enciclopédia dos Bruxos',
};

export default async function RootLayout({ children }) {
    const cookieStore = await cookies();
    const tema = cookieStore.get('tema')?.value || 'light';

    return (
        <html lang="pt-BR" className={tema}>
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}