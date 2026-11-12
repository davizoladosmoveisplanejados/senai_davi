'use client';

import { useEffect, useState, use } from "react";
import Header from "../../components/header";
import styles from "./editaprofessor.module.css";
import { useRouter, useParams } from "next/navigation";

const DIAS_SEMANA = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

export default function EditaProfessorPage({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();

    const resolvedParams = paramsPromise ? use(paramsPromise) : null;
    const id = resolvedParams?.id || routeParams?.id;

    const [disciplinas, setDisciplinas] = useState([]);
    const [id_professor, setIdProfessor] = useState("");
    const [nome, setNome] = useState("");
    const [nif, setNif] = useState("");
    const [diasSelecionados, setDiasSelecionados] = useState([]);
    const [id_disciplina, setIdDisciplina] = useState("");
    const [total_aulas_semana, setTotalAulasSemana] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarDisciplinas();
        if (id) {
            buscarProfessor(id);
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function buscarDisciplinas() {
        const resposta = await fetch('/api/disciplinas');
        const dados = await resposta.json();
        setDisciplinas(dados);
    }

    async function buscarProfessor(idProf) {
        try {
            setCarregando(true);
            const resposta = await fetch(`/api/professores/${idProf}`);

            if (!resposta.ok) {
                alert("Professor não encontrado!");
                router.push("/listaprofessor");
                return;
            }

            const dados = await resposta.json();
            setIdProfessor(dados.id_professor || "");
            setNome(dados.nome || "");
            setNif(dados.nif || "");
            if (dados.dias_aula) {
                const diasArray = dados.dias_aula.split(',').map(d => d.trim()).filter(Boolean);
                setDiasSelecionados(diasArray);
            }
            setIdDisciplina(dados.id_disciplina ? String(dados.id_disciplina) : "");
            setTotalAulasSemana(dados.total_aulas_semana ?? "");
        } catch (erro) {
            console.error("Erro ao carregar professor:", erro);
            alert("Erro ao carregar dados do professor.");
        } finally {
            setCarregando(false);
        }
    }

    function toggleDia(dia) {
        setDiasSelecionados((prev) =>
            prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
        );
    }

    async function editarProfessor(event) {
        event.preventDefault();

        if (!id) {
            alert("ID do professor não foi encontrado.");
            return;
        }

        if (diasSelecionados.length === 0) {
            alert('Selecione ao menos um dia de aula!');
            return;
        }

        if (!id_disciplina) {
            alert('Selecione uma disciplina!');
            return;
        }

        const resposta = await fetch("/api/professores", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_professor,
                nome,
                nif,
                dias_aula: diasSelecionados.join(', '),
                id_disciplina: parseInt(id_disciplina),
                total_aulas_semana: parseInt(total_aulas_semana),
            }),
        });

        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);

        if (resposta.ok) {
            router.push("/listaprofessor");
        }
    }

    if (carregando) {
        return (
            <main className="container">
                <h1>Editar Professor</h1>
                <p>Carregando informações do professor...</p>
            </main>
        );
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>
                        Edição de Professor
                    </h2>

                    <p className={styles.subtitle}>
                        Atualize os dados de <strong>{nome}</strong> no sistema.
                    </p>

                    <form className={styles.form} onSubmit={editarProfessor}>
                        <input type="text" value={id_professor} onChange={(e) => setIdProfessor(e.target.value)} hidden />

                        <div className={styles.inputGroup}>
                            <label htmlFor="nome">Nome do Professor</label>
                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome completo do professor"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="nif">Matrícula (NIF)</label>
                            <input
                                id="nif"
                                type="text"
                                value={nif}
                                onChange={(e) => setNif(e.target.value)}
                                placeholder="Número de identificação funcional"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Dias que Ministra Aula</label>
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
                            <label htmlFor="disciplina">Disciplina Responsável</label>
                            <select
                                id="disciplina"
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

                        <div className={styles.inputGroup}>
                            <label htmlFor="total_aulas_semana">Total de Aulas na Semana</label>
                            <input
                                id="total_aulas_semana"
                                type="number"
                                min="1"
                                value={total_aulas_semana}
                                onChange={(e) => setTotalAulasSemana(e.target.value)}
                                placeholder="Quantidade de aulas por semana"
                                required
                            />
                        </div>

                        <button className={styles.button} type="submit">
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}

