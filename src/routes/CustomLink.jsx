import { useParams, useNavigate } from "react-router";

import { getDocumentLinks } from "../firestore-functions";

import { useEffect, useState } from "react";

export default function CustomLink() {
    let navigate = useNavigate();
    let params = useParams();
    const [doc, setDoc] = useState(null);

    useEffect(() => {
        if (params.id) {
            getDocumentLinks("links", params.id).then((doc) => {
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

    if (doc.length === 0) {
        navigate("/links");
    }

    return (
        <div>
            <h1>Custom Link</h1>
            {doc.map((link) => (
                <div key={link}>
                    <a href={link} key={link}>
                        {link}
                    </a>
                </div>
            ))}
        </div>
    );
}
