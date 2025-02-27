import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  id: string;
  name: string;
  platform: string;
  date: string;
  image: string;
}

const ProjectCard = ({ id, name, platform, date, image }: ProjectCardProps) => {
  return (
    <Link href={`/projects/${id}`}>
      <div className='group relative overflow-hidden border-2 border-[#2d323c] w-[339.48px] h-96 rounded-xl transition-all duration-300 ease-out hover:border-gray-400 bg-black/20 backdrop-blur-sm'>
        <div className='h-3/5 overflow-hidden'>
          <Image
            src={image}
            width={600}
            height={600}
            quality={100}
            priority={true}
            alt={name}
            className='w-full h-full rounded-t-xl object-cover transition-transform duration-500 ease-out group-hover:scale-105'
          />
        </div>
        <div className='flex flex-col gap-5 p-4 transform transition-all duration-300 group-hover:translate-y-[-4px]'>
          <span className='truncate font-medium text-gray-200'>{name}</span>
          <span
            className={`px-2 py-1 w-fit rounded-lg ${
              platform === "Upwork"
                ? "bg-green-600"
                : platform === "Passion Project"
                ? "bg-purple-600"
                : platform === "Commercial"
                ? "bg-blue-600"
                : "bg-orange-500"
            }`}
          >
            {platform}
          </span>
          <span className='text-gray-300'>
            {date
              ? new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })
              : "Unknown Date"}
          </span>
        </div>
        <div className='absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/40 to-transparent pointer-events-none' />
      </div>
    </Link>
  );
};

export default ProjectCard;
