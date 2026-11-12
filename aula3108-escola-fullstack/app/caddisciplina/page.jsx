'use client';
import { useState } from "react";
import Header from "../components/header";
import Link from "next/link";
import styles from "./caddisciplina.module.css";
import { useRouter } from "next/navigation";

export default function CadDisciplina() {
    const router = useRouter();
    const [nome, setNome] = useState('');
    const [pontuacao_minima, setPontuacaoMinima] = useState('');

    async function cadastrarDisciplina(evento) {
        evento.preventDefault();

        const resposta = await fetch("/api/disciplinas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                pontuacao_minima: parseFloat(pontuacao_minima)
            })
        });
        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);
        if (resposta.ok) {
            router.push("/listadisciplina");
        }
    }

    const handleReset = () => {
        setNome('');
        setPontuacaoMinima('');
    };

    return (
        <>
            <Header />

            {/* ===== BANNER HERO ===== */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.heroTag}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        Gestão Acadêmica
                    </span>
                    <h2 className={styles.heroTitle}>
                        Cadastro de <span className="accent">Disciplinas</span>
                    </h2>
                    <p className={styles.heroDesc}>
                        Registre as disciplinas oferecidas pela escola com suas respectivas pontuações mínimas para aprovação.
                    </p>
                </div>
            </section>

            {/* ===== CONTEÚDO PRINCIPAL ===== */}
            <main className={styles.mainSection}>
                <div className={styles.contentGrid}>

                    {/* FORMULÁRIO */}
                    <div className={styles.formCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIconBadge}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className={styles.cardTitle}>Nova Disciplina</h3>
                                <p className={styles.cardSubtitle}>Preencha os dados da disciplina</p>
                            </div>
                        </div>

                        <form onSubmit={cadastrarDisciplina} className={styles.form}>

                            <div className={styles.inputGroup}>
                                <label htmlFor="nome" className={styles.label}>
                                    Nome da Disciplina: <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                        </svg>
                                    </span>
                                    <input
                                        id="nome"
                                        type="text"
                                        className={styles.input}
                                        placeholder="Ex: Matemática, Português..."
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="pontuacao_minima" className={styles.label}>
                                    Pontuação Mínima para Passar: <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 6v6l4 2" />
                                        </svg>
                                    </span>
                                    <input
                                        id="pontuacao_minima"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="10"
                                        className={styles.input}
                                        placeholder="0 a 10"
                                        value={pontuacao_minima}
                                        onChange={(e) => setPontuacaoMinima(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* BOTÕES DE AÇÃO */}
                            <div className={styles.buttonGroup}>
                                <button type="submit" className={styles.btnPrimary}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Cadastrar Disciplina
                                </button>
                                <button type="button" onClick={handleReset} className={styles.btnReset}>
                                    Limpar
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* COLUNA LATERAL */}
                    <div className={styles.sidebarColumn}>
                        <div className={styles.infoCard}>
                            <h4 className={styles.infoTitle}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                                Informações
                            </h4>
                            <ul className={styles.infoList}>
                                <li className={styles.infoItem}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>Informe o nome completo da disciplina.</span>
                                </li>
                                <li className={styles.infoItem}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>A pontuação mínima define o critério de aprovação (0 a 10).</span>
                                </li>
                            </ul>
                            <Link href="/listadisciplina" className={styles.linkButton}>
                                Consultar Lista de Disciplinas →
                            </Link>
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

