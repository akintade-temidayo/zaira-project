"use client";

import { useState, useEffect, useRef } from "react";
import { apiRequest } from "@/lib/api";
import PostForm from "./PostForm";

const EMPTY_FORM = {
    title: "",
    content: "",
    recipe: "",
    category: "breakfast",
    image: null,
};

export default function PostModal({ post, onClose, onSuccess }) {
    const isEdit = Boolean(post);
    const overlayRef = useRef(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setForm(
                post
                    ? {
                        title: post.title || "",
                        content: post.content || "",
                        recipe: post.recipe || "",
                        category: post.category || "breakfast",
                        image: post.image || null,
                    }
                    : EMPTY_FORM
            );
            setError("");
        }, 0);
        return () => window.clearTimeout(timeoutId);
    }, [post]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose();
    };

    const handleSubmit = async () => {
        setError("");
        setLoading(true);
        try {
            const data = isEdit
                ? await apiRequest(`/posts/${post?._id}`, {
                    method: "PUT",
                    auth: true,
                    body: form,
                })
                : await apiRequest("/posts", {
                    method: "POST",
                    auth: true,
                    body: form,
                });
            onSuccess(data?.data, isEdit);
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-6"
        >
            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#DFDFDF]">
                    <h2 className="text-lg font-bold text-[#0C1622]">
                        {isEdit ? "Edit Post" : "New Post"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-[#6D757F] hover:text-[#0C1622] text-xl leading-none"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <p className="px-6 pt-4 text-sm text-[#F4796C] font-medium">
                        {error}
                    </p>
                )}

                {/* Form */}
                <PostForm
                    form={form}
                    setForm={setForm}
                    isEdit={isEdit}
                    onSubmit={handleSubmit}
                    onClose={onClose}
                    loading={loading}
                />
            </div>
        </div>
    );
}