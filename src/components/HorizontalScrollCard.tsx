import React, { useRef } from "react";
import Card from "./Card";
import { BannerItem } from "../types/dataType";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface HorizontalScrollCardProps {
  data?: BannerItem[];
  heading: string;
  trending: boolean;
  media_type?: string;
}

const HorizontalScrollCard: React.FC<HorizontalScrollCardProps> = ({
  data = [],
  heading,
  trending,
  media_type,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };
  const handlePrevious = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };
  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-xl font-bold lg:text-2xl mb-2 text-white capitalize">
        {heading}
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="overflow-hidden grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none"
        >
          {data.map((data, index) => {
            return (
              <Card
                key={data.id + "heading" + index}
                data={data}
                trending={trending}
                index={index + 1}
                media_type={media_type}
              />
            );
          })}
        </div>
        <div className="absolute top-0 hidden lg:flex justify-between items-center w-full h-full">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -ml-1 z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-1 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
