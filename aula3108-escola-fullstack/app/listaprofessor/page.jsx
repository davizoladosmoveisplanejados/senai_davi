'use client';
import { useState, useEffect } from 'react';
import Header from "../components/header";
import Link from "next/link";
import styles from "./listaprofessor.module.css";
import { useRouter } from "next/navigation";

export default function ListaProfessores() {
    const [professores, setProfessores] = useState([]);
    const router = useRouter();

    useEffect(() => {
        buscarProfessores();
    }, []);

    async function buscarProfessores() {
        const resposta = await fetch('/api/professores');
        const dados = await resposta.json();
        setProfessores(dados);
    }

    function editarProfessor(id) {
        router.push(`/editaprofessor/${id}`);
    }

    async function excluirProfessor(event) {
        event.preventDefault();
        if (!confirm("Deseja realmente excluir este professor?")) {
            return;
        }
        const resposta = await fetch("/api/professores", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_professor: event.target.dataset.id }),
        });

        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);
        buscarProfessores();
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
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            Gestão de Docentes
                        </span>
                        <h2 className={styles.heroTitle}>
                            Lista de <span className="accent">Professores</span>
                        </h2>
                        <p className={styles.heroDesc}>
                            Consulte todos os professores cadastrados, suas disciplinas e dias de aula.
                        </p>
                    </div>

                    <Link href="/cadprofessor" className={styles.btnHero}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Novo Professor
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
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className={styles.cardTitle}>Professores Cadastrados</h3>
                                    <p className={styles.cardSubtitle}>Registros oficiais do corpo docente</p>
                                </div>
                            </div>

                            <span className={styles.badgeTotal}>
                                <span className={styles.badgeTotalDot}></span>
                                Total: {professores.length} {professores.length === 1 ? 'professor' : 'professores'}
                            </span>
                        </div>

                        {/* TABELA RESPONSIVA */}
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Nome do Professor</th>
                                        <th>NIF</th>
                                        <th>Disciplina</th>
                                        <th>Dias de Aula</th>
                                        <th>Aulas/Semana</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professores.map((professor) => {
                                        const iniciais = professor.nome
                                            ? professor.nome.trim().split(' ').filter(p => p).map(p => p[0]).slice(0, 2).join('').toUpperCase()
                                            : 'PR';
                                        return (
                                            <tr key={professor.id_professor}>
                                                <td data-label="Professor">
                                                    <div className={styles.professorCell}>
                                                        <div className={styles.avatarMini}>{iniciais}</div>
                                                        <span className={styles.professorName}>{professor.nome}</span>
                                                    </div>
                                                </td>
                                                <td data-label="NIF">
                                                    <span className={styles.nifPill}>{professor.nif}</span>
                                                </td>
                                                <td data-label="Disciplina">
                                                    <span className={styles.disciplinaTag}>{professor.nome_disciplina}</span>
                                                </td>
                                                <td data-label="Dias de Aula">
                                                    <span className={styles.diasText}>{professor.dias_aula}</span>
                                                </td>
                                                <td data-label="Aulas/Semana">
                                                    <span className={styles.gradePill}>{professor.total_aulas_semana}</span>
                                                </td>
                                                <td>
                                                    <button onClick={() => editarProfessor(professor.id_professor)}>Editar</button>
                                                    <button onClick={(e) => excluirProfessor(e)} data-id={professor.id_professor}>Excluir</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* RODAPÉ DA TABELA */}
                        <div className={styles.tableFooter}>
                            <span className={styles.statusIndicator}>
                                Exibindo professores cadastrados
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
                        <li><Link href="/cadprofessor">Cadastro Professores</Link></li>
                        <li><Link href="/listaprofessor">Lista Professores</Link></li>
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

