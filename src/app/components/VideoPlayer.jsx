"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { FaChevronLeft, FaChevronRight, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
// Componente de menu hamburger (exemplo: hamburger-react)
import { Squash as Hamburger } from "hamburger-react";

export default function VideoPlayer() {
  const router = useRouter();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Estados para controlar se é mobile e o menu
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detecta se a tela é mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Carrega o curso e subcursos
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://api-only-mu.vercel.app/api/curso/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Erro ao buscar curso:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  // Cria a lista de aulas (incluindo vídeo introdutório, se houver)
  const lessons = course
    ? course.videoUrl
      ? [
        {
          id: course.id,
          title: `Introdução: ${course.title}`,
          description: course.description,
          videoUrl: course.videoUrl,
        },
        ...(course.subCourses || []),
      ]
      : (course.subCourses || [])
    : [];

  // Define o vídeo inicial
  useEffect(() => {
    if (lessons.length > 0 && !currentVideoUrl) {
      setCurrentVideoUrl(lessons[0].videoUrl);
      setCurrentLessonIndex(0);
    }
  }, [lessons, currentVideoUrl]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback enviado:", feedback);
    setFeedback("");
  };

  // Troca de vídeo
  const changeVideo = (url, index) => {
    setCurrentVideoUrl(url);
    setCurrentLessonIndex(index);
    // Fecha o menu no mobile
    if (isMobile) setMenuOpen(false);
  };

  // Navegação entre aulas
  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const newIndex = currentLessonIndex - 1;
      setCurrentLessonIndex(newIndex);
      setCurrentVideoUrl(lessons[newIndex].videoUrl);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      const newIndex = currentLessonIndex + 1;
      setCurrentLessonIndex(newIndex);
      setCurrentVideoUrl(lessons[newIndex].videoUrl);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-[#0A1F2C] text-white min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="lg:p-8 px-4 py-8 bg-[#0A1F2C] text-white min-h-screen flex flex-col md:flex-row relative">
      {/* Botão hamburger (apenas no mobile) */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <Hamburger toggled={menuOpen} toggle={setMenuOpen} color="#fff" size={24} />
        </div>
      )}

      {/* Seção do vídeo + feedback (coluna principal) */}
      <div className="w-full md:w-3/4 md:pr-8 mb-8 md:mb-0">
        <Link
          href="/aluno"
          className="text-[#4A90E2] hover:text-white mb-6 flex items-center gap-2 transform hover:scale-105 transition text-lg"
        >
          <FaChevronLeft className="text-xl" /> Voltar
        </Link>

        {/* Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 bg-gradient-to-br from-[#1A2635] to-[#0F1A27]"
        >
          <ReactPlayer
            key={currentVideoUrl}
            url={currentVideoUrl}
            controls
            width="100%"
            height="68vh"
            className="rounded-none w-[80vh]"
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  controls: 1,
                  disablekb: 1,
                  fs: 0,
                  iv_load_policy: 3,
                  origin: typeof window !== "undefined" ? window.location.origin : "",
                },
              },
            }}
          />
        </motion.div>

        {/* Controles de navegação */}
        <div className="mt-6 flex items-center justify-between border-b border-[#1A2635] pb-2">
          <h2 className="lg:text-3xl text-xl font-semibold text-[#4A90E2]">
            {lessons[currentLessonIndex]?.title}
          </h2>
          <div className="flex gap-6">
            <button
              onClick={goToPreviousLesson}
              disabled={currentLessonIndex === 0}
              className={`lg:p-4 p-2 text-white rounded-lg text-xl flex items-center justify-center transition-all ${currentLessonIndex === 0
                  ? "bg-[#4A90E2]/50 cursor-not-allowed"
                  : "bg-[#4A90E2] hover:bg-[#357ABD]"
                }`}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goToNextLesson}
              disabled={currentLessonIndex === lessons.length - 1}
              className={`lg:p-4 p-2 text-white rounded-lg text-xl flex items-center justify-center transition-all ${currentLessonIndex === lessons.length - 1
                  ? "bg-[#4A90E2]/50 cursor-not-allowed"
                  : "bg-[#4A90E2] hover:bg-[#357ABD]"
                }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>  
      </div>

      {/* Seção de módulos (menu) */}
      <div
        className={`
          fixed top-0 right-0 
          lg:w-[25%] w-[80%] md:w-1/4 
          h-full z-40 
          bg-gradient-to-b from-[#16222A] to-[#3A6073] 
          p-6 shadow-2xl overflow-y-auto rounded-l-2xl
          transform transition-transform duration-300
          md:block
          ${isMobile ? (menuOpen ? "block" : "hidden") : ""}
        `}
      >
        <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#357ABD] animate-pulse">
          Módulos
        </h1>
        {lessons.map((lesson, index) => (
          <motion.button
            key={lesson.id}
            onClick={() => changeVideo(lesson.videoUrl, index)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-start px-4 py-3 mb-4 rounded-xl font-bold text-lg transition transform ${currentLessonIndex === index
                ? "bg-gradient-to-r from-[#357ABD] to-[#4A90E2] ring-2 ring-[#4A90E2]"
                : "bg-[#1A3A55] hover:bg-[#357ABD]"
              } text-white`}
          >
            {lesson.title}
          </motion.button>
        ))}
      </div>

      {/* Botão flutuante de atendimento */}
      <Link href="/atendimento">
        <button className="fixed bottom-8 right-8 bg-[#4A90E2] p-4 rounded-full text-white shadow-lg hover:bg-[#357ABD] transition">
          <FaPhoneAlt className="text-2xl" />
        </button>
      </Link>
    </div>
  );
}
