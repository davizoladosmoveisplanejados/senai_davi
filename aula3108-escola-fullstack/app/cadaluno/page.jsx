'use client';
import { useState } from "react";
import Header from "../components/header";
import Link from "next/link";
import styles from "./cadaluno.module.css";

export default function CadAluno() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [serie, setSerie] = useState('');
    const [ra, setRa] = useState('');

    async function cadastrarAluno(evento) {
        evento.preventDefault();
        const resposta = await fetch("/api/alunos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                idade,
                serie,
                ra
            })
        })
        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);
        if (resposta.ok) {
            setNome('');
            setIdade('');
            setSerie('');
            setRa('');
        }
    }

    // Obter iniciais do nome para o avatar da prévia
    const getInitials = (name) => {
        if (!name) return 'AL';
        const parts = name.trim().split(' ');
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
        <>
            <Header />

            {/* ===== BANNER HERO ===== */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.heroTag}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <line x1="19" y1="8" x2="19" y2="14" />
                            <line x1="22" y1="11" x2="16" y2="11" />
                        </svg>
                        Gestão Acadêmica
                    </span>
                    <h2 className={styles.heroTitle}>
                        Cadastro de <span className="accent">Alunos</span>
                    </h2>
                    <p className={styles.heroDesc}>
                        Registre novos estudantes no sistema escolar do SESI. Preencha os dados
                        abaixo para emitir o registro e liberar o acesso às notas e turmas.
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
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div>
                                <h3 className={styles.cardTitle}>Dados Cadastrais</h3>
                                <p className={styles.cardSubtitle}>Insira as informações do novo estudante</p>
                            </div>
                        </div>

                        <form onSubmit={cadastrarAluno} className={styles.form}>
                            {/* CAMPO: NOME */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="nome" className={styles.label}>
                                    Nome Completo <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>
                                    <input
                                        id="nome"
                                        type="text"
                                        className={styles.input}
                                        placeholder="Ex: Carlos Eduardo de Souza"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* LINHA DUPLA: IDADE E SÉRIE */}
                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="idade" className={styles.label}>
                                        Idade <span className={styles.required}>*</span>
                                    </label>
                                    <div className={styles.inputWrapper}>
                                        <span className={styles.inputIcon}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                <line x1="16" y1="2" x2="16" y2="6" />
                                                <line x1="8" y1="2" x2="8" y2="6" />
                                                <line x1="3" y1="10" x2="21" y2="10" />
                                            </svg>
                                        </span>
                                        <input
                                            id="idade"
                                            type="number"
                                            className={styles.input}
                                            placeholder="Ex: 16"
                                            min="1"
                                            max="120"
                                            value={idade}
                                            onChange={(e) => setIdade(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <span className={styles.inputHelp}>Anos completos</span>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="serie" className={styles.label}>
                                        Série / Turma <span className={styles.required}>*</span>
                                    </label>
                                    <div className={styles.inputWrapper}>
                                        <span className={styles.inputIcon}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                            </svg>
                                        </span>
                                        <input
                                            id="serie"
                                            type="text"
                                            className={styles.input}
                                            placeholder="Ex: 2º Ano EM"
                                            value={serie}
                                            onChange={(e) => setSerie(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <span className={styles.inputHelp}>Ex: 1º Ano EM, 9º EF</span>
                                </div>
                            </div>

                            {/* CAMPO: RA */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="ra" className={styles.label}>
                                    RA (Registro do Aluno) <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="16" rx="2" />
                                            <line x1="7" y1="8" x2="17" y2="8" />
                                            <line x1="7" y1="12" x2="13" y2="12" />
                                            <line x1="7" y1="16" x2="11" y2="16" />
                                        </svg>
                                    </span>
                                    <input
                                        id="ra"
                                        type="number"
                                        className={styles.input}
                                        placeholder="Ex: 20261042"
                                        value={ra}
                                        onChange={(e) => setRa(e.target.value)}
                                        required
                                    />
                                </div>
                                <span className={styles.inputHelp}>Código numérico institucional</span>
                            </div>

                            {/* BOTÕES DE AÇÃO */}
                            <div className={styles.buttonGroup}>
                                <button type="submit" className={styles.btnPrimary}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Cadastrar Aluno
                                </button>
                                <button type="button" className={styles.btnReset}>
                                    Limpar
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* COLUNA LATERAL: PRÉVIA E INFORMAÇÕES */}
                    <div className={styles.sidebarColumn}>

                        {/* CARTÃO DE PRÉVIA EM TEMPO REAL */}
                        <div className={styles.previewCard}>
                            <div className={styles.previewHeader}>
                                <span className={styles.previewBrand}>
                                    <span className="accent">SESI</span> ID
                                </span>
                                <span className={styles.previewBadge}>Prévia do Cartão</span>
                            </div>
                            <div className={styles.previewBody}>
                                <div className={styles.previewAvatar}>
                                    {getInitials(nome)}
                                </div>
                                <h4 className={styles.previewName}>
                                    {nome || "Nome do Aluno"}
                                </h4>
                                <p className={styles.previewSubtitle}>
                                    {serie || "Série / Turma a definir"}
                                </p>

                                <div className={styles.previewDetails}>
                                    <div className={styles.previewDetailItem}>
                                        <div className={styles.previewDetailLabel}>RA</div>
                                        <div className={styles.previewDetailValue}>
                                            {ra || "—"}
                                        </div>
                                    </div>
                                    <div className={styles.previewDetailItem}>
                                        <div className={styles.previewDetailLabel}>Idade</div>
                                        <div className={styles.previewDetailValue}>
                                            {idade ? `${idade} anos` : "—"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.previewFooter}>
                                <span className={styles.statusActive}>
                                    <span className={styles.statusDot}></span>
                                    {ra ? "Pronto p/ Matrícula" : "Aguardando Dados"}
                                </span>
                                <span>SESI Escola 2026</span>
                            </div>
                        </div>

                        {/* CARTÃO DE DICAS */}
                        <div className={styles.infoCard}>
                            <h4 className={styles.infoTitle}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                                Instruções Rápidas
                            </h4>
                            <ul className={styles.infoList}>
                                <li className={styles.infoItem}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>Certifique-se de que o RA seja exclusivo do estudante.</span>
                                </li>
                                <li className={styles.infoItem}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>Após o cadastro, o aluno estará disponível para lançamento de notas.</span>
                                </li>
                            </ul>
                            <Link href="/listaluno" className={styles.linkButton}>
                                Consultar Lista de Alunos →
                            </Link>
                        </div>

                    </div>
                </div>
            </main>

            {/* ===== FOOTER IDÊNTICO À TELA PRINCIPAL ===== */}
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
