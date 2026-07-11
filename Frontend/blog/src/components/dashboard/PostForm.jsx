"use client";
import { useState } from "react";
import TitleField from "./fields/TitleField";
import ContentField from "./fields/ContentField";
import RecipeField from "./fields/RecipeField";
import CategoryField from "./fields/CategoryField";
import ImageField from "./fields/ImageField";
import Button from "@/components/ui/Button";

export default function PostForm({ form, setForm, isEdit, onSubmit, onClose, loading }) {
    const [imagePreview, setImagePreview] = useState(form.image || null);
    const [fieldErrors, setFieldErrors] = useState({
        title: "",
        content: "",
        recipe: "",
        image: ""
    });
    const [submitError, setSubmitError] = useState("");

    const setFieldError = (field) => (msg) => {
        setFieldErrors((prev) => ({ ...prev, [field]: msg }));
    };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitError("");

        const hasErrors = Object.values(fieldErrors).some(Boolean);
        if (hasErrors) {
            setSubmitError("Please fix the errors above before submitting.");
            return;
        }

        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
            <TitleField
                value={form.title}
                onChange={handleChange}
                error={fieldErrors.title}
                setError={setFieldError("title")}
            />

            <ContentField
                value={form.content}
                onChange={handleChange}
                error={fieldErrors.content}
                setError={setFieldError("content")}
            />

            <RecipeField
                value={form.recipe}
                onChange={handleChange}
                error={fieldErrors.recipe}
                setError={setFieldError("recipe")}
            />

            <CategoryField
                value={form.category}
                onChange={handleChange}
            />

            <ImageField
                isEdit={isEdit}
                preview={imagePreview}
                onPreviewChange={setImagePreview}
                onBase64Change={(base64) =>
                    setForm((prev) => ({ ...prev, image: base64 }))
                }
                error={fieldErrors.image}
                setError={setFieldError("image")}
            />

            {submitError && (
                <p className="text-sm text-[#F4796C] font-medium">{submitError}</p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#DFDFDF]">
                <Button type="button" variant="outline" size="sm" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={loading}>
                    {loading
                        ? isEdit ? "Saving..." : "Creating..."
                        : isEdit ? "Save Changes" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}