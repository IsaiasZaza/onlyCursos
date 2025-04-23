"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [profissao, setProfissao] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // unified for success and error

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (senha !== confirmarSenha) {
      setMessage({ type: "error", text: "As senhas não coincidem. Tente novamente." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3003/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, profissao, cpf, role: "ALUNO" }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Cadastro realizado com sucesso!" });
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setMessage({ type: "error", text: data.message || "Erro ao cadastrar." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro inesperado. Tente novamente." });
      console.error("Erro inesperado:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-cyan-200 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-cyan-200">
        <h2 className="text-3xl font-extrabold text-center text-cyan-700 mb-6">Criar Conta</h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-cyan-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400"
              placeholder="Seu nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400"
              placeholder="Crie uma senha"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-700">Confirmar Senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400"
              placeholder="Repita sua senha"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-700">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400"
              placeholder="123.456.789-00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-700">Profissão</label>
            <input
              type="text"
              value={profissao}
              onChange={(e) => setProfissao(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-cyan-300 rounded-xl focus:ring-2 focus:ring-cyan-400"
              placeholder="Sua profissão"
            />
          </div>

          {message && (
            <p className={`text-sm text-center ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl shadow-md transition text-white ${loading ? "bg-cyan-300" : "bg-cyan-500 hover:bg-cyan-600"}`}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Já tem uma conta?{" "}
            <a href="/login" className="text-cyan-600 hover:underline font-medium">Entrar</a>
          </p>
        </div>
      </div>
    </div>
  );
}
