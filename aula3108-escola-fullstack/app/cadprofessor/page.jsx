'use client';
import { useState, useEffect } from "react";
import Header from "../components/header";
import Link from "next/link";
import styles from "./cadprofessor.module.css";
import { useRouter } from "next/navigation";

const DIAS_SEMANA = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

export default function CadProfessor() {
    const router = useRouter();
    const [disciplinas, setDisciplinas] = useState([]);
    const [nome, setNome] = useState('');
    const [nif, setNif] = useState('');
    const [diasSelecionados, setDiasSelecionados] = useState([]);
    const [id_disciplina, setIdDisciplina] = useState('');
    const [total_aulas_semana, setTotalAulasSemana] = useState('');

    useEffect(() => {
        buscarDisciplinas();
    }, []);

    async function buscarDisciplinas() {
        const resposta = await fetch('/api/disciplinas');
        const dados = await resposta.json();
        setDisciplinas(dados);
    }

    function toggleDia(dia) {
        setDiasSelecionados((prev) =>
            prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
        );
    }

    async function cadastrarProfessor(evento) {
        evento.preventDefault();
        if (diasSelecionados.length === 0) {
            alert('Selecione ao menos um dia de aula!');
            return;
        }
        if (!id_disciplina) {
            alert('Selecione uma disciplina!');
            return;
        }

        const resposta = await fetch("/api/professores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome,
                nif,
                dias_aula: diasSelecionados.join(', '),
                id_disciplina,
                total_aulas_semana: parseInt(total_aulas_semana)
            })
        });
        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);
        if (resposta.ok) {
            router.push("/listaprofessor");
        }
    }

    const handleReset = () => {
        setNome('');
        setNif('');
        setDiasSelecionados([]);
        setIdDisciplina('');
        setTotalAulasSemana('');
    };

    const disciplinaSelecionada = disciplinas.find(d => String(d.id_disciplina) === String(id_disciplina));

    return (
        <>
            <Header />

            {/* ===== BANNER HERO ===== */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.heroTag}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Gestão de Docentes
                    </span>
                    <h2 className={styles.heroTitle}>
                        Cadastro de <span className="accent">Professores</span>
                    </h2>
                    <p className={styles.heroDesc}>
                        Registre os professores da escola informando seus dados, dias de aula e disciplina responsável.
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
                                <h3 className={styles.cardTitle}>Novo Professor</h3>
                                <p className={styles.cardSubtitle}>Preencha os dados do professor</p>
                            </div>
                        </div>

                        <form onSubmit={cadastrarProfessor} className={styles.form}>

                            <div className={styles.inputGroup}>
                                <label htmlFor="nome" className={styles.label}>
                                    Nome do Professor: <span className={styles.required}>*</span>
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
                                        placeholder="Nome completo do professor"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="nif" className={styles.label}>
                                    Matrícula (NIF): <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="4" width="20" height="16" rx="2" />
                                            <line x1="8" y1="10" x2="16" y2="10" />
                                            <line x1="8" y1="14" x2="13" y2="14" />
                                        </svg>
                                    </span>
                                    <input
                                        id="nif"
                                        type="text"
                                        className={styles.input}
                                        placeholder="Número de identificação funcional"
                                        value={nif}
                                        onChange={(e) => setNif(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    Dias que Ministra Aula: <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.diasGrid}>
                                    {DIAS_SEMANA.map((dia) => (
                                        <button
                                            key={dia}
                                            type="button"
                                            className={`${styles.diaBtn} ${diasSelecionados.includes(dia) ? styles.diaBtnAtivo : ''}`}
                                            onClick={() => toggleDia(dia)}
                                        >
                                            {dia}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="disciplina" className={styles.label}>
                                    Disciplina Responsável: <span className={styles.required}>*</span>
                                </label>
                                <div className={styles.inputWrapper}>
                                    <span className={styles.inputIcon}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                        </svg>
                                    </span>
                                    <select
                                        id="disciplina"
                                        className={styles.select}
                                        value={id_disciplina}
                                        onChange={(e) => setIdDisciplina(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecione uma disciplina...</option>
                                        {disciplinas.map((disc) => (
                                            <option key={disc.id_disciplina} value={disc.id_disciplina}>
                                                {disc.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="total_aulas_semana" className={styles.label}>
                                    Total de Aulas na Semana: <span className={styles.required}>*</span>
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
                                        id="total_aulas_semana"
                                        type="number"
                                        min="1"
                                        className={styles.input}
                                        placeholder="Quantidade de aulas por semana"
                                        value={total_aulas_semana}
                                        onChange={(e) => setTotalAulasSemana(e.target.value)}
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
                                    Cadastrar Professor
                                </button>
                                <button type="button" onClick={handleReset} className={styles.btnReset}>
                                    Limpar
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* COLUNA LATERAL */}
                    <div className={styles.sidebarColumn}>
                        <div className={styles.previewCard}>
                            <div className={styles.previewHeader}>
                                <span className={styles.previewBrand}>
                                    <span className="accent">SESI</span> Docente
                                </span>
                                <span className={styles.previewBadge}>Prévia</span>
                            </div>
                            <div className={styles.previewBody}>
                                <div className={styles.professorPreviewHeader}>
                                    <div className={styles.previewAvatar}>
                                        {nome ? nome.trim().split(' ').filter(p => p).map(p => p[0]).slice(0, 2).join('').toUpperCase() : 'PR'}
                                    </div>
                                    <div>
                                        <h4 className={styles.previewNome}>{nome || 'Nome do professor'}</h4>
                                        <p className={styles.previewNif}>{nif ? `NIF: ${nif}` : 'Matrícula não informada'}</p>
                                    </div>
                                </div>

                                <div className={styles.previewList}>
                                    <div className={styles.previewRow}>
                                        <span>Disciplina:</span>
                                        <span className={styles.previewValue}>{disciplinaSelecionada?.nome || '—'}</span>
                                    </div>
                                    <div className={styles.previewRow}>
                                        <span>Dias de aula:</span>
                                        <span className={styles.previewValue}>{diasSelecionados.length > 0 ? diasSelecionados.join(', ') : '—'}</span>
                                    </div>
                                    <div className={styles.previewRow}>
                                        <span>Aulas/semana:</span>
                                        <span className={styles.previewValue}>{total_aulas_semana || '—'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                    <span>O NIF deve ser único para cada professor.</span>
                                </li>
                                <li className={styles.infoItem}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>Selecione os dias clicando nos botões acima.</span>
                                </li>
                                <li className={styles.infoItem}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    <span>Cadastre disciplinas antes de cadastrar professores.</span>
                                </li>
                            </ul>
                            <Link href="/listaprofessor" className={styles.linkButton}>
                                Consultar Lista de Professores →
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

