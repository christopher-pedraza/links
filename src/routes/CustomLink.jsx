import { useParams, useNavigate } from "react-router";

import { getLinksByName } from "../firestore-functions";

import { useEffect, useState } from "react";

import { Card } from "@heroui/react";

import "ldrs/bouncy";

export default function CustomLink() {
    let navigate = useNavigate();
    let params = useParams();
    const [links, setLinks] = useState(null);

    useEffect(() => {
        console.log(params.id);
        if (params.id) {
            getLinksByName("links", params.id)
                .then((doc) => {
                    console.log("Then");
                    setLinks(doc);
                })
                .catch(() => {
                    console.log("Catch");
                    navigate("/");
                });
        }
    }, [params.id]);

    useEffect(() => {
        console.log(links);
    }, [links]);

    if (!links) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <l-bouncy size="90" speed="1.75" color="#4287f5"></l-bouncy>
            </div>
        );
    }

    if (links.length === 0) {
        navigate("/");
    }

    return (
        <div className="flex items-center h-screen w-screen p-8 flex-col">
            <Card className="p-2 pl-4 pr-4 w-3/4 flex items-center overflow-y-auto">
                {links.map((link, index) => (
                    <Card
                        key={index}
                        className="p-4 w-full flex items-center justify-between flex-row mb-2 mt-2 min-h-24"
                    >
                        <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex flex-1 text-lg h-full items-center"
                        >
                            {link}
                        </a>
                    </Card>
                ))}
            </Card>
        </div>
    );
}
