"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem(null);

    try {
      const response = await fetch("https://api-only-mu.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, role: "ALUNO" }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem({ type: "success", text: "Login realizado com sucesso!" });
        localStorage.setItem("token", data.token);
        router.replace("/aluno");
      } else {
        setMensagem({ type: "error", text: data.message });
      }
    } catch (error) {
      setMensagem({ type: "error", text: "Erro inesperado. Tente novamente." });
      console.error("Erro inesperado:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-white to-cyan-200 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 w-full max-w-md border border-cyan-200">
        <h2 className="text-3xl font-extrabold text-center text-cyan-700 mb-6">Entrar</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cyan-700">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-cyan-700">Senha</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="mt-1 w-full px-4 py-2 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                className="absolute top-2.5 right-3 text-gray-500"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          {mensagem && (
            <p className={`text-center text-sm ${mensagem.type === "error" ? "text-red-600" : "text-green-600"}`}>
              {mensagem.text}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-xl shadow-md transition"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Esqueceu sua senha?{" "}
            <a href="/recuperar-senha" className="text-cyan-600 hover:underline font-medium">Clique aqui</a>
          </p>
          <p className="mt-2">
            Ainda não tem uma conta?{" "}
            <a href="/cadastro" className="text-cyan-600 hover:underline font-medium">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}
