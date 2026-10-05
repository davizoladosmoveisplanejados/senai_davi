'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="header">
            <div className="header-inner">
                <h1>
                    <Link href="/">
                        <span className="accent">SESI</span> Escola
                    </Link>
                </h1>
                <nav>
                    <ul>
                        <li><Link href='/' className={pathname === '/' ? "active" : ""}>Início</Link></li>
                        <li><Link href='/cadaluno' className={pathname === '/cadaluno' ? "active" : ""}>Cadastro Alunos</Link></li>
                        <li><Link href='/listaluno' className={pathname === '/listaluno' ? "active" : ""}>Lista Alunos</Link></li>
                        <li><Link href='/notaluno' className={pathname === '/notaluno' ? "active" : ""}>Cadastro Notas</Link></li>
                        <li><Link href='/listanota' className={pathname === '/listanota' ? "active" : ""}>Lista Notas</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}