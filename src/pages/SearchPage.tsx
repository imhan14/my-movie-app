import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { BannerItem } from "../types/dataType";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState<BannerItem[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const query = location?.search?.slice(3);

  const fetchData = async () => {
    try {
      const response = await axios.get(`search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });
      setData((preve) => {
        return [...preve, ...response.data.results];
      });
      // console.log("response", response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [location?.search]);
  // console.log("location", data);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      setPage((preve) => preve + 1);
    }
  };
  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="pt-16">
      <div className="lg:hidden m-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="text-lg px-4 py-1 w-full bg-white rounded-full text-neutral-600"
          value={query.split("%20").join(" ")}
        />
      </div>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search Results
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((searchData, index) => {
            return (
              <Card
                data={searchData}
                key={searchData.id + "search" + index}
                media_type={searchData.media_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
