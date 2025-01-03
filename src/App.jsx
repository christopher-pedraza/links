import {
    getDocumentById,
    createDocumentWithArray,
} from "./firestore-functions";

import { useEffect } from "react";

function App() {
    useEffect(() => {
        getDocumentById("links", "rvhdBFhJ1iQq88Y2fudB").then((data) => {
            console.log(data);
        });
    }, []);
    // createDocumentWithArray("links", [
    //     "https://www.google.com",
    //     "https://www.youtube.com",
    // ]);
    return <></>;
}

export default App;
