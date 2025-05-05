import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import moment from "moment";
import Divider from "../components/Divider";
import useFetch from "../hooks/useFetch";
import HorizontalScrollCard from "../components/HorizontalScrollCard";

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector((state: RootState) => state.movie.imageURL);
  const { data } = useFetchDetails(`${params.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `${params.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `${params.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `${params.explore}/${params?.id}/recommendations`
  );
  // console.log("sim", similarData);
  const writer = castData?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el?.name)
    ?.join(", ");
  console.log(data);
  // console.log("castData", data.number_of_episodes ?? data.runtime);
  // console.log("w", writer);
  const duration = (Number(data?.runtime) / 60).toFixed(1).split(".");
  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            className="h-full w-full  object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/60 to-transparent"></div>
      </div>
      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="lg:-mt-28 lg:ml-0 relative mx-auto lg:mx-0 w-fit lg:min-w-60">
          <img
            src={imageURL + data?.poster_path}
            className="h-80 w-60 object-cover rounded"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white lg:text-3xl">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>
          <Divider />
          <div className="flex items-center gap-5">
            <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration:
              {data?.number_of_episodes
                ? " " + Number(data?.number_of_episodes) + " episodes"
                : `${duration[0]}h ${duration[1]}m`}
            </p>
          </div>
          <Divider />
          <div>
            <h3 className="text-xl font-bold text-white">Overview</h3>
            <p>{data?.overview}</p>
            <div className="flex gap-5 items-center my-3 text-center">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>
                Release Data:{" "}
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>Revenue: {Number(data?.revenue)}</p>
            </div>
            <Divider />
          </div>
          <div>
            <p>Director: {castData?.crew[0]?.name}</p>
            <Divider />
            <p>Writer: {writer}</p>
            {/* writer maybe not */}
          </div>
          <Divider />
          <h2>Cast:</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-3">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((starCast, index) => {
                return (
                  <div key={index}>
                    <div>
                      <img
                        className="w-20 h-20 object-cover rounded-full"
                        src={imageURL + starCast?.profile_path}
                      />
                    </div>
                    <p className="font-bold text-center text-sm text-neutral-400">
                      {starCast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar " + params?.explore}
          trending={false}
          media_type={params?.explore}
        />
        <HorizontalScrollCard
          data={recommendationData}
          heading={"Recommendation " + params?.explore}
          trending={false}
          media_type={params?.explore}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
