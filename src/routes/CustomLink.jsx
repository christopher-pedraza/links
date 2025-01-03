import { useParams } from "react-router";

import { getDocumentById } from "../firestore-functions";

import { useEffect, useState } from "react";
import { use } from "react";

export default function CustomLink() {
    let params = useParams();
    const [doc, setDoc] = useState(null);

    useEffect(() => {
        if (params.id) {
            getDocumentById("links", params.id).then((doc) => {
                setDoc(doc);
            });
        }
    }, [params.id]);

    useEffect(() => {
        console.log(doc);
    }, [doc]);

    if (!doc) {
        return <div>Loading... {params.id}</div>;
    }

    return (
        <div>
            <h1>Custom Link</h1>
            <p>Here is the custom link: {params.id}</p>
        </div>
    );
}
