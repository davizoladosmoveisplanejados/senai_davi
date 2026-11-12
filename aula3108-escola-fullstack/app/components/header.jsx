'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./header.module.css";

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    // Fechar menu com a tecla ESC
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                setMenuOpen(false);
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Evitar rolagem de fundo quando o menu estiver aberto
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const menuSections = [
        {
            title: "Navegação",
            items: [
                {
                    href: "/",
                    label: "Início",
                    icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    )
                }
            ]
        },
        {
            title: "Alunos",
            items: [
                {
                    href: "/cadaluno",
                    label: "Cadastrar Aluno",
                    icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <line x1="20" y1="8" x2="20" y2="14" />
                            <line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                    )
                },
                {
                    href: "/listaluno",
                    label: "Lista de Alunos",
                    icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    )
                }
            ]
        },
        {
            title: "Notas e Avaliações",
            items: [
                {
                    href: "/notaluno",
                    label: "Lançar Notas",
                    icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="12" y1="18" x2="12" y2="12" />
                            <line x1="9" y1="15" x2="15" y2="15" />
                        </svg>
                    )
                },
                {
                    href: "/listanota",
                    label: "Boletim / Lista de Notas",
                    icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                    )
                }
            ]
        },
        {
            title: "Disciplinas",
            items: [
                {
                    href: "/caddisciplina",
                    label: "Cadastrar Disciplina",
                    icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            <line x1="12" y1="11" x2="12" y2="17" />
                            <line x1="9" y1="14" x2="15" y2="14" />
                        </svg>
                    )
                },
                {
                    href: "/listadisciplina",
                    label: "Lista de Disciplinas",
                    icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                    )
                }
            ]
        },
        {
            title: "Professores",
            items: [
                {
                    href: "/cadprofessor",
                    label: "Cadastrar Professor",
                    icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                            <line x1="19" y1="8" x2="19" y2="14" />
                            <line x1="22" y1="11" x2="16" y2="11" />
                        </svg>
                    )
                },
                {
                    href: "/listaprofessor",
                    label: "Lista de Professores",
                    icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    )
                }
            ]
        }
    ];

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
                    <span className={styles.accent}>SESI</span> Escola
                </Link>

                {/* Botão Sanduíche */}
                <button
                    className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menu de navegação"
                    aria-expanded={menuOpen}
                >
                    <span className={styles.menuBtnText}>{menuOpen ? "Fechar" : "Menu"}</span>
                    <div className={styles.hamburgerIcon}>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </div>
                </button>
            </div>

            {/* Overlay com desfoque */}
            {menuOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Gaveta Lateral (Sidebar Drawer) */}
            <nav
                className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
                aria-label="Menu principal"
            >
                <div className={styles.drawerHeader}>
                    <span className={styles.drawerTitle}>
                        <span className={styles.accent}>SESI</span> Navegação
                    </span>
                    <button
                        className={styles.drawerCloseBtn}
                        onClick={() => setMenuOpen(false)}
                        aria-label="Fechar menu"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className={styles.drawerContent}>
                    {menuSections.map((section) => (
                        <div key={section.title} className={styles.menuSection}>
                            <span className={styles.sectionLabel}>{section.title}</span>
                            {section.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className={styles.linkIcon}>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className={styles.drawerFooter}>
                    SESI Escola — Sistema de Gestão 2026
                </div>
            </nav>
        </header>
    );
}
