import { Routes, Route } from "react-router";

import Home from "./routes/Home";
import CustomLink from "./routes/CustomLink";
import Root from "./routes/Root";

function App() {
    return (
        <Routes>
            <Route path="links" element={<Root />}>
                <Route index element={<Home />} />
                <Route path=":id" element={<CustomLink />} />
            </Route>
        </Routes>
    );
}

export default App;
