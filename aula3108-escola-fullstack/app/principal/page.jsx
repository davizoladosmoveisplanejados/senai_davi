import Header from "../components/header";
import Link from "next/link";
import styles from "./principal.module.css";
import Image from "next/image";
import sesi from '../../public/sesi.png';
import sesiescola from '../../public/sesi-escola.png';
import volei from '../../public/volei.jpg';
import alunos from '../../public/images.jpg';
import notas from '../../public/notas.jpg';

export default function Principal() {
    return (
        <>
            <Header />

            {/* ===== HERO SECTION ===== */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <span className={styles.heroTag}>Bem-vindo ao SESI</span>
                        <h2 className={styles.heroTitle}>
                            Educação de <span className="accent">qualidade</span> para o futuro
                        </h2>
                        <p className={styles.heroDesc}>
                            Sistema completo de gestão escolar do SESI.
                            Gerencie alunos, notas e acompanhe o desempenho acadêmico
                            de forma simples e eficiente.
                        </p>
                        <div className={styles.heroBtns}>
                            <Link href="/cadaluno" className={styles.btnPrimary}>
                                Cadastrar Aluno
                            </Link>
                            <Link href="/listaluno" className={styles.btnSecondary}>
                                Ver Alunos
                            </Link>
                        </div>
                    </div>

                    {/* ESPAÇO PARA SUA IMAGEM DO HERO */}
                    <div className={styles.heroImageWrapper}>
                        <Image src={sesi} alt="Descrição" width={500} height={375} />
                    </div>
                </div>
            </section>

            {/* ===== STATS / DESTAQUES ===== */}
            <section className={styles.stats}>
                <div className={styles.statsInner}>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>500+</div>
                        <div className={styles.statLabel}>Alunos Matriculados</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>50+</div>
                        <div className={styles.statLabel}>Professores</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>20+</div>
                        <div className={styles.statLabel}>Cursos Disponíveis</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNumber}>98%</div>
                        <div className={styles.statLabel}>Aprovação</div>
                    </div>
                </div>
            </section>

            {/* ===== SOBRE ===== */}
            <section className={styles.about}>
                <div className={styles.aboutInner}>
                    {/* ESPAÇO PARA SUA IMAGEM DO SOBRE */}
                    <div className={styles.aboutImageWrapper}>
                        <Image src={sesiescola} alt="Sobre o SESI" />
                    </div>
                    <div className={styles.aboutText}>
                        <span className={styles.sectionTag}>Sobre Nós</span>
                        <h2 className={styles.sectionTitle}>
                            Conheça o <span className="accent">SESI</span> Escola
                        </h2>
                        <p className={styles.sectionDesc}>
                            O SESI oferece educação de excelência com infraestrutura moderna,
                            professores qualificados e uma metodologia que prepara os alunos
                            para os desafios do futuro. Nosso compromisso é com o desenvolvimento
                            integral do estudante.
                        </p>
                        <p className={styles.sectionDesc}>
                            Com um sistema de gestão escolar integrado, acompanhamos o desempenho
                            de cada aluno de forma personalizada, garantindo que todos alcancem
                            seu máximo potencial.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== FUNCIONALIDADES ===== */}
            <section className={styles.features}>
                <div className={styles.featuresInner}>
                    <div className={styles.featuresHeader}>
                        <span className={styles.sectionTag}>Funcionalidades</span>
                        <h2 className={styles.sectionTitle}>
                            O que você pode <span className="accent">fazer</span>
                        </h2>
                    </div>
                    <div className={styles.featuresGrid}>
                        {/* CARD 1 */}
                        <div className={styles.featureCard}>
                            {/* ESPAÇO PARA SUA IMAGEM */}
                            <div className={styles.featureImageWrapper}>
                                <Image src={volei} alt="Cadastro" />
                            </div>
                            <div className={styles.featureBody}>
                                <h3>Cadastro de Alunos</h3>
                                <p>Registre novos alunos com todos os dados necessários de forma rápida e organizada.</p>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className={styles.featureCard}>
                            {/* ESPAÇO PARA SUA IMAGEM */}
                            <div className={styles.featureImageWrapper}>
                                <Image src={alunos} alt="Listagem" />
                            </div>
                            <div className={styles.featureBody}>
                                <h3>Listagem Completa</h3>
                                <p>Visualize todos os alunos cadastrados com filtros e busca avançada.</p>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className={styles.featureCard}>
                            {/* ESPAÇO PARA SUA IMAGEM */}
                            <div className={styles.featureImageWrapper}>
                                <Image src={notas} alt="Notas" />
                            </div>
                            <div className={styles.featureBody}>
                                <h3>Gestão de Notas</h3>
                                <p>Cadastre e acompanhe as notas dos alunos em todas as disciplinas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== BANNER CTA ===== */}
            <section className={styles.cta}>
                <div className={styles.ctaInner}>
                    <h2 className={styles.ctaTitle}>Comece a gerenciar agora</h2>
                    <p className={styles.ctaDesc}>
                        Cadastre alunos, registre notas e tenha controle total
                        do desempenho acadêmico em um só lugar.
                    </p>
                    <Link href="/cadaluno" className={styles.btnWhite}>
                        Começar Agora →
                    </Link>
                </div>
            </section>
            {/* ===== FOOTER ===== */}
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