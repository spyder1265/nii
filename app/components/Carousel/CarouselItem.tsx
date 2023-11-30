import React from "react";
import Image from "next/image";

interface CarouselItemProps {
  image: string;
  name: string;
  description: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  image,
  name,
  description,
}) => {
  return (
    <div className='relative'>
      <Image
        src={image}
        width='900'
        height='900'
        className='h-full lg:max-h-[590px] scale-100 object-cover w-full'
        alt={name}
        priority
      />
    </div>
  );
};

export default CarouselItem;
