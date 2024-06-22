import { Carousel } from "antd";
import CarouselItem from "./CarouselItem";
import Image from "next/image";

interface ICarousel {
  dataArray: {
    image: string;
    name: string;
    description: string;
  }[];
}

const CCarousel: React.FC<ICarousel> = ({ dataArray }) => {
  return (
    <Carousel
      autoplay
      autoplaySpeed={5500}
      className='h-[20rem] md:h-[30] lg:h-[] z-0 w-full'
    >
      {dataArray.map((data, index) => (
        <div
          key={index}
          className='h-[20rem] md:h-[30] lg:h-[] relative  w-[15rem] md:w-[18rem] lg:w-[31rem]'
        >
          <Image
            src={data.image}
            alt={data.name}
            width={200}
            height={200}
            className='h-[20rem] md:h-[30] lg:h-[] object-cover w-[15rem] md:w-[18rem] lg:w-[31rem]'
          />
          <div className='bg-[rgba(0,0,0,0.4)] h-full w-full top-0 absolute'></div>
        </div>
      ))}
    </Carousel>
  );
};

export default CCarousel;
