import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SessionProvider } from "./context/SessionContext.tsx";

createRoot(document.getElementById("root")!).render(
  <SessionProvider>
    <App />
  </SessionProvider>,
);
