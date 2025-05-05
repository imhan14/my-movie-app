import React from "react";
import { RootState } from "../store/index";
import { useSelector } from "react-redux";
import { BannerItem } from "../types/dataType";
import moment from "moment";
import { Link } from "react-router-dom";

interface CardProps {
  data: BannerItem;
  trending?: boolean;
  index?: number;
  media_type?: string;
}
const Card: React.FC<CardProps> = ({ data, trending, index, media_type }) => {
  const imageURL = useSelector((state: RootState) => state.movie.imageURL);
  const mediaType = data.media_type ?? media_type;

  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="block w-full min-w-[230px] max-w-[250px] h-full overflow-hidden rounded relative hover:scale-105 transition-all"
    >
      {data?.poster_path ? (
        <img src={imageURL + data?.poster_path} alt="poster" />
      ) : (
        <div className="bg-neutral-800 h-full w-full">No image found</div>
      )}

      <div className="absolute top-2">
        {trending && (
          <div className="py-1 px-4 bg-black/50 backdrop-blur-2xl rounded-r-lg">
            #{index} Trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0 h-16 backdrop-blur-2xl w-full bg-black/50 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data?.title || data?.name}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>
          <p className="bg-black px-1 rounded-full text-xs text-white">
            Rating: {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
