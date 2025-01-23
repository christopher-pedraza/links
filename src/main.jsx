import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router";
import App from "./App.jsx";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById("root")).render(
    <HashRouter>
        <HeroUIProvider>
            <main className="dark text-foreground bg-background">
                <App />
            </main>
        </HeroUIProvider>
    </HashRouter>
);
