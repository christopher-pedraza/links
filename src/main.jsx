import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <NextUIProvider>
            <main className="dark text-foreground bg-background">
                <App />
            </main>
        </NextUIProvider>
    </BrowserRouter>
);
