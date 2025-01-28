"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

interface PageProps {
  params: {
    id: string;
  };
}

const ProjectPage: React.FC<PageProps> = ({ params }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects?id=${params.id}`);
        const result = await response.json();

        if (result.success) {
          setProject(result.data);
        } else {
          setError(result.error || "Failed to fetch project");
        }
      } catch (err) {
        setError("Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200'></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-red-500'>{error || "Project not found"}</div>
      </div>
    );
  }

  return (
    <>
      <main className='flex flex-col min-h-screen w-full items-center'>
        <header className='min-h-[84px] w-full bg-[rgba(0,0,0,0.4)]'>
          <Navbar fixed />
        </header>
        <motion.section
          className='flex flex-col w-full h-full top-0 p-10 gap-10'
          {...fadeInUp}
        >
          <h1 className='text-2xl font-bold text-white'>{project.name}</h1>
          <div className='flex flex-row max-lg:flex-col justify-between gap-10'>
            <motion.div
              className='flex flex-col gap-5 lg:w-1/2'
              {...fadeInLeft}
            >
              <div className='text-justify border-b border-gray-700 pb-10'>
                <div className='text-gray-400'>Project Description:</div>
                <br />
                {project.description}
              </div>
              <div className='border-b border-gray-700 pb-10'>
                <div className='text-gray-400'>Skills and Deliverables:</div>
                <ul className='list-disc pl-4'>
                  {project.skillsDeliverables.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className='hidden max-sm:block'>
                <span className='text-gray-400'>Published on:&nbsp;</span>
                <br />
                {project.date}
              </div>
              <div className='block max-sm:hidden'>
                <span className='text-gray-400'>Published:&nbsp;</span>
                {project.date}
              </div>
            </motion.div>
            <motion.div
              className='flex flex-col lg:w-1/2 items-center'
              {...fadeInRight}
            >
              <div className='rounded-xl border-2 border-[#2d323c] h-fit w-fit animate__animated animate__fadeInRight'>
                <iframe
                  width='710'
                  height='465'
                  src={project.ytLink}
                  title={project.name + " Video"}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                  className='rounded-xl aspect-video max-md:w-full max-lg:w-[701px] max-lg:justify-center max-lg:h-[412px] max-md:h-full max-[1024px]:h-[412px] max-[1024px]:w-fit max-[1284px]:w-fit'
                ></iframe>
              </div>
            </motion.div>
          </div>
          <div className='flex max-md:flex-col justify-between items-center gap-4'>
            {project.images.map((image, index) => (
              <div
                key={index}
                className='border-2 border-[#2d323c] h-80 w-96 mt-10 rounded-xl max-md:w-[300px] max-md:h-40'
              >
                <Image
                  src={image}
                  alt={`${project.name} image ${index + 1}`}
                  width={384}
                  height={320}
                  className='w-full h-full object-cover rounded-xl'
                />
              </div>
            ))}
          </div>
        </motion.section>
        <footer className='w-full flex items-center justify-center'>
          <span className='font-sans text-sm font-bold text-gray-100 opacity-50'>
            &copy; Nii Monney 2021
          </span>
        </footer>
      </main>
    </>
  );
};

export default ProjectPage;
