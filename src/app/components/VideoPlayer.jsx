"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ReactPlayer from "react-player";
import { FaChevronLeft, FaChevronRight, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "lucide-react";

export default function VideoPlayer() {
    const router = useRouter();
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentVideoUrl, setCurrentVideoUrl] = useState("");
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    // Detecta se é mobile
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Buscar curso
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

    // Buscar perguntas
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:3003/api/perguntas/${id}`);
                const data = await response.json();
                console.log(data);

                setQuestions(data);
            } catch (error) {
                console.error("Erro ao buscar perguntas:", error);
            }
        };
        if (id) fetchQuestions();
    }, [id]);

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
            : course.subCourses || []
        : [];

    useEffect(() => {
        if (lessons.length > 0 && !currentVideoUrl) {
            setCurrentVideoUrl(lessons[0].videoUrl);
            setCurrentLessonIndex(0);
        }
    }, [lessons, currentVideoUrl]);

    const changeVideo = (url, index) => {
        setCurrentVideoUrl(url);
        setCurrentLessonIndex(index);
        if (isMobile) setMenuOpen(false);
    };

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
            {/* Hamburger */}
            {isMobile && (
                <div className="fixed top-4 right-4 z-50">
                    <Hamburger toggled={menuOpen} toggle={setMenuOpen} color="#fff" size={24} />
                </div>
            )}

            {/* Video e conteúdo */}
            <div className="w-full md:w-3/4 md:pr-8 mb-8 md:mb-0">
                <Link
                    href="/aluno"
                    className="text-[#4A90E2] hover:text-white mb-6 flex items-center gap-2 transform hover:scale-105 transition text-lg"
                >
                    <FaChevronLeft className="text-xl" /> Voltar
                </Link>

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

                {/* Navegação */}
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

                {/* Perguntas */}
                {questions.length > 0 && (
                    <div className="mt-8 space-y-4">
                        <h3 className="text-3xl font-bold text-[#4A90E2] mb-6">Questionario</h3>
                        {questions.map((q, idx) => (
                            <Disclosure key={q.id}>
                                {({ open }) => (
                                    <div className="bg-[#1A2635] border border-gray-700/50 rounded-xl shadow-lg overflow-hidden">
                                        <Disclosure.Button className="flex justify-between items-center w-full px-4 py-4 text-left text-white text-lg font-semibold hover:bg-[#2A3A4D] transition">
                                            <span>{idx + 1}. {q.title}</span>
                                            <ChevronUp
                                                className={`w-5 h-5 text-[#4A90E2] transition-transform duration-200 ${open ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="px-4 pb-6 pt-2 text-white">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {q.options.map((opt, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: opt })}
                                                        className={`p-3 rounded-lg border text-left transition-all ${selectedAnswers[q.id] === opt
                                                                ? "bg-[#4A90E2] text-white border-[#4A90E2]"
                                                                : "bg-white text-black hover:bg-[#e0e0e0]"
                                                            }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                            {selectedAnswers[q.id] && (
                                                <p
                                                    className={`mt-4 font-medium ${selectedAnswers[q.id] === q.answer
                                                            ? "text-green-400"
                                                            : "text-red-400"
                                                        }`}
                                                >
                                                    {selectedAnswers[q.id] === q.answer
                                                        ? "Correto!"
                                                        : `Errado. Resposta correta: ${q.answer}`}
                                                </p>
                                            )}
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                )}
            </div>

            {/* Menu lateral */}
            <div
                className={`fixed top-0 right-0 lg:w-[25%] w-[80%] md:w-1/4 h-full z-40 bg-gradient-to-b from-[#16222A] to-[#3A6073] p-6 shadow-2xl overflow-y-auto rounded-l-2xl transform transition-transform duration-300 md:block ${isMobile ? (menuOpen ? "block" : "hidden") : ""
                    }`}
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

            {/* Botão flutuante */}
            <Link href="/atendimento">
                <button className="fixed bottom-8 right-8 bg-[#4A90E2] p-4 rounded-full text-white shadow-lg hover:bg-[#357ABD] transition">
                    <FaPhoneAlt className="text-2xl" />
                </button>
            </Link>
        </div>
    );
}
