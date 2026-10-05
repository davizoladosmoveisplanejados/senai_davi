'use client';
import { useState } from "react";
import Header from "../components/header";
import Link from "next/link";
import styles from "./notaluno.module.css";

export default function NotAluno() {
    // Alunos já cadastrados no sistema conforme os dados já codados
    const alunosCadastrados = [
        "Bianca Pasini"
    ];

    const [nome, setNome] = useState('');
    const [t1, setT1] = useState('');
    const [t2, setT2] = useState('');
    const [n1, setN1] = useState('');
    const [n2, setN2] = useState('');
    const [n3, setN3] = useState('');
    const [sucesso, setSucesso] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nome) {
            return;
        }

        setSucesso(true);
        setTimeout(() => {
            setSucesso(false);
        }, 4000);
    };

    const handleReset = () => {
        setNome('');
        setT1('');
        setT2('');
        setN1('');
        setN2('');
        setN3('');
        setSucesso(false);
    };

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
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                            <line x1="12" y1="11" x2="12" y2="17" />
                            <line x1="9" y1="14" x2="15" y2="14" />
                        </svg>
                        Lançamento Acadêmico
                    </span>
                    <h2 className={styles.heroTitle}>
                        Cadastro de <span className="accent">Notas</span>
                    </h2>
                    <p className={styles.heroDesc}>
                        Selecione o estudante cadastrado e registre as notas dos trabalhos e avaliações no sistema escolar do SESI.
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
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                            </div>
                            <div>
                                <h3 className={styles.cardTitle}>Lançamento de Avaliações</h3>
                                <p className={styles.cardSubtitle}>Preencha as notas dos trabalhos e provas</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            {/* CAMPO: NOME COM ESCOLHA ENTRE ALUNOS CADASTRADOS */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="nome" className={styles.label}>
                                    Nome do Aluno: <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </span>
                                    <select
                                        id="nome"
                                        className={styles.select}
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecione um aluno cadastrado...</option>
                                        {alunosCadastrados.map((aluno, index) => (
                                            <option key={index} value={aluno}>
                                                {aluno}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* SEÇÃO DE TRABALHOS */}
                            <div className={styles.sectionTitleGroup}>
                                <span>Trabalhos</span>
                            </div>

                            <div className={styles.formRow2}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="t1" className={styles.label}>
                                        1º Trabalho:
                                    </label>
                                    <div className={styles.inputWrapper}>
                                        <span className={styles.inputIcon}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </span>
                                        <input
                                            id="t1"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="10"
                                            className={styles.input}
                                            placeholder="0 a 10"
                                            value={t1}
                                            onChange={(e) => setT1(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="t2" className={styles.label}>
                                        2º Trabalho:
                                    </label>
                                    <div className={styles.inputWrapper}>
                                        <span className={styles.inputIcon}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </span>
                                        <input
                                            id="t2"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="10"
                                            className={styles.input}
                                            placeholder="0 a 10"
                                            value={t2}
                                            onChange={(e) => setT2(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* SEÇÃO DE PROVAS / NOTAS */}
                            <div className={styles.sectionTitleGroup}>
                                <span>Avaliações</span>
                            </div>

                            <div className={styles.formRow3}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="n1" className={styles.label}>
                                        Nota 1:
                                    </label>
                                    <div className={styles.inputWrapper}>
                                        <span className={styles.inputIcon}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 6v6l4 2" />
                                            </svg>
                                        </span>
                                        <input
                                            id="n1"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="10"
                                            className={styles.input}
                                            placeholder="0 a 10"
                                            value={n1}
                                            onChange={(e) => setN1(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="n2" className={styles.label}>
                                        Nota 2:
                                    </label>
                                    <div className={styles.inputWrapper}>
                                        <span className={styles.inputIcon}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 6v6l4 2" />
                                            </svg>
                                        </span>
                                        <input
                                            id="n2"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="10"
                                            className={styles.input}
                                            placeholder="0 a 10"
                                            value={n2}
                                            onChange={(e) => setN2(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="n3" className={styles.label}>
                                        Nota 3:
                                    </label>
                                    <div className={styles.inputWrapper}>
                                        <span className={styles.inputIcon}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M12 6v6l4 2" />
                                            </svg>
                                        </span>
                                        <input
                                            id="n3"
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="10"
                                            className={styles.input}
                                            placeholder="0 a 10"
                                            value={n3}
                                            onChange={(e) => setN3(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* BOTÕES DE AÇÃO */}
                            <div className={styles.buttonGroup}>
                                <button type="submit" className={styles.btnPrimary}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Cadastrar Notas
                                </button>
                                <button type="button" onClick={handleReset} className={styles.btnReset}>
                                    Limpar
                                </button>
                            </div>
                        </form>

                        {/* MENSAGEM DE SUCESSO */}
                        {sucesso && (
                            <div className={styles.alertSuccess}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                <span><strong>Notas salvas com sucesso!</strong> As avaliações foram vinculadas ao estudante.</span>
                            </div>
                        )}
                    </div>

                    {/* COLUNA LATERAL COM PRÉVIA */}
                    <div className={styles.sidebarColumn}>

                        {/* CARTÃO DE BOLETIM EM TEMPO REAL */}
                        <div className={styles.previewCard}>
                            <div className={styles.previewHeader}>
                                <span className={styles.previewBrand}>
                                    <span className="accent">SESI</span> Boletim
                                </span>
                                <span className={styles.previewBadge}>Prévia</span>
                            </div>
                            <div className={styles.previewBody}>
                                <div className={styles.studentPreviewHeader}>
                                    <div className={styles.previewAvatar}>
                                        {getInitials(nome)}
                                    </div>
                                    <div>
                                        <h4 className={styles.previewStudentName}>
                                            {nome || "Selecione um aluno"}
                                        </h4>
                                        <p className={styles.previewStudentSubtitle}>
                                            {nome ? "Aluno Selecionado" : "Nenhum aluno escolhido"}
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.gradesList}>
                                    <div className={styles.gradeRow}>
                                        <span>1º Trabalho:</span>
                                        <span className={styles.gradeValue}>{t1 !== '' ? t1 : '—'}</span>
                                    </div>
                                    <div className={styles.gradeRow}>
                                        <span>2º Trabalho:</span>
                                        <span className={styles.gradeValue}>{t2 !== '' ? t2 : '—'}</span>
                                    </div>
                                    <div className={styles.gradeRow}>
                                        <span>1ª Nota:</span>
                                        <span className={styles.gradeValue}>{n1 !== '' ? n1 : '—'}</span>
                                    </div>
                                    <div className={styles.gradeRow}>
                                        <span>2ª Nota:</span>
                                        <span className={styles.gradeValue}>{n2 !== '' ? n2 : '—'}</span>
                                    </div>
                                    <div className={styles.gradeRow}>
                                        <span>3ª Nota:</span>
                                        <span className={styles.gradeValue}>{n3 !== '' ? n3 : '—'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ATALHO E INFORMAÇÃO */}
                        <div className={styles.infoCard}>
                            <h4 className={styles.infoTitle}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                                Informações das Avaliações
                            </h4>
                            <ul className={styles.infoList}>
                                <li className={styles.infoItem}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>Insira as notas dos trabalhos e avaliações de 0 a 10.</span>
                                </li>
                                <li className={styles.infoItem}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>As notas ficam disponíveis imediatamente na listagem geral.</span>
                                </li>
                            </ul>
                            <Link href="/listanota" className={styles.linkButton}>
                                Consultar Lista de Notas →
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