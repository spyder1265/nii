"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IPage {
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

function LoadingSkeleton() {
  return (
    <main className='container mx-auto'>
      <div className='mb-6'>
        <div className='w-32 h-6 bg-gray-700 rounded animate-pulse' />
      </div>

      <section className='flex flex-col w-full h-full gap-10 mt-12'>
        {/* Title Skeleton */}
        <div className='w-64 h-8 bg-gray-700 rounded animate-pulse' />

        <div className='flex flex-row max-lg:flex-col justify-between gap-10'>
          {/* Left Column - Project Details */}
          <div className='flex flex-col gap-5 lg:w-1/2'>
            {/* Description Section */}
            <div className='border-b border-gray-700 pb-10'>
              <div className='w-40 h-5 bg-gray-700 rounded animate-pulse mb-4' />
              <div className='space-y-2'>
                <div className='w-full h-4 bg-gray-700 rounded animate-pulse' />
                <div className='w-full h-4 bg-gray-700 rounded animate-pulse' />
                <div className='w-3/4 h-4 bg-gray-700 rounded animate-pulse' />
                <div className='w-1/2 h-4 bg-gray-700 rounded animate-pulse' />
              </div>
            </div>

            {/* Skills Section */}
            <div className='border-b border-gray-700 pb-10'>
              <div className='w-48 h-5 bg-gray-700 rounded animate-pulse mb-4' />
              <div className='space-y-2 pl-4'>
                <div className='w-3/4 h-4 bg-gray-700 rounded animate-pulse' />
                <div className='w-2/3 h-4 bg-gray-700 rounded animate-pulse' />
                <div className='w-4/5 h-4 bg-gray-700 rounded animate-pulse' />
                <div className='w-1/2 h-4 bg-gray-700 rounded animate-pulse' />
              </div>
            </div>

            {/* Date Section */}
            <div className='w-48 h-5 bg-gray-700 rounded animate-pulse' />
          </div>

          {/* Right Column - Video */}
          <div className='flex flex-col lg:w-1/2 items-center'>
            <div className='rounded-xl border-2 border-[#2d323c] h-[365px] w-[610px] max-md:w-full max-lg:w-[701px] max-lg:h-[412px] max-md:h-full bg-gray-700 animate-pulse' />
          </div>
        </div>

        {/* Project Images */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
          <div className='flex max-md:flex-col gap-4'>
            <div className='w-24 h-5 bg-gray-700 rounded animate-pulse' />
            <div className='grid grid-cols-1 gap-4'>
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className='relative border-2 border-[#2d323c] rounded-xl overflow-hidden aspect-video bg-gray-700 animate-pulse'
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProjectPage({ params }: IPage) {
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
        setProject(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [name]);

  if (loading) {
    return LoadingSkeleton();
  }

  if (!project) {
    return (
      <main className='container mx-auto'>
        <div className='mb-6 flex'>
          <Link
            href='/dashboard/projects'
            className='text-blue-400 hover:underline'
          >
            &larr;&nbsp;Back to Projects
          </Link>
        </div>
        <div className='flex items-center justify-center min-h-[400px]'>
          <p className='text-xl text-gray-400'>Project not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className='container mx-auto'>
      <div className='mb-6m flex justify-between items-center'>
        <Link
          href='/dashboard/projects'
          className='text-blue-400 hover:underline'
        >
          &larr;&nbsp;Back to Projects
        </Link>
        <div className='flex bg-blue-800 px-5 py-3 rounded-lg hover:bg-blue-950 cursor-pointer'>
          <Link
            href={`/dashboard/projects/${encodeURIComponent(name)}/edit`}
            className='text-blue-50'
          >
            Edit Project
          </Link>
        </div>
      </div>

      <section className='flex flex-col w-full h-full gap-10 mt-12'>
        <h1 className='text-2xl font-bold text-white'>{project.name}</h1>

        <div className='flex flex-row max-lg:flex-col justify-between gap-10'>
          {/* Left Column - Project Details */}
          <div className='flex flex-col gap-5 lg:w-1/2'>
            <div className='text-justify border-b border-gray-700 pb-10'>
              <div className='text-gray-400'>Project Description:</div>
              <div className='mt-2'>{project.description}</div>
            </div>

            <div className='border-b border-gray-700 pb-10'>
              <div className='text-gray-400'>Skills and Deliverables:</div>
              <ul className='list-disc pl-4 mt-2'>
                {project.skillsDeliverables?.flatMap((skill, index) =>
                  skill.split(",").map((subSkill, subIndex) => (
                    <li key={`${index}-${subIndex}`} className='mt-1'>
                      {subSkill.trim()}
                    </li>
                  ))
                ) || null}
              </ul>
            </div>

            <div className='hidden max-sm:block'>
              <span className='text-gray-400'>Published on:</span>
              <div className='mt-1'>{project.date}</div>
            </div>
            <div className='block max-sm:hidden'>
              <span className='text-gray-400'>Published:&nbsp;</span>
              {project.date}
            </div>
          </div>

          {/* Right Column - Video */}
          <div className='flex flex-col lg:w-1/2 items-center'>
            <div className='rounded-xl border-2 border-[#2d323c] h-fit w-fit animate__animated animate__fadeInRight'>
              <iframe
                width='610'
                height='365'
                src={project.ytLink}
                title={`${project.name} Video`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
                className='rounded-xl aspect-video max-md:w-full max-lg:w-[701px] max-lg:h-[412px] max-md:h-full'
              />
            </div>
          </div>
        </div>

        {/* Project Images */}
        <span className='text-gray-200 text-xl max-md:text-center'>Images</span>
        <div className='grid grid-cols-1 gap-4'>
          <div className='grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4'>
            {project.images.map((imageUrl, index) => (
              <div
                key={index}
                className='relative border-2 border-[#2d323c] rounded-xl overflow-hidden aspect-video'
              >
                <Image
                  src={imageUrl}
                  alt={`${project.name} - Image ${index + 1}`}
                  fill
                  className='rounded-xl object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
