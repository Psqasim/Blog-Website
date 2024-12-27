'use client'
import Image from "next/image";
import dynamic from "next/dynamic";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function SampleNextArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <div
      className="w-14 md:w-44 h-8 absolute bottom-20 md:bottom-32 z-30 right-4 md:right-10 border-[1px] border-gray-900 px-2 hover:border-gray-800 bg-black/50 hover:bg-black shadow-btnShadow overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full h-full text-gray-300 text-sm uppercase relative flex items-center justify-end cursor-pointer group">
        <span className="hidden md:block absolute -translate-x-28 translate-y-0 group-hover:-translate-y-7 transition-transform duration-500">
          next
        </span>
        <span className="hidden md:block absolute -translate-x-28 translate-y-7 group-hover:translate-y-0 transition-transform duration-500">
          next
        </span>
        <span className="text-lg">
          <FaChevronRight />
        </span>
      </div>
    </div>
  );
}

function SamplePrevArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <div
      className="w-14 md:w-44 h-8 absolute bottom-20 md:bottom-32 z-30 left-4 md:left-10 border-[1px] border-gray-900 px-2 hover:border-gray-800 bg-black/50 hover:bg-black shadow-btnShadow overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full h-full text-gray-300 text-sm uppercase relative flex items-center justify-between cursor-pointer group">
        <span className="text-lg">
          <FaChevronLeft />
        </span>
        <span className="hidden md:block absolute translate-x-24 translate-y-0 group-hover:-translate-y-7 transition-transform duration-500">
          previous
        </span>
        <span className="hidden md:block absolute translate-x-24 translate-y-7 group-hover:translate-y-0 transition-transform duration-500">
          previous
        </span>
      </div>
    </div>
  );
}

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const images = [
    "/images/bannerImgOne.png",
    "/images/bannerImgTwo.png",
    "/images/bannerImgThree.jpg",
    "/images/bannerImgFour.png",
  ];

  return (
    <div className="w-full h-[400px] md:h-[650px] relative">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <div className="relative w-full h-[400px] md:h-[650px]">
              <Image
                src={img}
                alt={`bannerImg${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
