import { Card, Form, Input, Button, Divider } from "@heroui/react";
import { useState, useRef } from "react";
import { CrossIcon, ShareIcon } from "@/assets/Icons";
import { createDocument, checkIfNameAvailable } from "@/firestore-functions";
import { useNavigate } from "react-router";

export default function Home() {
    const [addedLinks, setAddedLinks] = useState([]);
    const [name, setName] = useState("");
    const [url, setURL] = useState("");
    const [isSharing, setIsSharing] = useState(false);

    const inputRef = useRef(null);

    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        let urlValue = e.target.url.value;
        if (!urlValue.match(/^(http|https):\/\//)) {
            urlValue = "https://" + urlValue;
        } else if (!urlValue) {
            return;
        }
        setAddedLinks([...addedLinks, urlValue]);
        setURL("");
        inputRef.current.focus();
    };

    const removeLink = (index) => {
        const newLinks = addedLinks.filter((_, i) => i !== index);
        setAddedLinks(newLinks);
    };

    const shareLinks = async () => {
        setIsSharing(true);
        if (addedLinks.length === 0) {
            setIsSharing(false);
            return;
        }
        if (!name) {
            setIsSharing(false);
            return;
        }
        const isAvailable = await checkIfNameAvailable("links", name);
        if (!isAvailable) {
            setIsSharing(false);
            return;
        } else {
            createDocument("links", name, addedLinks).then((id) => {
                if (!id) {
                    // TODO: Show error message to the user
                    setIsSharing(false);
                    return;
                }
                navigate(`/${name}`);
            });
        }
    };

    const sanitizeName = (name) => {
        // Sanitize name to be url friendly
        setName(name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase());
    };

    return (
        <div className="flex items-center h-screen w-screen p-8 flex-col">
            <Card className="p-4 h-52 sm:h-40 w-3/4 flex justify-center items-center mb-8">
                <div className="w-full flex flex-col">
                    <div className="w-full">
                        <Input
                            label="Link name (optional)"
                            labelPlacement="inside"
                            name="name"
                            size="md"
                            value={name}
                            onValueChange={sanitizeName}
                        />
                        <Divider
                            orientation="horizontal"
                            className="mt-2 mb-2"
                        />
                    </div>
                    <Form className="w-full" onSubmit={onSubmit}>
                        <div className="w-full flex flex-col sm:flex-row items-center">
                            <Input
                                ref={inputRef}
                                label="URL"
                                labelPlacement="inside"
                                name="url"
                                placeholder="https://"
                                size="md"
                                value={url}
                                onValueChange={setURL}
                            />
                            <div className="flex flex-row ml-0 sm:ml-2 mt-2 sm:mt-0 justify-center items-center">
                                <Button
                                    size="md"
                                    type="submit"
                                    variant="bordered"
                                    className="mr-2"
                                >
                                    Add link
                                </Button>
                                <Divider orientation="vertical" />
                                <Button
                                    size="md"
                                    isIconOnly
                                    color="primary"
                                    onPress={shareLinks}
                                    isLoading={isSharing}
                                >
                                    <ShareIcon />
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </Card>
            {addedLinks.length !== 0 && (
                <Card className="p-2 pl-4 pr-4 w-3/4 flex items-center overflow-y-auto">
                    {addedLinks.map((link, index) => (
                        <Card
                            key={index}
                            className="p-4 w-full flex items-center justify-between flex-row mb-2 mt-2 min-h-16"
                        >
                            <a
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-1 text-lg h-full items-center"
                            >
                                {link}
                            </a>
                            <Button
                                isIconOnly
                                color="danger"
                                onPress={() => removeLink(index)}
                            >
                                <CrossIcon />
                            </Button>
                        </Card>
                    ))}
                </Card>
            )}
        </div>
    );
}
