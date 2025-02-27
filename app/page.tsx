"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import BlurFade from "@/components/ui/blur-fade";
import ProjectCard from "@/app/components/ProjectCard/ProjectCard";

interface Project {
  id: string;
  name: string;
  platform: string;
  date: string;
  images: string[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch projects");
        }

        setProjects(data.data);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch projects"
        );
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const ProjectCardSkeleton = () => {
    return (
      <div className='border-2 border-[#2d323c] flex w-[339.48px] h-96 rounded-xl shadow-md shadow-[rgba(0,0,0,0.4)]'>
        <div className='flex w-full h-full flex-col'>
          <div className='h-3/5'>
            <div className='w-full h-full rounded-t-xl bg-gray-700 ' />
          </div>
          <div className='flex flex-col gap-5 p-4'>
            <div className='h-6 w-3/4 bg-gray-700 rounded animate-pulse' />
            <div className='h-8 w-1/3 bg-gray-700 rounded animate-pulse' />
            <div className='h-6 w-1/2 bg-gray-700 rounded animate-pulse' />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 flex-col items-center'>
        <header className='h-auto max-h-screen overflow-hidden'>
          <div className='mt-[90px] md:mt-[90px] relative'>
            <video
              id='comp-k84t2nox_video'
              className='K8MSra h-full aspect-video object-cover md:h-full w-full'
              role='presentation'
              crossOrigin='anonymous'
              playsInline
              preload='auto'
              muted
              loop
              src='https://res.cloudinary.com/dggc80unb/video/upload/v1740664174/glzl7g2ahc3qksgnl4wp.mp4'
              autoPlay
            ></video>
            <div className='absolute top-0 left-0 right-0 w-full bg-[rgba(0,0,0,0.4)]'>
              <Navbar fixed />
            </div>
          </div>
        </header>
        <section className='flex relative top-7 items-center text-center py-8 pb-11 px-8 md:px-56 h-24'>
          <BlurFade delay={0.25} inView>
            <span className='text-xl max-md:text-sm leading-6 tracking-normal md:w-[700px] font-thin'>
              Combining creativity with technical precision. Whether for brands
              and products
            </span>
          </BlurFade>
        </section>
        <section className='flex flex-col container items-center justify-center w-full gap-5 py-8 px-4 md:px-56'>
          <Link href={"/projects"}>
            <h1 className='text-2xl max-md:text-xl font-bold text-center underline'>
              PROJECTS
            </h1>
          </Link>
          <div className='w-full flex flex-col justify-center'>
            <BlurFade delay={0.25} inView>
              <div className='flex max-md:flex-col gap-8 justify-center items-center'>
                {isLoading ? (
                  <div className='flex max-md:flex-col gap-8 justify-center'>
                    <ProjectCardSkeleton />
                    <ProjectCardSkeleton />
                    <ProjectCardSkeleton />
                  </div>
                ) : error ? (
                  <div className='w-full text-center text-red-500 py-8'>
                    {error}
                  </div>
                ) : (
                  projects
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3)
                    .map((project) => (
                      <ProjectCard
                        key={project.id}
                        id={project.id}
                        name={project.name}
                        platform={project.platform}
                        date={project.date}
                        image={project.images[0]}
                      />
                    ))
                )}
              </div>
            </BlurFade>

            <div className='flex w-full justify-center'>
              <Link
                className='border-2 border-[#2d323c] rounded-full inline-flex items-center py-2 px-4 my-6 focus:outline-none transition duration-700 focus:ring-2 focus:ring-[#2d323c] focus:border-transparent text-gray-200 hover:bg-gray-300 hover:text-gray-700 shadow-md shadow-[rgba(0,0,0,0.4)]'
                href='/projects'
              >
                See All <FaArrowRight className='ml-2' />
              </Link>
            </div>
          </div>
        </section>
        <footer className='w-full'>
          <Footer />
        </footer>
      </main>
    </>
  );
}
