"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuLateral from "./MenuLateral";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowRight } from "react-icons/fa";

const CoursesPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch("https://crud-usuario.vercel.app/api/cursos");

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        const mainCourses = data.filter((course) => !course.parentCourseId);
        setCourses(mainCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Não foi possível carregar os cursos. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "linear-gradient(120deg, #f8fafc 0%, #e7ebf0 100%)" }}
    >
      <MenuLateral />

      <main className="flex-grow p-6 md:p-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold my-6 text-center text-gray-800">
            Cursos Disponíveis
          </h2>
          {loading ? (
            <p className="text-center text-gray-600">Carregando cursos...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : courses.length === 0 ? (
            // Mensagem amigável quando não há cursos disponíveis
            <div className="mt-12 flex flex-col items-center">
              <div className="bg-blue-50 border border-blue-300 text-gray-950 px-4 sm:px-8 py-6 rounded-lg shadow-md max-w-full sm:max-w-md w-full mx-2">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
                  Novos cursos em breve!
                </h2>
                <p className="text-center text-sm sm:text-base">
                  Estamos preparando conteúdos incríveis para você. Fique atento às nossas novidades.
                </p>
                <p className="mt-4 text-center font-medium text-sm sm:text-base">
                  Atenciosamente, Equipe Only
                </p>
              </div>
            </div>
          ) : (
            // Renderização dos cursos disponíveis
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="relative bg-gradient-to-b to-white shadow-lg rounded-xl p-6 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-200 mb-4">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform transform hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 truncate">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-900">
                    de <span className="line-through">{`R$ ${(course.price * 1.5).toFixed(2).replace('.', ',')}`}</span>
                  </p>
                  <p className="text-xl font-bold text-blue-700">{`R$ ${course.price.toFixed(2).replace('.', ',')}`}</p>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 pb-2">
                    À vista
                  </p>
                  <button
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-full transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring focus:ring-blue-300 flex items-center justify-center gap-2"
                    onClick={() => handleRedirect(`/courses/${course.id}`)}
                  >
                    Saiba Mais <FaArrowRight />
                  </button>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-200 opacity-70 rounded-full blur-lg pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CoursesPage;
