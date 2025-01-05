"use client";
import Navbar from "@/app/components/Navbar/Navbar";
import { projects } from "@/app/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { skills } from "@/app/data";
import { motion } from "framer-motion";
import CCarousel from "@/app/components/Carousel/Carousel";
import { cn } from "@/lib/utils";

interface Ipage {
  params: {
    name: string;
  };
}

const page: React.FC<Ipage> = ({ params }) => {
  const name = decodeURI(params.name);
  const [project, setProject] = useState<{
    name: string;
    image: string;
    description: string;
    date: string;
    ytLink: string;
  }>({ name: "", image: "", description: "", date: "", ytLink: "" });

  useEffect(() => {
    const currentProject = projects.map((subproject) =>
      subproject.projects.find(
        (project) => project.name.toLowerCase() === name.toLowerCase()
      )
    );
    setProject(
      currentProject.at(0) || {
        name: "",
        image: "",
        description: "",
        date: "",
        ytLink: "",
      }
    );
    console.log(currentProject);
  }, [name]);

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
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              {/* Line break after "published on" for small devices */}
              <div className='hidden max-sm:block'>
                <span className='text-gray-400'>Published on:&nbsp;</span>
                <br />
                {project.date}
              </div>
              <div className='block max-sm:hidden'>
                <span className='text-gray-400'>Published:&nbsp;</span>
                {project.date}
              </div>
              {/* end */}
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
            <div className='border-2 border-[#2d323c] h-80 w-96 mt-10 rounded-xl max-md:w-[300px] max-md:h-40'></div>
            <div className='border-2 border-[#2d323c] h-80 w-96 mt-10 rounded-xl max-md:w-[300px] max-md:h-40'></div>
            <div className='border-2 border-[#2d323c] h-80 w-96 mt-10 rounded-xl max-md:w-[300px] max-md:h-40'></div>
            <div className='border-2 border-[#2d323c] h-80 w-96 mt-10 rounded-xl max-md:w-[300px] max-md:h-40'></div>
          </div>
          {/* {projects.slice(0, 2).map((project, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center rounded-lg md:w-full min-w-[330px] md:max-h-96 overflow-hidden my-4 shadow-lg shadow-[rgba(0,0,0,0.4)]",
                index % 2 === 0 ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={`md:w-1/2 h-full max-w-[200px] md:max-w-none max-h-[369.844]`}
              >
                <CCarousel dataArray={project.projects} />
              </div>
              <div
                className={cn(
                  `w-1/2 h-full px-3 flex flex-col justify-around gap-5`,
                  index % 2 === 0
                    ? "text-left items-start"
                    : "text-right items-end"
                )}
              >
                <div>
                  <h3 className='text-lg font-bold underline'>
                    {project.name}
                  </h3>
                </div>
                <div>
                  <p className='text-sm w-[150px] h-[240px] md:h-auto font-sans'>
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))} */}
        </motion.section>
        {/* <section className='w-full container max-h-screen flex flex-col items-center'>
          <h1 className='text-2xl font-bold text-white'>{project.name}</h1>
          <Image
            className='h-full aspect-video w-full '
            src={project.image || ""}
            alt={project.name}
            width={351}
            height={412}
            priority
          />

          <div>
            <p className='text-white'>{project.description}</p>
          </div>
        </section> */}

        <footer className='w-full flex items-center justify-center'>
          <span className='font-sans text-sm font-bold text-gray-100 opacity-50 '>
            &copy; Nii Monney 2021
          </span>
        </footer>
      </main>
    </>
  );
};
export default page;
