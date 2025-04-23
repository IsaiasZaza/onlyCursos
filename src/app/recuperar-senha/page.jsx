"use client";
import { useState } from "react";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleRecuperarSenha = (e) => {
    e.preventDefault();

    // Simular envio de e-mail
    console.log("Solicitação de recuperação para:", email);
    setMensagem("Se este e-mail estiver cadastrado, você receberá instruções em breve.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Recuperar Senha</h2>

        {mensagem && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-lg">
            {mensagem}
          </div>
        )}

        <form onSubmit={handleRecuperarSenha} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-xl shadow-md transition"
          >
            Enviar Instruções
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Lembrou sua senha?{" "}
            <a href="/login" className="text-cyan-600 hover:underline">Entrar</a>
          </p>
        </div>
      </div>
    </div>
  );
}
