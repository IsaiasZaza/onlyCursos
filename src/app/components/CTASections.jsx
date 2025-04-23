"use client";
import { useRef, useState, useEffect } from "react";

// Componente do fundo interativo com partículas (restrito ao container de fundo escuro)
function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    let width = parent.clientWidth;
    let height = parent.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 300;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationFrameId;

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(97,33,255, ${p.opacity})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}

export default function CTASections() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    mensagem: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");
    setMessageType("");

    try {
      const res = await fetch("https://3jovensapi.vercel.app/enviar-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (data.success) {
        setResponseMessage("Dados enviados com sucesso!");
        setMessageType("success");
        setFormData({
          nome: "",
          email: "",
          whatsapp: "",
          mensagem: "",
        });
      } else {
        setResponseMessage("Erro: " + data.error);
        setMessageType("error");
      }
    } catch (error) {
      setResponseMessage("Erro ao enviar dados: " + error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setResponseMessage("");
        setMessageType("");
      }, 5000);
    }
  }

  const messageClasses =
    messageType === "success"
      ? "bg-green-100 border-green-500 text-green-800"
      : messageType === "error"
      ? "bg-red-100 border-red-500 text-red-800"
      : "";

  return (
    <div
      id="formulario"
      className="relative bg-gradient-to-br from-black via-slate-950 to-black border-t-2 border-transparent h-screen text-[#f5f5f5] py-16 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center mx-auto space-y-8"
      style={{
        borderImage: 'linear-gradient(to left, #000000, #6121ff)',
        borderImageSlice: 1,
      }}
    >
      <InteractiveBackground />
      <div className="relative z-10 w-full max-w-2xl text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Vamos Criar o Seu Site {" "}
          <span className="text-principal">Personalizado</span>
        </h2>
        <p className="mt-4 text-gray-300 text-base sm:text-lg">
          Preencha os campos abaixo para que possamos entrar em contato e
          começar a criar o site dos seus sonhos. Não perca a chance de levar
          sua presença online para o próximo nível!
        </p>
      </div>
      <div className="relative z-10 w-full max-w-xl bg-gradient-to-br from-black via-gray-950 to-black p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl  animate-">
        <form className="space-y-5 card2" onSubmit={handleSubmit}>
          <input
            id="nome"
            type="text"
            placeholder="Digite seu nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-4 rounded-md bg-transparent text-white border-b-2 border-principal focus:outline-none"
            required
          />
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-md bg-transparent text-white border-b-2 border-principal focus:outline-none"
            required
          />
          <input
            id="whatsapp"
            type="tel"
            placeholder="Digite seu WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full p-4 rounded-md bg-transparent text-white border-b-2 border-principal focus:outline-none"
            required
          />
          <textarea
            id="mensagem"
            placeholder="Conte um pouco sobre o seu projeto"
            value={formData.mensagem}
            onChange={handleChange}
            className="w-full p-4 rounded-md bg-transparent text-white border-b-2 border-principal focus:outline-none"
            rows="4"
            required
          ></textarea>
          <button className="btn w-full bg-bule mt-6 px-6 py-3 rounded-md transition duration-300 ease-in-out font-semibold hover:bg-principal focus:outline-none focus:ring-2 focus:ring-principal focus:ring-offset-2">
            {loading ? "Enviando..." : "Quero Criar Meu Site!"}
          </button>
        </form>
      </div>
    </div>
  );
}