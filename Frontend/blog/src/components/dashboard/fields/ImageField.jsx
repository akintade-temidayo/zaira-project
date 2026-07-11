"use client";
import Image from "next/image";

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif"
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function ImageField({
    isEdit,
    preview,
    onPreviewChange,
    onBase64Change,
    error,
    setError
}) {
    const handleChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            setError("Only image files are allowed (JPG, PNG, WEBP, GIF)");
            e.target.value = "";
            return;
        }

        if (file.size > MAX_SIZE) {
            setError("Image must be smaller than 5MB");
            e.target.value = "";
            return;
        }

        setError("");

        try {
            const previewUrl = URL.createObjectURL(file);
            onPreviewChange(previewUrl);
            const base64 = await fileToBase64(file);
            onBase64Change(base64);
        } catch {
            setError("Failed to process image. Try another file.");
        }
    };

    return (
        <div className="w-full">
            <label className="block mb-1.5 text-sm font-medium text-[#183354]">
                Image {isEdit && "(leave empty to keep current)"}
            </label>
            <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                onChange={handleChange}
                className="text-sm text-[#6D757F] w-full"
            />
            <p className="text-xs text-[#7C91AA] mt-1">
                Accepted: JPG, PNG, WEBP, GIF — Max 5MB
            </p>
            {error && (
                <p className="mt-1 text-sm text-[#F4796C]">{error}</p>
            )}
            {preview && (
                <Image
                    src={preview}
                    alt="Preview"
                    width={96}
                    height={96}
                    className="mt-2 rounded-md border border-[#DFDFDF] object-cover"
                    unoptimized
                />
            )}
        </div>
    );
}