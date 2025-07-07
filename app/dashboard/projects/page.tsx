"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FolderOpen } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  images: string[];
  date: string;
  platform: string;
  ytLink?: string;
  skillsDeliverables: string[];
  archived?: boolean;
}

function ProjectSkeleton() {
  return (
    <div className='bg-gray-900 p-6 rounded-xl animate-pulse shadow-md'>
      <div className='flex justify-between items-center pb-3'>
        <div className='flex flex-col gap-3'>
          <div className='h-6 w-36 bg-gray-700 rounded-md'></div>
          <div className='h-4 w-28 bg-gray-700 rounded-md'></div>
        </div>
        <div className='h-8 w-28 bg-gray-700 rounded-lg'></div>
      </div>
      <div className='mt-5 space-y-3'>
        <div className='h-4 w-full bg-gray-700 rounded-md'></div>
        <div className='h-4 w-3/4 bg-gray-700 rounded-md'></div>
        <div className='h-4 w-1/2 bg-gray-700 rounded-md'></div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center p-10 mt-10 bg-gray-900 rounded-xl shadow-md'>
      <FolderOpen className='w-20 h-20 text-gray-500 mb-5' />
      <h3 className='text-2xl font-bold text-white mb-3'>No Projects Yet</h3>
      <p className='text-gray-400 text-center mb-6'>
        Start adding projects to showcase your work and experience.
      </p>
      <Link
        href='/dashboard/add-project'
        className='px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-md'
      >
        Add Your First Project
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

  const handleArchiveToggle = async (id: string, archived: boolean) => {
    try {
      const res = await fetch(`/api/projects/${id}/archive`, {
        method: "PATCH",
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, archived: !archived } : p))
        );
      }
    } catch (e) {
      // Optionally handle error
    }
  };

  if (loading) {
    return (
      <section className='mb-10'>
        <div className='animate-pulse mb-5'>
          <div className='h-9 w-40 bg-gray-700 rounded-md'></div>
        </div>
        <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {[...Array(6)].map((_, index) => (
            <ProjectSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className='mb-10'>
        <h2 className='text-3xl font-bold text-white'>Projects</h2>
        <EmptyState />
      </section>
    );
  }

  return (
    <section className='mb-10'>
      <h2 className='text-3xl font-semibold text-white'>Projects</h2>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {projects.map((project) => (
          <div key={project.id} className='relative'>
            <Link
              href={`/dashboard/projects/${project.id}`}
              className='bg-gray-800 p-6 rounded-xl shadow-lg hover:bg-gray-900 transition-all duration-300 block'
            >
              <div className='flex justify-between items-center pb-3'>
                <div className='flex flex-col'>
                  <span className='text-xl text-white font-semibold line-clamp-1'>
                    {project.name}
                  </span>
                  <span className='font-light text-gray-400'>
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
                    className={`px-4 py-1 w-fit rounded-md text-sm font-medium text-white shadow-md p-2 ${
                      project.platform === "Upwork"
                        ? "bg-green-600"
                        : project.platform === "Passion Project"
                        ? "bg-purple-600"
                        : project.platform === "Commercial"
                        ? "bg-blue-600"
                        : "bg-orange-500"
                    }`}
                  >
                    {project.platform}
                  </span>
                </div>
              </div>
              <p className='text-gray-400 font-light text-justify tracking-tight leading-relaxed line-clamp-6'>
                {project.description}
              </p>
            </Link>
            <button
              onClick={() =>
                handleArchiveToggle(project.id, !!project.archived)
              }
              className={`absolute top-3 right-3 px-3 py-1 rounded-md text-xs font-semibold shadow transition-all ${
                project.archived
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : "bg-gray-700 text-white hover:bg-gray-900"
              }`}
            >
              {project.archived ? "Unarchive" : "Archive"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
