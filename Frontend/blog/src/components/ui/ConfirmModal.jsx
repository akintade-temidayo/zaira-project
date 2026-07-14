"use client";

import { useEffect } from "react";
import Button from "./Button";

export default function ConfirmModal({
    isOpen,
    title = "Are you sure?",
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    danger = false,
    loading = false,
    onConfirm,
    onCancel,
}) {
    // close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onCancel?.();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
            onClick={onCancel}
        >
            <div
                className="bg-white rounded-2xl shadow-lg border border-[#DFDFDF] w-full max-w-sm p-6"
                onClick={(e) => e.stopPropagation()} // don't close when clicking inside the card
            >
                <h2 className="text-lg font-bold text-[#0C1622]">{title}</h2>

                {message && (
                    <p className="text-sm text-[#6D757F] mt-2 leading-relaxed">
                        {message}
                    </p>
                )}

                <div className="flex items-center gap-3 mt-6">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={danger ? "primary" : "dark"}
                        size="sm"
                        className="flex-1"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}