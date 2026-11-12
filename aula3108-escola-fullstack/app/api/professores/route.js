import db from "@/app/db/banco";
import { NextResponse } from "next/server";

// listar professores com JOIN em disciplinas
export async function GET() {
    const professores = db.prepare(`
        SELECT professores.id_professor, professores.nome, professores.nif,
               professores.dias_aula, professores.total_aulas_semana,
               professores.id_disciplina, disciplinas.nome AS nome_disciplina
        FROM professores
        INNER JOIN disciplinas ON professores.id_disciplina = disciplinas.id_disciplina
        ORDER BY professores.nome
    `).all();
    return NextResponse.json(professores);
}

// cadastrar professor
export async function POST(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`INSERT INTO professores (nome, nif, dias_aula, id_disciplina, total_aulas_semana) VALUES (?, ?, ?, ?, ?)`);
        sql.run(dados.nome, dados.nif, dados.dias_aula, dados.id_disciplina, dados.total_aulas_semana);
        return NextResponse.json({
            mensagem: "Professor cadastrado com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao cadastrar professor ', error);
        return NextResponse.json({ mensagem: "Erro ao cadastrar professor." }, { status: 500 });
    }
}

// editar professor
export async function PUT(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`
            UPDATE professores
            SET nome = ?, nif = ?, dias_aula = ?, id_disciplina = ?, total_aulas_semana = ?
            WHERE id_professor = ?
        `);
        sql.run(dados.nome, dados.nif, dados.dias_aula, dados.id_disciplina, dados.total_aulas_semana, dados.id_professor);
        return NextResponse.json({
            mensagem: "Professor atualizado com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao editar professor ', error);
        return NextResponse.json({ mensagem: "Erro ao editar professor." }, { status: 500 });
    }
}

// excluir professor
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const sql = db.prepare(`DELETE FROM professores WHERE id_professor = ?`);
        sql.run(dados.id_professor);
        return NextResponse.json({
            mensagem: "Professor excluído com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao excluir professor ', error);
        return NextResponse.json({ mensagem: "Erro ao excluir professor." }, { status: 500 });
    }
}

