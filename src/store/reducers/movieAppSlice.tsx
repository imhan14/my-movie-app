import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BannerItem } from "../../types/dataType";

interface MovieState {
  bannerData: BannerItem[];
  imageURL: string;
}
const initialState: MovieState = {
  bannerData: [],
  imageURL: "",
};

export const movieAppSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setBannerData: (state, action: PayloadAction<BannerItem[]>) => {
      state.bannerData = action.payload;
    },
    setImageURL: (state, action: PayloadAction<string>) => {
      state.imageURL = action.payload;
    },
  },
});

export const { setBannerData, setImageURL } = movieAppSlice.actions;
export default movieAppSlice.reducer;
