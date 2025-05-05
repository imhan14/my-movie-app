import { StrictMode } from "react";
// import ReactDOM from "react-dom/client";

import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
// import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import axios from "axios";
const apiToken: string | undefined = import.meta.env.VITE_API_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] = `Bearer ${apiToken}`;

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
);
