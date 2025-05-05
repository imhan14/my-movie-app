import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { BannerItem } from "../types/dataType";

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState<BannerItem[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  console.log("params", totalPage);
  const fetchData = async () => {
    try {
      const response = await axios.get(`discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });
      setData((preve) => {
        return [...preve, ...response.data.results];
      });
      setTotalPage(response.data.total_pages);
      // console.log("response", response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      setPageNo((preve) => preve + 1);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageNo]);
  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Popular {params.explore} Show
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-4 justify-center lg:justify-start">
          {data.map((exploreData, index) => {
            return (
              <Card
                data={exploreData}
                key={exploreData.id + "exploreSection" + index}
                media_type={params.explore}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
