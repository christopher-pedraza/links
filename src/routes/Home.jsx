import { Card, Form, Input, Button, Divider } from "@nextui-org/react";
import { useState, useRef } from "react";
import { CrossIcon, ShareIcon } from "@/assets/Icons";
import { createDocumentWithArray } from "@/firestore-functions";
import { useNavigate } from "react-router";

export default function Home() {
    const [addedLinks, setAddedLinks] = useState([]);
    const [value, setValue] = useState("");
    const [isSharing, setIsSharing] = useState(false);

    const inputRef = useRef(null);

    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        let formData = e.target.url.value;
        if (!formData.match(/^(http|https):\/\//)) {
            formData = "https://" + formData;
        } else if (!formData) {
            return;
        }
        setAddedLinks([...addedLinks, formData]);
        setValue("");
        inputRef.current.focus();
    };

    const removeLink = (index) => {
        const newLinks = addedLinks.filter((_, i) => i !== index);
        setAddedLinks(newLinks);
    };

    const shareLinks = async () => {
        setIsSharing(true);
        createDocumentWithArray("links", addedLinks).then((id) => {
            if (!id) {
                // TODO: Show error message to the user
                setIsSharing(false);
                return;
            }
            navigate(`/#/links/${id}`);
        });
    };

    return (
        <div className="flex items-center h-screen w-screen p-8 flex-col">
            <Card className="p-4 h-36 sm:h-24 w-3/4 flex justify-center items-center mb-8">
                <Form
                    className="w-full flex flex-col sm:flex-row items-center"
                    onSubmit={onSubmit}
                >
                    <Input
                        ref={inputRef}
                        label="URL"
                        labelPlacement="inside"
                        name="url"
                        placeholder="https://"
                        size="lg"
                        value={value}
                        onValueChange={setValue}
                    />
                    <Button size="lg" type="submit" variant="bordered">
                        Add link
                    </Button>
                    <Divider orientation="vertical" />
                    <Button
                        isIconOnly
                        color="primary"
                        onPress={shareLinks}
                        isLoading={isSharing}
                    >
                        <ShareIcon />
                    </Button>
                </Form>
            </Card>
            {addedLinks.length !== 0 && (
                <Card className="p-2 pl-4 pr-4 w-3/4 flex items-center overflow-y-auto">
                    {addedLinks.map((link, index) => (
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
