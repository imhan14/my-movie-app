import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { RootState } from "../store/index";
import { Link } from "react-router-dom";

const BannerHome = () => {
  const bannerData = useSelector((state: RootState) => state.movie.bannerData);
  const imageURL = useSelector((state: RootState) => state.movie.imageURL);
  const [currentImage, setCurrentImage] = useState(0);
  // console.log("banner", bannerData);
  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((preve) => preve - 1);
    }
    if (currentImage === 0) setCurrentImage(bannerData.length - 1);
  };
  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((preve) => preve + 1);
    }
    if (currentImage === bannerData.length - 1) setCurrentImage(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerData, imageURL, currentImage]);
  return (
    <section className="w-full h-full">
      <div className="flex min-h-ful max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => {
          // console.log(data);
          return (
            <div
              key={data.id + "bannerHome" + index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="w-full h-full">
                <img
                  src={imageURL + data.backdrop_path}
                  className="h-full w-full object-cover"
                />
              </div>
              {/* button nex or previous */}
              <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
                <button
                  onClick={handlePrevious}
                  className="hover:bg-white/50 z-10 p-1 text-2xl rounded-full"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="hover:bg-white/50 z-10 p-1 text-2xl rounded-full"
                >
                  <FaAngleRight />
                </button>
              </div>
              {/* details */}
              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto">
                <div className="w-full absolute bottom-0 max-w-md px-4">
                  <div>
                    <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                      {data?.title || data?.name}
                    </h2>
                    <p className="text-ellipsis line-clamp-3 my-2">
                      {data.overview}
                    </p>
                    <div className="flex items-center gap-4">
                      <p>Rating: {Number(data.vote_average).toFixed(1)}+ </p>
                      <span>|</span>
                      <p>View: {Number(data.popularity).toFixed(0)} </p>
                    </div>
                    <Link to={"/" + data?.media_type + "/" + data.id}>
                      <button className="cursor-pointer bg-white px-4 py-2 text-black font-bold rounded mt-3 hover:bg-gradient-to-l from-red-500 to-orange-300 shadow-md transition-all hover:scale-105">
                        Play Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
