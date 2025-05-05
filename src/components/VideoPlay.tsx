import React from "react";
import { IoMdClose } from "react-icons/io";
import useFetchDetails from "../hooks/useFetchDetails";
import { DetailsType } from "../types/dataType";
interface VideoPlayType {
  data: DetailsType;
  close: () => void;
  media_type?: string;
}

const VideoPlay: React.FC<VideoPlayType> = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetails(
    `${media_type}/${data.id}/videos`
  );
  //   console.log("a", videoData?.results[0]?.key);
  return (
    <section className="fixed bg-neutral-700/40 top-0 right-0 bottom-0 left-0 z-40 flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative">
        <button
          className="absolute -top-7 right-0  text-3xl bg-white/50 text-black"
          onClick={close}
        >
          <IoMdClose />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default VideoPlay;
