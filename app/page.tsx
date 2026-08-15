"use client";

import "./page.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  async function fazerLogin() {
    console.log("Cliquei");

    const resposta = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    const dados = await resposta.json();

    console.log("Resposta do login:", dados);

    if (resposta.ok) {
  router.push("/filmes");
}else {
  alert("Email ou senha errada")
}
    
  }

  

  async function fazerCadastro() {
    const resultado = await fetch("/api/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    const dados = await resultado.json();

    console.log("Resposta do cadastro:", dados);
  }

  return (
    <div className="login">
      <div className="login-card">
        <div className="login-header">
          <img className="slogan" src="/img/slogan.png" />
        </div>

        <div className="bemvindo">
          <p>Bem-vindo de volta</p>
        </div>

        <div className="label">
          <p className="email">E-mail</p>

          <div className="inputlabel">
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="label">
          <p className="senha">senha</p>

          <div className="inputlabel">
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
        </div>

        <button onClick={fazerLogin} className="botao">
          Entrar
        </button>

        <div className="ou">
          <p>ou</p>
        </div>

        <button onClick={fazerCadastro} className="botao2">
          Criar conta
        </button>

        <div>
          <p className="esqueceu">
            Esqueceu a senha?
            <a className="esqueceu2" href="">
              Recuperar senha
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}