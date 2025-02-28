"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar/Navbar";

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

// Animation variants for better reusability
const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
  staggerChildren: {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  },
  imageItem: {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  },
  modal: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  modalContent: {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  },
};

const ProjectPage: React.FC<PageProps> = ({ params }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects?id=${params.id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setProject(result.data);
        } else {
          setError(result.error || "Failed to fetch project");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch project"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeImage || !project) return;

      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowRight":
          navigateImage(1);
          break;
        case "ArrowLeft":
          navigateImage(-1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, project, imageIndex]);

  // Body scroll lock when modal is open
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  const handleImageClick = (image: string, index: number) => {
    setActiveImage(image);
    setImageIndex(index);
  };

  const closeModal = useCallback(() => {
    setActiveImage(null);
  }, []);

  const navigateImage = useCallback(
    (direction: number) => {
      if (!project) return;

      const newIndex =
        (imageIndex + direction + project.images.length) %
        project.images.length;
      setImageIndex(newIndex);
      setActiveImage(project.images[newIndex]);
    },
    [project, imageIndex]
  );

  // Handle clicks outside the modal content
  const handleModalBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    },
    [closeModal]
  );

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-900'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-900'>
        <div className='text-red-500 text-xl'>
          {error || "Project not found"}
        </div>
        <Link
          href='/projects'
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
        >
          Back
        </Link>
      </div>
    );
  }

  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 flex-col justify-between items-center'>
        <header className='min-h-[84px] w-full bg-[rgba(0,0,0,0.4)]'>
          <Navbar fixed />
        </header>

        <motion.section
          className='container mx-auto flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 gap-10'
          initial='initial'
          animate='animate'
          variants={animations.fadeInUp}
        >
          {/* Back Button */}
          <Link
            href='/projects'
            className='max-md:hidden self-start inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-2'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M19 12H5M12 19l-7-7 7-7' />
            </svg>
            <span>Back</span>
          </Link>

          {/* Project Header */}
          <motion.div
            className='flex flex-col md:flex-row justify-between items-baseline gap-4'
            variants={animations.fadeInUp}
          >
            <h1 className='text-3xl md:text-4xl font-bold text-white'>
              {project.name}
            </h1>
            <div className='text-gray-400'>
              <span className='font-medium'>Published:</span> {project.date}
              {project.platform && (
                <span className='ml-4 font-medium'>
                  Platform:{" "}
                  <span className='text-blue-400'>{project.platform}</span>
                </span>
              )}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className='flex flex-col lg:flex-row justify-between gap-10'>
            {/* Left Column */}
            <motion.div
              className='flex flex-col gap-8 lg:w-1/2'
              variants={animations.fadeInLeft}
            >
              <div className='text-justify border-b border-gray-700 pb-8'>
                <h2 className='text-xl font-semibold text-gray-300 mb-4'>
                  Project Description
                </h2>
                <p className='leading-relaxed'>{project.description}</p>
              </div>

              <div className='border-b border-gray-700 pb-8'>
                <h2 className='text-xl font-semibold text-gray-300 mb-4'>
                  Skills & Deliverables
                </h2>
                <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                  {project.skillsDeliverables.map((skill, index) => (
                    <li key={index} className='flex items-start gap-2'>
                      <span className='text-blue-400 mt-1'>•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              className='flex flex-col lg:w-1/2 items-center'
              variants={animations.fadeInRight}
            >
              <div className='rounded-xl border-2 border-gray-700 h-fit w-full overflow-hidden shadow-xl'>
                <iframe
                  src={project.ytLink}
                  title={`${project.name} Video`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                  className='w-full aspect-video'
                ></iframe>
              </div>
            </motion.div>
          </div>

          {/* Project Images */}
          <motion.div className='mt-12' variants={animations.fadeInUp}>
            <h2 className='text-2xl font-bold mb-6'>Project Gallery</h2>
            <motion.div
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              variants={animations.staggerChildren}
            >
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  className='border-2 border-gray-700 overflow-hidden rounded-xl shadow-lg h-64 cursor-pointer transform transition-transform hover:scale-105'
                  variants={animations.imageItem}
                  onClick={() => handleImageClick(image, index)}
                >
                  <Image
                    src={image}
                    alt={`${project.name} image ${index + 1}`}
                    width={500}
                    height={320}
                    priority={true}
                    className='w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-110'
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        <footer className='w-full flex items-center justify-center'>
          <span className='font-sans text-sm text-gray-400'>
            &copy; Nii Monney {new Date().getFullYear()}
          </span>
        </footer>

        {/* Floating Back Button (for mobile) */}
        <div className='lg:hidden fixed bottom-6 right-6 z-20'>
          <Link
            href='/projects'
            className='flex items-center justify-center h-12 w-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors'
            aria-label='Back'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M19 12H5M12 19l-7-7 7-7' />
            </svg>
          </Link>
        </div>

        {/* Enhanced Image Modal with AnimatePresence */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'
              onClick={handleModalBackdropClick}
              variants={animations.modal}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <motion.div
                className='relative max-w-5xl max-h-[90vh]'
                ref={modalRef}
                variants={animations.modalContent}
                initial='initial'
                animate='animate'
                exit='exit'
              >
                {/* Navigation Buttons */}
                <button
                  className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 z-20'
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage(-1);
                  }}
                  aria-label='Previous image'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M15 18l-6-6 6-6' />
                  </svg>
                </button>

                <button
                  className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 z-20'
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage(1);
                  }}
                  aria-label='Next image'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M9 18l6-6-6-6' />
                  </svg>
                </button>

                {/* Close Button */}
                <button
                  className='absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 z-20'
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                  aria-label='Close modal'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <line x1='18' y1='6' x2='6' y2='18'></line>
                    <line x1='6' y1='6' x2='18' y2='18'></line>
                  </svg>
                </button>

                {/* Image */}
                <Image
                  src={activeImage}
                  alt='Project image'
                  width={1200}
                  height={800}
                  className='max-h-[85vh] w-auto object-contain rounded-lg'
                  priority={true}
                />

                {/* Caption/Counter */}
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm'>
                  {imageIndex + 1} / {project.images.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default ProjectPage;
