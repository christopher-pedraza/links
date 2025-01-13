import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
    <HashRouter>
        <NextUIProvider>
            <main className="dark text-foreground bg-background">
                <App />
            </main>
        </NextUIProvider>
    </HashRouter>
);
