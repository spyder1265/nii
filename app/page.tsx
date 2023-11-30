import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CCarousel from "./components/Carousel/Carousel";

export default function Home() {
  const projects = [
    {
      name: "Ghanaverse",
      description:
        "A 3d collection curated by an independent 3d generalist based on the concept of the multiverse in a Ghanaian scope it highlights some major aspects in Ghanaian culture and History and focuses on the concept of Alternate Realities",
      projects: [
        {
          name: "Final Start",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "/img/final start.png",
        },
        {
          name: "PHJVHV",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "/img/HJVHV.png",
        },
        {
          name: "PHJVHV",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "/img/trial , but we done .00_01_19_16.Still002.png",
        },
      ],
    },
    {
      name: "Commercial Projects",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      projects: [
        {
          name: "Final Start",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "/img/others/1.png",
        },
        {
          name: "PHJVHV",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "/img/others/6.png",
        },
        {
          name: "PHJVHV",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: "/img/others/lasdddjnkds.png",
        },
      ],
    },
  ];

  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 flex-col items-center'>
        <header>
          <div className='video_container mt-[90px] md:mt-[90px] relative'>
            <video
              id='comp-k84t2nox_video'
              className='K8MSra h-[400px] object-center md:h-[702px] w-full object-cover opacity-100 '
              role='presentation'
              crossOrigin='anonymous'
              playsInline
              preload='auto'
              muted
              loop
              src='/vid/cropped.mp4'
              autoPlay
            ></video>
            <div className='absolute top-0 left-0 right-0 w-full bg-[rgba(0,0,0,0.4)]'>
              <Navbar />
            </div>
          </div>
        </header>
        <section className='flex items-center text-center py-8 pb-11 px-8 md:px-56 '>
          <div>
            <p className='text-sm font-sans leading-6 tracking-normal md:w-[700px]'>
              Greetings! I'm NIi_monney,a passionate 3D CG generalist and video
              editor with a love for bringing imaginative worlds to life. My
              journey in the realm of digital creativity has been a thrilling
              ride, fueled by a dedication to pushing the boundaries of visual
              storytelling.
            </p>
          </div>
        </section>
        <section className='flex flex-col items-center justify-center w-full gap-5 py-8 px-4 md:px-56'>
          <div>
            <h1
              className='
            text-2xl font-bold text-center
            underline
            '
            >
              Projects
            </h1>
          </div>
          <div className='w-full flex flex-col items-center justify-center'>
            {projects.slice(0, 2).map((project, index) => (
              <div
                key={index}
                className='flex items-center rounded-lg md:w-full md:max-h-96 overflow-hidden my-4 shadow-lg shadow-[rgba(0,0,0,0.4)]'
              >
                <div
                  className={`w-1/2 ${
                    index % 2 !== 0 ? "flex" : "hidden"
                  } h-full max-w-[438] max-h-[369.844]`}
                >
                  <CCarousel dataArray={project.projects} />
                </div>
                <div
                  className={`w-2/4 h-full px-3 ${
                    index % 2 === 0 ? "text-left" : "text-right"
                  } flex flex-col justify-around gap-5 `}
                >
                  <div>
                    <h3 className='text-lg font-bold underline'>
                      {project.name}
                    </h3>
                  </div>
                  <div>
                    <p className='text-sm font-sans'>{project.description}</p>
                  </div>
                </div>
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "flex" : "hidden"
                  } h-full max-w-[438] max-h-[369.844]`}
                >
                  <CCarousel dataArray={project.projects} />
                </div>
              </div>
            ))}
            <button
              className='
              border-2 border-[#2d323c]
              rounded-full
              py-2 px-4
              focus:outline-none
              transition
              duration-700
              focus:ring-2 focus:ring-[#2d323c]
              focus:border-transparent
              text-gray-200
              hover:bg-gray-300
              hover:text-gray-700
              shadow-md
              shadow-[rgba(0,0,0,0.4)]
            '
            >
              See More
            </button>
          </div>
        </section>
        <footer className='w-full'>
          <Footer />
        </footer>
      </main>
    </>
  );
}
