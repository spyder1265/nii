"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FolderOpen } from "lucide-react"; // Import the icon we'll use for empty state

interface Project {
  id: string;
  name: string;
  description: string;
  images: string[];
  date: string;
  platform: string;
  ytLink?: string;
  skillsDeliverables: string[];
}

function ProjectSkeleton() {
  return (
    <div className='bg-gray-800 p-6 rounded-lg animate-pulse'>
      <div className='flex justify-between items-center pb-2'>
        <div className='flex flex-col gap-2'>
          <div className='h-6 w-32 bg-gray-700 rounded'></div>
          <div className='h-4 w-24 bg-gray-700 rounded'></div>
        </div>
        <div className='h-8 w-24 bg-gray-700 rounded-lg'></div>
      </div>
      <div className='mt-4 space-y-2'>
        <div className='h-4 w-full bg-gray-700 rounded'></div>
        <div className='h-4 w-full bg-gray-700 rounded'></div>
        <div className='h-4 w-3/4 bg-gray-700 rounded'></div>
        <div className='h-4 w-1/2 bg-gray-700 rounded'></div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center p-8 mt-8 bg-gray-800 rounded-lg'>
      <FolderOpen className='w-16 h-16 text-gray-400 mb-4' />
      <h3 className='text-xl font-semibold text-white mb-2'>
        No Projects Found
      </h3>
      <p className='text-gray-400 text-center mb-6'>
        There are currently no projects available to display.
      </p>
      <Link
        href='/dashboard/add-project'
        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
      >
        Add Project
      </Link>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects.");
        const data = await response.json();
        setProjects(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className='mb-8'>
        <div className='animate-pulse mb-4'>
          <div className='h-8 w-32 bg-gray-700 rounded'></div>
        </div>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <ProjectSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold'>PROJECTS</h2>
        <EmptyState />
      </section>
    );
  }

  return (
    <section className='mb-8'>
      <h2 className='text-2xl font-semibold'>PROJECTS</h2>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map((project) => (
          <Link
            href={`/dashboard/projects/${project.id}`}
            key={project.id}
            className='bg-gray-800 p-6 rounded-lg hover:bg-gray-700'
          >
            <div className='flex justify-between items-center pb-2'>
              <div className='flex flex-col'>
                <span className='text-xl text-white'>{project.name}</span>
                {/* <span className='font-light text-gray-500'>{project.date}</span> */}
                <span className='font-light text-gray-500'>
                  {project.date
                    ? new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })
                    : "Unknown Date"}
                </span>
              </div>
              <div>
                <span
                  className={`px-2 py-1 w-fit rounded-lg text-nowrap ${
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
              </div>
            </div>
            <p className='text-gray-400 font-light text-justify tracking-tighter leading-relaxed line-clamp-6'>
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
