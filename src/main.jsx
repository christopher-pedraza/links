import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")).render(
    <HashRouter>
        <HeroUIProvider>
            <main className="dark text-foreground bg-background">
                <App />
            </main>
        </HeroUIProvider>
    </HashRouter>
);
