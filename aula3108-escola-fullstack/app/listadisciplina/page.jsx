'use client';
import { useState, useEffect } from 'react';
import Header from "../components/header";
import Link from "next/link";
import styles from "./listadisciplina.module.css";
import { useRouter } from "next/navigation";

export default function ListaDisciplinas() {
    const [disciplinas, setDisciplinas] = useState([]);
    const router = useRouter();

    useEffect(() => {
        buscarDisciplinas();
    }, []);

    async function buscarDisciplinas() {
        const resposta = await fetch('/api/disciplinas');
        const dados = await resposta.json();
        setDisciplinas(dados);
    }

    function editarDisciplina(id) {
        router.push(`/editadisciplina/${id}`);
    }

    async function excluirDisciplina(event) {
        event.preventDefault();
        if (!confirm("Deseja realmente excluir esta disciplina?")) {
            return;
        }
        const resposta = await fetch("/api/disciplinas", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_disciplina: event.target.dataset.id,
            }),
        });

        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);
        buscarDisciplinas();
    }

    return (
        <>
            <Header />

            {/* ===== BANNER HERO ===== */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroText}>
                        <span className={styles.heroTag}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                            Gestão Acadêmica
                        </span>
                        <h2 className={styles.heroTitle}>
                            Lista de <span className="accent">Disciplinas</span>
                        </h2>
                        <p className={styles.heroDesc}>
                            Consulte todas as disciplinas cadastradas e suas pontuações mínimas para aprovação.
                        </p>
                    </div>

                    <Link href="/caddisciplina" className={styles.btnHero}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Nova Disciplina
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
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className={styles.cardTitle}>Disciplinas Cadastradas</h3>
                                    <p className={styles.cardSubtitle}>Registros oficiais das disciplinas da escola</p>
                                </div>
                            </div>

                            <span className={styles.badgeTotal}>
                                <span className={styles.badgeTotalDot}></span>
                                Total: {disciplinas.length} {disciplinas.length === 1 ? 'disciplina' : 'disciplinas'}
                            </span>
                        </div>

                        {/* TABELA RESPONSIVA */}
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Nome da Disciplina</th>
                                        <th>Pontuação Mínima</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {disciplinas.map((disciplina) => (
                                        <tr key={disciplina.id_disciplina}>
                                            <td data-label="Disciplina">
                                                <span className={styles.disciplinaName}>{disciplina.nome}</span>
                                            </td>
                                            <td data-label="Pontuação Mínima">
                                                <span className={styles.gradePill}>{disciplina.pontuacao_minima}</span>
                                            </td>
                                            <td>
                                                <button onClick={() => editarDisciplina(disciplina.id_disciplina)}>Editar</button>
                                                <button onClick={(e) => excluirDisciplina(e)} data-id={disciplina.id_disciplina}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* RODAPÉ DA TABELA */}
                        <div className={styles.tableFooter}>
                            <span className={styles.statusIndicator}>
                                Exibindo disciplinas cadastradas
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
                        <li><Link href="/cadaluno">Cadastro Alunos</Link></li>
                        <li><Link href="/listaluno">Lista Alunos</Link></li>
                        <li><Link href="/caddisciplina">Cadastro Disciplinas</Link></li>
                        <li><Link href="/listadisciplina">Lista Disciplinas</Link></li>
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

