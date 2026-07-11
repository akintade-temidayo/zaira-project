"use client";
import Input from "@/components/ui/Input";

const LETTERS_ONLY = /^[a-zA-Z\s]*$/;

export default function TitleField({ value, onChange, error, setError }) {
    const handleChange = (e) => {
        const val = e.target.value;
        if (!LETTERS_ONLY.test(val)) {
            setError("Title can only contain letters and spaces");
        } else {
            setError("");
        }
        onChange(e);
    };

    return (
        <Input
            label="Title"
            name="title"
            value={value}
            onChange={handleChange}
            placeholder="e.g. Jollof Rice"
            required
            error={error}
        />
    );
}