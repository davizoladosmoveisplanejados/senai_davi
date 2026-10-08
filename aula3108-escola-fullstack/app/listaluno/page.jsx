'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import Link from "next/link";
import styles from "./listaluno.module.css";

export default function ListAluno() {

    const [alunos, setAlunos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");
    const router = useRouter();

    async function buscarAlunos() {
        const resposta = await fetch("/api/alunos");
        const dados = await resposta.json();
        setAlunos(dados);
    }

    async function deletarAluno(id_aluno, nome) {
        const confirmar = window.confirm(`Tem certeza que deseja excluir o aluno "${nome}"? Esta ação não pode ser desfeita.`);
        if (!confirmar) return;
        try {
            const resposta = await fetch("/api/alunos", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_aluno })
            });
            if (resposta.ok) {
                buscarAlunos();
            } else {
                alert("Erro ao excluir o aluno. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao deletar aluno:", error);
            alert("Erro de conexão. Tente novamente.");
        }
    }

    // Filtra alunos: só aplica o filtro quando pesquisa tiver 3+ caracteres
    const alunosFiltrados = pesquisa.length >= 3
        ? alunos.filter(a => a.nome.toLowerCase().includes(pesquisa.toLowerCase()))
        : alunos;

    useEffect(() => {
        buscarAlunos();
    }, []); //toda vez que a tela for recarregada

    return (
        <>
            <Header />

            {/* ===== BANNER HERO ===== */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroText}>
                        <span className={styles.heroTag}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            Gestão Acadêmica
                        </span>
                        <h2 className={styles.heroTitle}>
                            Lista de <span className="accent">Alunos</span>
                        </h2>
                        <p className={styles.heroDesc}>
                            Consulte a relação completa de alunos cadastrados no sistema SESI Escola,
                            com acesso rápido ao RA, série e dados individuais.
                        </p>
                    </div>

                    <Link href="/cadaluno" className={styles.btnHero}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Cadastrar Novo Aluno
                    </Link>
                </div>
            </section>

            {/* ===== CONTEÚDO DA TABELA ===== */}
            <main className={styles.mainSection}>
                <div className={styles.container}>
                    <div className={styles.tableCard}>

                        {/* CABEÇALHO DO CARD */}
                        <div className={styles.cardHeader}>
                            <div className={styles.headerLeft}>
                                <div className={styles.cardIconBadge}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="16" y1="13" x2="8" y2="13" />
                                        <line x1="16" y1="17" x2="8" y2="17" />
                                        <polyline points="10 9 9 9 8 9" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className={styles.cardTitle}>Estudantes Matriculados</h3>
                                    <p className={styles.cardSubtitle}>Registros oficiais do sistema escolar</p>
                                </div>
                            </div>

                            <span className={styles.badgeTotal}>
                                <span className={styles.badgeTotalDot}></span>
                                Sistema Ativo
                            </span>
                        </div>

                        {/* CAMPO DE PESQUISA */}
                        <div className={styles.searchWrapper}>
                            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                id="pesquisa-aluno"
                                type="text"
                                className={styles.searchInput}
                                placeholder="Pesquisar por nome... (mín. 3 letras)"
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)}
                            />
                            {pesquisa.length > 0 && pesquisa.length < 3 && (
                                <span className={styles.searchHint}>Digite mais {3 - pesquisa.length} letra(s)</span>
                            )}
                            {pesquisa.length >= 3 && (
                                <button className={styles.searchClear} onClick={() => setPesquisa("")} title="Limpar pesquisa">✕</button>
                            )}
                        </div>

                        {/* TABELA RESPONSIVA */}
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Série</th>
                                        <th>RA</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        alunosFiltrados.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: "center", padding: "2rem", opacity: 0.6 }}>
                                                    {pesquisa.length >= 3
                                                        ? `Nenhum aluno encontrado para "${pesquisa}"`
                                                        : "Nenhum aluno cadastrado ainda."}
                                                </td>
                                            </tr>
                                        ) : (
                                            alunosFiltrados.map((aluno) => (
                                                <tr key={aluno.id_aluno}>
                                                    <td>
                                                        <span className={styles.idBadge}>{aluno.id_aluno}</span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.studentCell}>
                                                            <div className={styles.avatarMini}>{aluno.nome.substring(0, 2).toUpperCase()}</div>
                                                            <span className={styles.studentName}>{aluno.nome}</span>
                                                        </div>
                                                    </td>
                                                    <td>{aluno.idade} anos</td>
                                                    <td>
                                                        <span className={styles.serieBadge}>{aluno.serie}</span>
                                                    </td>
                                                    <td>
                                                        <span className={styles.raBadge}>{aluno.ra}</span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.actionsCell}>
                                                            <button className={styles.btnEdit} title="Editar aluno" onClick={() => router.push(`/editaluno/${aluno.id_aluno}`)}>
                                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                                </svg>
                                                                Editar
                                                            </button>
                                                            <button
                                                                className={styles.btnDelete}
                                                                title="Deletar aluno"
                                                                onClick={() => deletarAluno(aluno.id_aluno, aluno.nome)}
                                                            >
                                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="3 6 5 6 21 6" />
                                                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                                    <path d="M10 11v6" />
                                                                    <path d="M14 11v6" />
                                                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                                                </svg>
                                                                Deletar
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* RODAPÉ DA TABELA */}
                        <div className={styles.tableFooter}>
                            <span className={styles.statusIndicator}>
                                {pesquisa.length >= 3
                                    ? `${alunosFiltrados.length} resultado(s) para "${pesquisa}"`
                                    : `${alunos.length} aluno(s) cadastrado(s)`}
                            </span>
                            <span>SESI Escola 2026</span>
                        </div>

                    </div>
                </div>
            </main>

            {/* ===== FOOTER PADRÃO ===== */}
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
};
