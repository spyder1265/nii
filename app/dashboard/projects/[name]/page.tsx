"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Ipage {
  params: {
    name: string;
  };
}

interface Project {
  _id: string;
  name: string;
  images: string[];
  description: string;
  date: string;
  ytLink: string;
  skillsDeliverables: string[];
}

const ProjectPage: React.FC<Ipage> = ({ params }) => {
  const name = decodeURI(params.name);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `/api/projects?name=${encodeURIComponent(name)}`
        );
        if (!response.ok) throw new Error("Failed to fetch project data.");
        const data = await response.json();
        setProject(data.data); // Assuming API returns { success: true, data: project }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [name]);

  if (loading) {
    return <p>Loading project details...</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <>
      <main>
        {/* Back to Projects */}
        <div className='mt-6'>
          <Link
            href='/dashboard/projects'
            className='text-blue-400 hover:underline'
          >
            &larr;&nbsp;Back to Projects
          </Link>
        </div>

        {/* Project Details */}
        <section className='flex flex-col w-full h-full gap-10 mt-5'>
          <h1 className='text-2xl font-bold text-white'>{project.name}</h1>
          <div className='flex flex-row max-lg:flex-col justify-between gap-10'>
            <div className='flex flex-col gap-5 lg:w-1/2'>
              <div className='text-justify border-b border-gray-700 pb-10'>
                <div className='text-gray-400'>Project Description:</div>
                <br />
                {project.description}
              </div>
              <div className='border-b border-gray-700 pb-10'>
                <div className='text-gray-400'>Skills and Deliverables:</div>
                <ul className='list-disc pl-4'>
                  {project.skillsDeliverables.flatMap((skill, index) =>
                    skill
                      .split(",")
                      .map((subSkill, subIndex) => (
                        <li key={`${index}-${subIndex}`}>{subSkill.trim()}</li>
                      ))
                  )}
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
            </div>
            <div className='flex flex-col lg:w-1/2 items-center'>
              <div className='rounded-xl border-2 border-[#2d323c] h-fit w-fit animate__animated animate__fadeInRight'>
                <iframe
                  width='610'
                  height='365'
                  src={project.ytLink}
                  title={project.name + " Video"}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                  className='rounded-xl aspect-video max-md:w-full max-lg:w-[701px] max-lg:justify-center max-lg:h-[412px] max-md:h-full max-[1024px]:h-[412px] max-[1024px]:w-fit max-[1284px]:w-fit'
                ></iframe>
              </div>
            </div>
          </div>

          <div className='flex max-md:flex-col justify-between items-center gap-4'>
            <div className='flex flex-wrap justify-center gap-4 mt-10'>
              {project.images.map((image, index) => (
                <Image
                  width={100}
                  height={100}
                  key={index}
                  src={`data:image/png;base64,${image}`}
                  alt={`Project image ${index + 1}`}
                  className='border-2 border-[#2d323c] rounded-xl max-w-full max-h-56'
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProjectPage;
