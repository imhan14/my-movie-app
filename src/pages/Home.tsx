import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingData = useSelector(
    (state: RootState) => state.movie.bannerData
  );
  const { data: nowPlayingData } = useFetch("movie/now_playing");
  const { data: topRatedData } = useFetch("movie/top_rated");
  const { data: popularData } = useFetch("movie/popular");
  const { data: onTheAirData } = useFetch("tv/on_the_air");

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard
        data={trendingData}
        heading={"Trending"}
        trending={true}
      />
      <HorizontalScrollCard
        data={nowPlayingData}
        heading={"Now Playing"}
        trending={false}
        media_type="movie"
      />
      <HorizontalScrollCard
        data={topRatedData}
        heading={"Top Rated Movies"}
        trending={false}
        media_type="movie"
      />
      <HorizontalScrollCard
        data={popularData}
        heading={"Popular TV Show"}
        trending={false}
        media_type="tv"
      />
      <HorizontalScrollCard
        data={onTheAirData}
        heading={"On The Air"}
        trending={false}
        media_type="tv"
      />
    </div>
  );
};

export default Home;
