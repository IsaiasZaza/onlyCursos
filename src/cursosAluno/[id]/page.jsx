"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`https://crud-usuario.vercel.app/api/curso/${id}`);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-bold text-gray-600">Carregando curso...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-bold text-red-600">Curso não encontrado.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <Header />
            {/* Hero Section */}
            <div className="relative bg-[url('/Fita_aprentacao_de_cada_curso.png')] bg-cover bg-center h-[45vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40">
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                <div className="relative w-full md:w-1/2 text-left space-y-6">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        {course.title}
                    </p>
                    <p className="text-md md:text-lg text-gray-200">
                        {course.description}
                    </p>
                </div>
            </div>

            {/* About Section */}
            <section className="py-16 px-6">
                <div className="lg:px-36 mx-auto grid gap-x-60 grid-cols-1 lg:grid-cols-2 gap-6  ">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-900">Por que estudar {course.title} pode impulsionar sua carreira na enfermagem?</h2>
                        <p className="mt-6 text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                        </p>
                        <p className="mt-6 text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                        </p>
                        <div className="h-96">
                            <iframe
                                src="https://www.youtube.com/embed/KT3WDc2B_q8?si=XRS-vSd5DAm8dG72"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full py-12">
                            </iframe>
                        </div>
                        <p className="mt-6 text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                        </p>
                        <p className="mt-6 text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                        </p>
                    </div>
                    <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 w-4/6 h-[70vh] sticky top-20">
                        <img src="/logo.png" alt="Cetma Logo" className="w-24 h-24 " />
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">{course.title}</h2>
                        <ul className="mt-4 text-gray-700 text-left space-y-2">
                            {[
                                "Acesso vitalício",
                                "Acesso imediato",
                                "Professores para tirar dúvidas",
                                "100% Online",
                                "Certificados aprovados pelo MEC",
                                "E muito mais"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <FaCheckCircle className="text-blue-500" /> {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 text-blue-900 text-center">
                            <p className="line-through text-lg flex items-center justify-center gap-2">
                                <IoMdPricetag className="text-red-500" /> de R$ {course.price * 0.8}
                            </p>
                            <p className="text-4xl font-extrabold">R$ {course.price}</p>
                            <p className="text-sm font-medium">em até 6x sem juros</p>
                        </div>
                        <a
                            href="/login"
                            className="mt-6 inline-block bg-gradient-to-r w-full from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
                        >
                            Aprenda Agora
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default CourseDetail;
