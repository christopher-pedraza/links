import { Card, Form, Input, Button, Divider } from "@heroui/react";
import { useState, useRef } from "react";
import { CrossIcon, ShareIcon } from "@/assets/Icons";
import { createDocument, checkIfNameAvailable } from "@/firestore-functions";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Home() {
    const [addedLinks, setAddedLinks] = useState([]);
    const [name, setName] = useState("");
    const [url, setURL] = useState("");
    const [isSharing, setIsSharing] = useState(false);

    // Error messages
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorDuration, setErrorDuration] = useState(6000);

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

    const uploadDocument = async (name) => {
        sanitizeName(name);
        createDocument("links", name, addedLinks)
            .then((id) => {
                if (!id) {
                    showErrorMessage(
                        "An error occurred while sharing the links."
                    );
                    setIsSharing(false);
                    return;
                }
                navigate(`/${name}`);
            })
            .catch(() => {
                showErrorMessage("An error occurred while sharing the links.");
                setIsSharing(false);
            });
    };

    const shareLinks = async () => {
        setIsSharing(true);
        if (addedLinks.length === 0) {
            showErrorMessage("Please add at least one link to share.");
            setIsSharing(false);
            return;
        }
        if (name) {
            checkIfNameAvailable("links", name)
                .then((isAvailable) => {
                    if (!isAvailable) {
                        showErrorMessage("Name is not available.");
                        setIsSharing(false);
                        return;
                    } else {
                        uploadDocument(name);
                    }
                })
                .catch(() => {
                    showErrorMessage(
                        "An error occurred while sharing the links."
                    );
                    setIsSharing(false);
                });
        } else {
            const generatedName = generateValidName();
            uploadDocument(generatedName);
        }
    };

    const sanitizeName = (name) => {
        // Sanitize name to be url friendly
        setName(name.replace(/[^a-zA-Z0-9]/g, ""));
    };

    const showErrorMessage = (message, duration = 6000) => {
        setErrorMessage(message);
        setErrorDuration(duration);
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const generateValidName = () => {
        let name = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            name += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        if (checkIfNameAvailable("links", name)) {
            return name;
        } else {
            return generateValidName();
        }
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
                            type="text"
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
                                type="url"
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
            <Snackbar
                open={open}
                autoHideDuration={errorDuration}
                onClose={handleClose}
            >
                <Alert
                    variant="filled"
                    sx={{ width: "100%" }}
                    severity="error"
                    onClose={handleClose}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
