"use client"

import { Link } from "react-scroll";
import { BiLaptop, BiUser, BiCodeBlock, BiTime } from "react-icons/bi";

const features = [
  {
    icon: <BiUser className="text-principal text-5xl drop-shadow-[0_0_10px_]" />,
    title: "Iniciantes",
    description: "Para quem está começando na área de tecnologia e deseja conquistar a primeira aprovação em concursos públicos de TI, com conteúdos acessíveis e focados no básico."
  },
  {
    icon: <BiLaptop className="text-lime-400 text-5xl drop-shadow-[0_0_10px_#5CF559]" />,
    title: "Concurseiros Experientes",
    description: "Para quem já tem experiência com concursos e busca materiais mais avançados, simulados e estratégias de revisão voltadas para cargos técnicos e de analista de TI."
  },
  {
    icon: <BiCodeBlock className="text-[#7F4DFF] text-5xl drop-shadow-[0_0_10px_#7F4DFF]" />,
    title: "Profissionais de TI",
    description: "Cursos voltados para quem já atua na área e quer migrar para o setor público, com foco em conteúdos específicos como redes, segurança, desenvolvimento e infraestrutura."
  },
  {
    icon: <BiTime className="text-claro text-5xl drop-shadow-[0_0_10px_#9e9e9e]" />,
    title: "Quem tem pouco tempo",
    description: "Para quem concilia trabalho e estudo. Nossos cursos são organizados para otimizar o tempo com trilhas rápidas, resumos e videoaulas objetivas."
  },
];

export default function FeaturesSection() {
  return (
    <section id="publico-alvo" className="bg-black py-16 flex flex-col items-center justify-center">
      {/* Container principal */}
      <div className="container bg-gradient-to-t from-black via-slate-950 to-black py-20 card mx-auto px-6 flex flex-col items-center">
        {/* Título da Seção */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center leading-tight drop-shadow-lg">
          Para quem são nossos <span className="text-principal">cursos?</span>
        </h2>
        {/* Grid de Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-white w-full">
          {features.map((feature, index) => (
            <div key={index} className="card flex flex-col items-center text-left p-6 rounded-xl shadow-lg relative">
              <div className="selector flex items-center justify-center w-16 h-16 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400 text-center text-md">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
