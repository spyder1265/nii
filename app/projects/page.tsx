"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BlurFade from "@/components/ui/blur-fade";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";

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
        const response = await fetch("/api/projects?filter=active");
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
                <ProjectCard
                  id={project.id}
                  name={project.name}
                  platform={project.platform}
                  date={project.date}
                  image={project.images[0]}
                />
              </BlurFade>
            ))}
          </div>
        </motion.section>
        <footer className='w-full flex items-center justify-center'>
          <span className='text-sm text-gray-400'>
            &copy; Nii Monney {new Date().getFullYear()}
          </span>
        </footer>
      </main>
    </>
  );
};

export default ProjectsPage;
