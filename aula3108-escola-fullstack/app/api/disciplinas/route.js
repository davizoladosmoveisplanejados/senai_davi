import db from "@/app/db/banco";
import { NextResponse } from "next/server";

// listar disciplinas
export async function GET() {
    const disciplinas = db.prepare(`
        SELECT id_disciplina, nome, pontuacao_minima
        FROM disciplinas
        ORDER BY nome
    `).all();
    return NextResponse.json(disciplinas);
}

// cadastrar disciplina
export async function POST(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`INSERT INTO disciplinas (nome, pontuacao_minima) VALUES (?, ?)`);
        sql.run(dados.nome, dados.pontuacao_minima);
        return NextResponse.json({
            mensagem: "Disciplina cadastrada com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao cadastrar disciplina ', error);
        return NextResponse.json({ mensagem: "Erro ao cadastrar disciplina." }, { status: 500 });
    }
}

// editar disciplina
export async function PUT(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`
            UPDATE disciplinas
            SET nome = ?, pontuacao_minima = ?
            WHERE id_disciplina = ?
        `);
        sql.run(dados.nome, dados.pontuacao_minima, dados.id_disciplina);
        return NextResponse.json({
            mensagem: "Disciplina atualizada com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao editar disciplina ', error);
        return NextResponse.json({ mensagem: "Erro ao editar disciplina." }, { status: 500 });
    }
}

// excluir disciplina
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`DELETE FROM disciplinas WHERE id_disciplina = ?`);
        sql.run(dados.id_disciplina);
        return NextResponse.json({
            mensagem: "Disciplina excluída com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao excluir disciplina ', error);
        return NextResponse.json({ mensagem: "Erro ao excluir disciplina." }, { status: 500 });
    }
}

