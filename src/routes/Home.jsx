import { Card, Form, Input, Button } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
    const [submitted, setSubmitted] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        let formData = e.target.url.value;
        // check if the url is valid and starts with http or https
        if (!formData.match(/^(http|https):\/\//)) {
            formData = "https://" + formData;
        } else if (!formData) {
            return;
        }
        console.log(formData);
        setSubmitted(formData);
    };

    return (
        <div className="flex justify-center h-screen w-screen p-8">
            <Card className="p-4 h-36 sm:h-24 w-3/4 flex justify-center items-center">
                <Form
                    className="w-full flex flex-col sm:flex-row items-center"
                    onSubmit={onSubmit}
                >
                    <Input
                        label="URL"
                        labelPlacement="inside"
                        name="url"
                        placeholder="https://"
                    />
                    <Button size="lg" type="submit" variant="bordered">
                        Add link
                    </Button>
                </Form>
            </Card>
        </div>
    );
}
