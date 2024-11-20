import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";

interface Ipage {}

const page: React.FC<Ipage> = ({}) => {
  return (
    <>
      <main className='flex min-h-screen z-40 sticky top-0 flex-col items-center'>
        <header className='min-h-[84px] w-full bg-[rgba(0,0,0,0.4)]'>
          <Navbar fixed />
        </header>
        <section className='flex flex-col gap-3 items-center justify-around text-center py-8 pb-11 px-8 md:px-56 '>
          <div className='w-full flex flex-col mt-14 items-center justify-center animate__animated animate__fadeInLeft'>
            <div className='rounded-full overflow-hidden flex items-center p-1 border-2  h-[200px] w-[200px] justify-center '>
              <Image
                src={"/img/DSC_0075.png"}
                alt={"profile_img"}
                width={200}
                height={200}
                quality={100}
                className='h-full w-full rounded-full object-cover object-left'
              />
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-6 animate__animated animate__fadeInLeft'>
            <div>
              <h1
                className='
            text-2xl font-bold text-center
            underline
            
            '
              >
                About Me
              </h1>
            </div>
            <div>
              <p className=' tracking-wide'>
                Greetings! I'm Nii_monney,a passionate 3D CG generalist and
                video editor with a love for bringing imaginative worlds to
                life. My journey in the realm of digital creativity has been a
                thrilling ride, fueled by a dedication to pushing the boundaries
                of visual storytelling.
              </p>
              <br />
              <h1 className='text-left font-bold text-xl'>
                <span className='underline'>What I Do</span> :
              </h1>
              <br />
              <p className='text-justify tracking-wide'>
                As a 3D CG generalist, I thrive on the dynamic intersection of
                art and technology. From modeling and texturing to lighting and
                animation, I immerse myself in every facet of the 3D realm,
                sculpting virtual landscapes that captivate and inspire. In the
                realm of video editing, I weave narratives with precision and
                flair. Every frame is a brushstroke, and every cut is a note in
                the symphony of storytelling. Whether it's a promotional video,
                a cinematic sequence, or a visually stunning advertisement, I
                bring a meticulous eye and a flair for creativity to every
                project
              </p>
              <br />
              <h1 className='text-left font-bold text-xl'>
                <span className='underline'>Why I Do It</span> :
              </h1>
              <br />
              <p className='text-justify tracking-wide'>
                Creativity is my compass, guiding me through the uncharted
                territories of imagination. I believe that the marriage of
                technical skill and artistic intuition has the power to
                transport audiences, evoke emotions, and leave a lasting impact.
                It's not just about creating visuals; it's about crafting
                experiences that linger in the minds of those who encounter
                them.
              </p>
              <br />
              <h1 className='text-left font-bold text-xl'>
                <span className='underline'>Join Me on the Journey</span> :
              </h1>
              <br />
              <p className='text-justify tracking-wide'>
                Here on my website, you'll find a curated showcase of my work, a
                glimpse into my creative process, and perhaps a spark of
                inspiration for your own projects. Whether you're a fellow
                artist, a potential collaborator, or someone simply curious
                about the world of 3D CG and video editing, I invite you to
                explore and connect.
              </p>
              <br />
              <h1 className='text-left font-bold text-xl'>
                <span className='underline'>
                  Collaborations and Noteworthy Projects
                </span>{" "}
                :
              </h1>
              <br />
              <p className='text-justify tracking-wide'>
                In my journey as a 3D CG generalist and video editor, I've had
                the privilege of collaborating with some incredible talents and
                organizations. Here are a few highlights:
              </p>
              <br />
              <div className='text-left pl-12'>
                <ol className='list-disc'>
                  <li className='text-left font-bold '>
                    <span className='underline'>
                      King Maaga and the World of Music
                    </span>{" "}
                    :
                  </li>
                  <p className='tracking-wide'>
                    I've lent my creative touch to the vibrant worlds of Reggae
                    and Afrobeat alongside the talented King Maaga. Our
                    collaborations have not only been a celebration of music but
                    also a fusion of visual artistry and rhythm.
                  </p>
                  <br />
                  <li className='text-left font-bold '>
                    <span className='underline'>
                      Empowering Minds with Academic City University College
                    </span>{" "}
                    :
                  </li>
                  <p className='tracking-wide'>
                    Working with Academic City University College, I've had the
                    opportunity to contribute to the visual representation of
                    educational experiences. It's a unique joy to blend
                    creativity with academia, bringing concepts to life through
                    the lens of 3D and video.
                  </p>
                  <br />
                  <li className='text-left font-bold '>
                    <span className='underline'>Dizruptive gh Madmappers</span>{" "}
                    :
                  </li>
                  <p className='tracking-wide'>
                    As a part of the Dizruptive gh Madmappers team, I've been
                    involved in disruptive projects that challenge conventional
                    thinking. It's an environment where innovation meets
                    creativity, and I'm proud to be a contributor to this
                    dynamic space.
                  </p>
                  <br />
                  <li className='text-left font-bold tracking-wide'>
                    <span className='underline'>
                      Freelancing Adventures on Upwork
                    </span>{" "}
                    :
                  </li>
                  <p className='tracking-wide'>
                    Beyond specific collaborations, I've embarked on freelance
                    adventures on Upwork, connecting with clients from diverse
                    industries. Each project is an opportunity to learn, grow,
                    and add a unique touch to someone else's vision.
                  </p>
                </ol>
              </div>
              <br />
              <p className='text-justify'>
                Thank you for stepping into my digital realm. Let's embark on a
                visual adventure together!
              </p>
            </div>
          </div>
        </section>
        <footer className='pb-4'>
          <span className='font-sans text-sm font-bold text-gray-100 opacity-50 '>
            &copy; Nii Monney 2021
          </span>
        </footer>
      </main>
    </>
  );
};
export default page;
