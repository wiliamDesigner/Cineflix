import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const dados = await request.json();

    const email = dados.email?.trim();
    const senha = dados.senha;

    if (!email || !senha) {
      return Response.json(
        {
          mensagem: "E-mail e senha são obrigatórios.",
        },
        {
          status: 400,
        }
      );
    }

    const usuarioExistente = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (usuarioExistente) {
      return Response.json(
        {
          mensagem: "Este e-mail já está cadastrado.",
        },
        {
          status: 409,
        }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.user.create({
      data: {
        nome: "Usuário",
        email: email,
        senha: senhaHash,
      },
    });

    return Response.json(
      {
        mensagem: "Usuário criado com sucesso!",
        usuario: {
          id: usuario.id,
          email: usuario.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (erro) {
    console.error("=================================");
    console.error("ERRO REAL DO CADASTRO:");
    console.error(erro);
    console.error("=================================");

    return Response.json(
      {
        mensagem: "Erro ao criar usuário.",
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}