'use client';
import Header from "../components/header";
import Link from "next/link";
import styles from "./listanota.module.css";

export default function ListNotas() {
    // Aluno e notas já codados pelo usuário
    const alunoNotas = {
        nome: "Davi de Sousa",
        t1: 10,
        t2: 10,
        n1: 10,
        n2: 10,
        n3: 10
    };

    return (
        <>
            <Header />

            {/* ===== BANNER HERO ===== */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroText}>
                        <span className={styles.heroTag}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                            Boletim Escolar
                        </span>
                        <h2 className={styles.heroTitle}>
                            Lista de <span className="accent">Notas</span>
                        </h2>
                        <p className={styles.heroDesc}>
                            Consulte o desempenho acadêmico, notas de trabalhos e avaliações dos estudantes.
                        </p>
                    </div>

                    <Link href="/notaluno" className={styles.btnHero}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Lançar Novas Notas
                    </Link>
                </div>
            </section>

            {/* ===== CONTEÚDO PRINCIPAL ===== */}
            <main className={styles.mainSection}>
                <div className={styles.container}>
                    <div className={styles.tableCard}>
                        
                        {/* CABEÇALHO DO CARD */}
                        <div className={styles.cardHeader}>
                            <div className={styles.headerLeft}>
                                <div className={styles.cardIconBadge}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className={styles.cardTitle}>Boletim de Avaliações</h3>
                                    <p className={styles.cardSubtitle}>Registros oficiais de notas e trabalhos</p>
                                </div>
                            </div>

                            <span className={styles.badgeTotal}>
                                <span className={styles.badgeTotalDot}></span>
                                Registros Oficiais
                            </span>
                        </div>

                        {/* TABELA RESPONSIVA */}
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Nome do Aluno</th>
                                        <th>1º Trabalho</th>
                                        <th>2º Trabalho</th>
                                        <th>1ª Nota</th>
                                        <th>2ª Nota</th>
                                        <th>3ª Nota</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className={styles.studentCell}>
                                                <div className={styles.avatarMini}>DS</div>
                                                <span className={styles.studentName}>{alunoNotas.nome}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.gradePill}>{alunoNotas.t1}</span>
                                        </td>
                                        <td>
                                            <span className={styles.gradePill}>{alunoNotas.t2}</span>
                                        </td>
                                        <td>
                                            <span className={styles.gradePill}>{alunoNotas.n1}</span>
                                        </td>
                                        <td>
                                            <span className={styles.gradePill}>{alunoNotas.n2}</span>
                                        </td>
                                        <td>
                                            <span className={styles.gradePill}>{alunoNotas.n3}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* RODAPÉ DA TABELA */}
                        <div className={styles.tableFooter}>
                            <span className={styles.statusIndicator}>
                                Exibindo notas oficiais registradas
                            </span>
                            <span>SESI Escola 2026</span>
                        </div>

                    </div>
                </div>
            </main>

            {/* ===== FOOTER PADRÃO SESI ===== */}
            <footer className="footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <span className="accent">SESI</span> Escola
                    </div>
                    <ul className="footer-links">
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="/cadaluno">Cadastro</Link></li>
                        <li><Link href="/listaluno">Alunos</Link></li>
                        <li><Link href="/notaluno">Notas</Link></li>
                    </ul>
                    <div className="footer-divider"></div>
                    <p className="footer-copy">
                        © 2026 SESI Escola — Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </>
    );
}