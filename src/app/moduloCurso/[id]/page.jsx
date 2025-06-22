"use client";

import { useEffect, useState } from "react";
import MenuLateral from "../../../components/MenuLateral";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const moduloCurso = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleRedirect = (url) => {
        router.push(url);
    };

    const Card = ({ title, description, videoUrl }) => (
        <div className="bg-gray-200 border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform duration-300 flex flex-col items-center p-6 h-80">
            <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{title}</h3>
            <p className="text-sm text-gray-600 text-center flex-grow">{description}</p>
            {videoUrl && (
                <button
                    onClick={() => handleRedirect(`/playerVideo/${course.id}`)}
                    className="mt-auto bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors w-full text-center"
                >
                    Assistir Aula
                </button>
            )}
        </div>
    );

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`https://api-only-mu.vercel.app/api/curso/${id}`);
                const data = await response.json();

                const formattedCourse = {
                    ...data,
                    subCourses: [
                        {
                            id: data.id,
                            title: `Introdução: ${data.title}`,
                            description: data.description,
                            videoUrl: data.videoUrl,
                        },
                        ...(data.subCourses || []),
                    ],
                };
                console.log(data);

                setCourse(formattedCourse);
            } catch (error) {
                console.error("Erro ao buscar curso:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCourse();
    }, [id]);

    console.log(course);
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
        <div className="flex h-screen">
            <MenuLateral />

            <div className="flex-grow flex flex-col overflow-y-auto">
                <section className="relative md:bg-modulos bg-mobile-padrao py-32 bg-cover bg-center h-[70vh] text-white flex flex-col justify-center items-start px-4 sm:px-8 md:px-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
                    <div className="relative w-full sm:w-3/4 lg:w-2/3 text-left space-y-4 sm:space-y-6">
                        <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase text-blue-300">
                            CENTRO EDUCACIONAL TÉCNICO MÉDICO ASSISTENCIAL
                        </h2>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight break-words">
                            {course.title}
                        </h1>
                        <p className="text-lg">{course.description}</p>
                    </div>
                </section>

                <div className="flex-grow p-8 bg-gray-50">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-500">Tópico 1: Aulas do Curso</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {course.subCourses?.map((subCourse) => (
                                <Card
                                    key={subCourse.id}
                                    title={subCourse.title}
                                    description={subCourse.description}
                                    videoUrl={subCourse.videoUrl}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-blue-500">Tire dúvidas</h2>
                        <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center text-center font-semibold shadow-md">
                            Fale com o professor
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default moduloCurso;
