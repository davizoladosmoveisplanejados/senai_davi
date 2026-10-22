'use client';

import { useEffect, useState, use } from "react";
import Header from "../../components/header";
import styles from "./editanota.module.css";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditNotaPage({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();

    const resolvedParams = paramsPromise ? use(paramsPromise) : null;
    const id = resolvedParams?.id || routeParams?.id;

    const [id_nota, setIdNota] = useState("");
    const [t1, setT1] = useState("");
    const [t2, setT2] = useState("");
    const [n1, setN1] = useState("");
    const [n2, setN2] = useState("");
    const [n3, setN3] = useState("");
    const [nomeAluno, setNomeAluno] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (id) {
            buscarNota(id);
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function buscarNota(idNota) {
        try {
            setCarregando(true);
            const resposta = await fetch(`/api/notas/${idNota}`);

            if (!resposta.ok) {
                alert("Nota não encontrada!");
                router.push("/listanota");
                return;
            }

            const dados = await resposta.json();
            setIdNota(dados.id_nota || "");
            setT1(dados.t1 ?? "");
            setT2(dados.t2 ?? "");
            setN1(dados.n1 ?? "");
            setN2(dados.n2 ?? "");
            setN3(dados.n3 ?? "");
            setNomeAluno(dados.nome || "");
        } catch (erro) {
            console.error("Erro ao carregar nota:", erro);
            alert("Erro ao carregar dados da nota.");
        } finally {
            setCarregando(false);
        }
    }

    async function editarNota(event) {
        event.preventDefault();

        if (!id) {
            alert("ID da nota não foi encontrado.");
            return;
        }

        const resposta = await fetch("/api/notas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id_nota,
                t1,
                t2,
                n1,
                n2,
                n3,
            }),
        });

        const dados = await resposta.json();
        alert(dados.mensagem || dados.erro);

        if (resposta.ok) {
            router.push("/listanota");
        }
    }

    if (carregando) {
        return (
            <main className="container">
                <h1>Editar Nota</h1>
                <p>Carregando informações da nota...</p>
            </main>
        );
    }

    return (
        <>
            <Header />

            <main className={styles.container}>
                <div className={styles.card}>
                    <h2 className={styles.title}>
                        Edição de Notas
                    </h2>

                    <p className={styles.subtitle}>
                        Atualize as avaliações de <strong>{nomeAluno}</strong> no sistema.
                    </p>

                    <form className={styles.form} onSubmit={editarNota}>
                        <input type="text" value={id_nota} onChange={(e) => setIdNota(e.target.value)} hidden />

                        <div className={styles.sectionTitle}>Trabalhos</div>

                        <div className={styles.formRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="t1">1º Trabalho</label>
                                <input
                                    id="t1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={t1}
                                    onChange={(e) => setT1(e.target.value)}
                                    placeholder="0 a 10"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="t2">2º Trabalho</label>
                                <input
                                    id="t2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={t2}
                                    onChange={(e) => setT2(e.target.value)}
                                    placeholder="0 a 10"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.sectionTitle}>Avaliações</div>

                        <div className={styles.formRow3}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="n1">Nota 1</label>
                                <input
                                    id="n1"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n1}
                                    onChange={(e) => setN1(e.target.value)}
                                    placeholder="0 a 10"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n2">Nota 2</label>
                                <input
                                    id="n2"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n2}
                                    onChange={(e) => setN2(e.target.value)}
                                    placeholder="0 a 10"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="n3">Nota 3</label>
                                <input
                                    id="n3"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    value={n3}
                                    onChange={(e) => setN3(e.target.value)}
                                    placeholder="0 a 10"
                                    required
                                />
                            </div>
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
