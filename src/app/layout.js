import './globals.css';
import Navbar from '@/components/Navbar/Navbar';

export const metadata = {
    title: 'WizardDex',
    description: 'A Enciclopédia dos Bruxos',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}