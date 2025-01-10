import { Card, Form, Input, Button } from "@nextui-org/react";
import { useState } from "react";

export const CrossIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-x"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>
    );
};

export default function Home() {
    const [addedLinks, setAddedLinks] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        let formData = e.target.url.value;
        if (!formData.match(/^(http|https):\/\//)) {
            formData = "https://" + formData;
        } else if (!formData) {
            return;
        }
        setAddedLinks([...addedLinks, formData]);
    };

    const removeLink = (index) => {
        const newLinks = addedLinks.filter((_, i) => i !== index);
        setAddedLinks(newLinks);
    };

    return (
        <div className="flex items-center h-screen w-screen p-8 flex-col">
            <Card className="p-4 h-36 sm:h-24 w-3/4 flex justify-center items-center mb-8">
                <Form
                    className="w-full flex flex-col sm:flex-row items-center"
                    onSubmit={onSubmit}
                >
                    <Input
                        label="URL"
                        labelPlacement="inside"
                        name="url"
                        placeholder="https://"
                        size="lg"
                    />
                    <Button size="lg" type="submit" variant="bordered">
                        Add link
                    </Button>
                </Form>
            </Card>
            {addedLinks.length !== 0 && (
                <Card className="p-2 pl-4 pr-4 w-3/4 flex items-center">
                    {addedLinks.map((link, index) => (
                        <Card
                            key={index}
                            className="p-4 w-full flex items-center justify-between flex-row mb-2 mt-2"
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
