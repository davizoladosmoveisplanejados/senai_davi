'use client';

import { useEffect, useState, use } from "react";
import Header from "../../components/header";
import styles from "./editadisciplina.module.css";
import { useRouter, useParams } from "next/navigation";

export default function EditaDisciplinaPage({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();

    const resolvedParams = paramsPromise ? use(paramsPromise) : null;
    const id = resolvedParams?.id || routeParams?.id;

    const [id_disciplina, setIdDisciplina] = useState("");
    const [nome, setNome] = useState("");
    const [pontuacao_minima, setPontuacaoMinima] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (id) {
            buscarDisciplina(id);
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function buscarDisciplina(idDisciplina) {
        try {
            setCarregando(true);
            const resposta = await fetch(`/api/disciplinas/${idDisciplina}`);

            if (!resposta.ok) {
                alert("Disciplina não encontrada!");
                router.push("/listadisciplina");
                return;
            }

            const dados = await resposta.json();
            setIdDisciplina(dados.id_disciplina || "");
            setNome(dados.nome || "");
            setPontuacaoMinima(dados.pontuacao_minima ?? "");
        } catch (erro) {
            console.error("Erro ao carregar disciplina:", erro);
            alert("Erro ao carregar dados da disciplina.");
        } finally {
            setCarregando(false);
        }
    }

    async function editarDisciplina(event) {
        event.preventDefault();

        if (!id) {
            alert("ID da disciplina não foi encontrado.");
            return;
        }

        const resposta = await fetch("/api/disciplinas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_disciplina,
                nome,
                pontuacao_minima: parseFloat(pontuacao_minima),
            }),
        });

        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);

        if (resposta.ok) {
            router.push("/listadisciplina");
        }
    }

    if (carregando) {
        return (
            <main className="container">
                <h1>Editar Disciplina</h1>
                <p>Carregando informações da disciplina...</p>
            </main>
        );
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>
                        Edição de Disciplina
                    </h2>

                    <p className={styles.subtitle}>
                        Atualize os dados de <strong>{nome}</strong> no sistema.
                    </p>

                    <form className={styles.form} onSubmit={editarDisciplina}>
                        <input type="text" value={id_disciplina} onChange={(e) => setIdDisciplina(e.target.value)} hidden />

                        <div className={styles.inputGroup}>
                            <label htmlFor="nome">Nome da Disciplina</label>
                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome da disciplina"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="pontuacao_minima">Pontuação Mínima para Passar</label>
                            <input
                                id="pontuacao_minima"
                                type="number"
                                step="0.1"
                                min="0"
                                max="10"
                                value={pontuacao_minima}
                                onChange={(e) => setPontuacaoMinima(e.target.value)}
                                placeholder="0 a 10"
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

