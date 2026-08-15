import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const dados = await request.json();

    const email = dados.email;
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

    const usuario = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      return Response.json(
        {
          mensagem: "E-mail ou senha incorretos.",
        },
        {
          status: 401,
        }
      );
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaCorreta) {
      return Response.json(
        {
          mensagem: "E-mail ou senha incorretos.",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
        mensagem: "Login realizado com sucesso!",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
      },
      {
        status: 200,
      }
    );
  } catch (erro) {
    console.error("Erro no login:", erro);

    return Response.json(
      {
        mensagem: "Erro interno ao realizar login.",
      },
      {
        status: 500,
      }
    );
  }
}