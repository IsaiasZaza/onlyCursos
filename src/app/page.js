import { BookOpen, CheckCircle, Code, Laptop, Star } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CTASections from "./components/CTASections";
import FeaturesSection from "./components/FeatureSection";


const courses = [
  {
    title: "Redes de Computadores para Concursos",
    icon: <Laptop className="w-6 h-6 text-cyan-400" />,
    description: "Domine os principais tópicos exigidos em concursos públicos na área de redes.",
  },
  {
    title: "Segurança da Informação Essencial",
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75c-1.636 0-3.295-.45-4.65-1.372a.75.75 0 00-.9 0A9.52 9.52 0 013 3.75c0 6.215 2.31 10.736 6.9 13.8a.75.75 0 00.9 0C14.69 14.486 17 9.965 17 3.75a9.52 9.52 0 00-3.45-1.372.75.75 0 00-.9 0A9.26 9.26 0 0112 3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 11.25l1.5 1.5 3-3" />
      </svg>
    ),
    description: "Aprenda os fundamentos e boas práticas cobradas em provas de segurança da informação.",
  },
  {
    title: "Linguagens de Programação e Algoritmos",
    icon: <Code className="w-6 h-6 text-cyan-400" />,
    description: "Prepare-se para as questões mais comuns sobre lógica e programação.",
  },
];

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[700px] overflow-hidden flex items-center justify-center text-center">
        {/* Background video (iframe) */}
        <div className="absolute inset-0 z-0">
          <iframe
            className="w-full h-full object-cover"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&modestbranding=1&showinfo=0"
            title="Video Background"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>

        {/* Foreground content */}
        <div className="relative z-10 px-6 max-w-3xl text-white">
          <h1 className="text-4xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Cursos de TI para Concursos Públicos
          </h1>
          <p className="text-zinc-100 text-2xl max-w-2xl mx-auto mb-8">
            Aumente suas chances de aprovação com os melhores conteúdos focados em concursos de tecnologia.
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-2xl text-lg shadow-xl transition duration-300">
            Comece Agora
          </button>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-zinc-800 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="hover:scale-105 transition-transform duration-300">
            <Star className="w-10 h-10 mx-auto text-yellow-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Conteúdo Atualizado</h3>
            <p className="text-zinc-400">Cursos alinhados com os últimos editais.</p>
          </div>
          <div className="hover:scale-105 transition-transform duration-300">
            <CheckCircle className="w-10 h-10 mx-auto text-green-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Foco em Aprovação</h3>
            <p className="text-zinc-400">Material direto ao ponto, focado nas bancas.</p>
          </div>
          <div className="hover:scale-105 transition-transform duration-300">
            <BookOpen className="w-10 h-10 mx-auto text-cyan-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Didática Simples</h3>
            <p className="text-zinc-400">Entenda mesmo os conteúdos mais difíceis.</p>
          </div>
        </div>
      </section>

      <section
        className="relative bg-[url('https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center bg-fixed text-center py-32 px-6"
      >
        <div className="bg-black/60 absolute inset-0 z-0"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            Faça parte dos que estão se preparando da forma certa.
          </p>
          <button className="bg-white text-cyan-600 px-8 py-3 rounded-2xl font-semibold shadow-lg hover:bg-gray-100 transition">
            Acessar Plataforma
          </button>
        </div>
      </section>

      {/* Cursos em destaque */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-cyan-300 mb-12">
          Nossos Cursos em Destaque
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-zinc-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-4">{course.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-zinc-400">{course.description}</p>
            </div>
          ))}
        </div>
      </section>
      <FeaturesSection />
      <CTASections />
      <Footer />


    </div>
  );
}
