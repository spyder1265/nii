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
    <Carousel autoplay autoplaySpeed={5500} className='h-[400px] w-[500px]'>
      {dataArray.map((data, index) => (
        <div key={index} className='h-[400px] relative w-[500px]'>
          <Image
            src={data.image}
            alt={data.name}
            width={200}
            height={200}
            className='h-[400px] object-cover w-[500px]'
          />
          <div className='bg-[rgba(0,0,0,0.4)] h-full w-full top-0 absolute'></div>
        </div>
      ))}
    </Carousel>
  );
};

export default CCarousel;
