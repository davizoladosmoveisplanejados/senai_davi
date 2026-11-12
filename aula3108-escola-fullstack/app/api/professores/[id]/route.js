import { NextResponse } from "next/server";
import db from "../../../db/banco";

// buscar professor por id_professor
export async function GET(request, { params }) {
    try {
        const resolvedParams = await params;
        const id = resolvedParams?.id;

        const professor = db.prepare(`
            SELECT professores.id_professor, professores.nome, professores.nif,
                   professores.dias_aula, professores.total_aulas_semana,
                   professores.id_disciplina, disciplinas.nome AS nome_disciplina
            FROM professores
            INNER JOIN disciplinas ON professores.id_disciplina = disciplinas.id_disciplina
            WHERE professores.id_professor = ?
        `).get(id);

        if (!professor) {
            return NextResponse.json(
                { erro: "Professor não encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(professor);
    } catch (erro) {
        return NextResponse.json(
            { erro: "Erro ao buscar professor" },
            { status: 500 }
        );
    }
}

