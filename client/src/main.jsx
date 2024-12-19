import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SocketIoContextProvider } from "../scoektIoContext/Socket.Io.jsx";
import { LoggedinUserContextProvider } from "../scoektIoContext/LoggdinUserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <LoggedinUserContextProvider>
    <SocketIoContextProvider>
      <App />
    </SocketIoContextProvider>
    </LoggedinUserContextProvider>
  </BrowserRouter>
);
