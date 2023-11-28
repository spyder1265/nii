import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  const projects = [
    {
      title: "Final Start",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageSrc: "/img/final start.png",
    },
    {
      title: "PHJVHV",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imageSrc: "/img/HJVHV.png",
    },
    // Add more projects here
  ];

  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 flex-col items-center'>
        <header>
          <div className='video_container relative'>
            <video
              id='comp-k84t2nox_video'
              className='K8MSra h-[400px] sm:object-scale-down md:h-[702px] w-full object-cover opacity-100 '
              role='presentation'
              crossOrigin='anonymous'
              playsInline
              preload='auto'
              muted
              loop
              src='https://video.wixstatic.com/video/b41564_0557888c05b24e05905b5291a45210d9/720p/mp4/file.mp4'
              autoPlay
            ></video>
            <div className='absolute top-0 left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.4)]'>
              <Navbar />
            </div>
          </div>
        </header>
        <section className='flex items-center text-center py-8 pb-11 px-8 '>
          <div>
            <p className='text-sm font-sans leading-6 tracking-normal'>
              Greetings! I'm NIi_monney,a passionate 3D CG generalist and video
              editor with a love for bringing imaginative worlds to life. My
              journey in the realm of digital creativity has been a thrilling
              ride, fueled by a dedication to pushing the boundaries of visual
              storytelling.
            </p>
          </div>
        </section>
        <section className='flex flex-col items-center justify-center w-full gap-5 py-8 px-4'>
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
            {projects.map((project, index) => (
              <div
                key={index}
                className='flex items-center rounded-lg overflow-hidden my-4 shadow-lg shadow-slate-[rgba(0,0,0,0.4)]'
              >
                <div
                  className={`w-1/2 ${
                    index % 2 !== 0 ? "flex" : "hidden"
                  } h-full`}
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    width={200}
                    height={200}
                  />
                </div>
                <div className='w-2/4 h-full px-3'>
                  <h3 className='text-lg font-bold underline'>
                    {project.title}
                  </h3>
                  <p className='text-sm font-sans'>{project.description}</p>
                </div>
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "flex" : "hidden"
                  } h-full`}
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            ))}
            <button
              className='
            text-2xl font-bold text-center
            underline
            '
            >
              See More
            </button>
          </div>
        </section>
        <footer>
          <div className='flex items-center justify-center w-full h-20 bg-[rgb(29, 32, 38)]'>
            <p className='text-white'>Nii Monney © 2023</p>
          </div>
        </footer>
      </main>

      {/*    style='height: 100%; width: 100%; object-fit: cover; object-position: center; opacity: 1;' */}
    </>
  );
}
