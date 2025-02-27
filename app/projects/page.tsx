"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BlurFade from "@/components/ui/blur-fade";

interface Project {
  id: string;
  name: string;
  description: string;
  images: string[];
  date: string;
  platform: string;
  ytLink: string;
  skillsDeliverables: string[];
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const result = await response.json();

        if (result.success) {
          setProjects(result.data);
        } else {
          setError(result.error || "Failed to fetch projects");
        }
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-red-500'>{error}</div>
      </div>
    );
  }

  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 right-0 flex-col justify-between items-center'>
        <header className='min-h-[84px] w-full bg-[rgba(0,0,0,0.4)]'>
          <Navbar fixed />
        </header>
        <motion.section
          className='flex flex-row items-start top-0'
          {...fadeInUp}
        >
          <div className='flex justify-normal w-full h-full gap-6 p-10 max-md:p-5 flex-wrap'>
            {projects.map((project) => (
              <BlurFade key={project.id} delay={0.25} inView>
                <Link
                  className='border-2 border-[#2d323c] flex w-[339.48px] h-96 rounded-xl hover:scale-105 hover:shadow-xl focus:outline-none transition duration-700 focus:ring-2 focus:ring-[#2d323c] focus:border-transparent text-gray-200 hover:bg-gray-500 hover:text-white shadow-md shadow-[rgba(0,0,0,0.4)]'
                  href={`/projects/${project.id}`}
                >
                  <div className='flex w-full h-full flex-col'>
                    <div className='h-3/5 overflow-hidden'>
                      <Image
                        src={project.images[0]}
                        width={600}
                        height={600}
                        quality={100}
                        priority={true}
                        alt={project.name}
                        className='w-full h-full rounded-t-xl object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out'
                        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        unoptimized={false}
                      />
                    </div>
                    <div className='flex flex-col gap-5 p-4'>
                      <span className='truncate font-medium'>
                        {project.name}
                      </span>
                      <span
                        className={`px-2 py-1 w-fit rounded-lg ${
                          project.platform === "Upwork"
                            ? "bg-green-600"
                            : project.platform === "Passion Project"
                            ? "bg-purple-600"
                            : project.platform === "Commercial Work"
                            ? "bg-blue-600"
                            : "bg-orange-500"
                        }`}
                      >
                        {project.platform}
                      </span>
                      <span>
                        {project.date
                          ? new Date(project.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })
                          : "Unknown Date"}
                      </span>
                    </div>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </motion.section>
        <footer className='w-full flex items-center justify-center'>
          <span className='font-sans text-sm text-gray-400'>
            &copy; Nii Monney {new Date().getFullYear()}
          </span>
        </footer>
      </main>
    </>
  );
};

export default ProjectsPage;
