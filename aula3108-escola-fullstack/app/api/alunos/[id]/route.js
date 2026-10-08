import db from "@/app/db/banco";
import { NextResponse } from "next/server";

// buscar um aluno pelo id
export async function GET(request, { params }) {
    const { id } = await params;
    const aluno = db.prepare("SELECT * FROM alunos WHERE id_aluno = ?").get(id);
    if (!aluno) {
        return NextResponse.json({ erro: "Aluno não encontrado." }, { status: 404 });
    }
    return NextResponse.json(aluno);
}

// atualizar um aluno pelo id
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const dados = await request.json();
        const sql = db.prepare(`
            UPDATE alunos
            SET nome = ?, idade = ?, serie = ?, ra = ?
            WHERE id_aluno = ?
        `);
        sql.run(dados.nome, dados.idade, dados.serie, dados.ra, id);
        return NextResponse.json({ mensagem: "Aluno atualizado com sucesso!" });
    } catch (error) {
        console.error('Erro ao editar o aluno ', error);
        return NextResponse.json({ erro: "Erro ao editar o aluno." }, { status: 500 });
    }
}
