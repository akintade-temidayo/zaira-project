"use client";

import { useMemo } from "react";

export default function PostItem({ post, onEdit, onDelete }) {
    const formattedDate = useMemo(() => {
        if (!post?.createdAt) return "";

        try {
            const dateObj = new Date(post.createdAt);
            if (isNaN(dateObj.getTime())) return "";

            return dateObj.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return "";
        }
    }, [post]);

    const categoryColors = {
        breakfast: "bg-[#E8F1F1] text-[#183354]",
        lunch: "bg-[#FFF3F2] text-[#F4796C]",
        dinner: "bg-[#183354] text-white",
    };

    return (
        <li className="px-4 sm:px-6 py-4">
            {/* Mobile layout */}
            <div className="flex flex-col gap-2 sm:hidden">
                <p className="font-medium text-[#0C1622] text-sm leading-snug">
                    {post?.title || "Untitled Post"}
                </p>
                <div className="flex items-center justify-between">
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                            categoryColors[post?.category?.toLowerCase()] ||
                            "bg-[#DFDFDF] text-[#545E69]"
                        }`}
                    >
                        {post?.category || "Uncategorized"}
                    </span>
                    <span className="text-xs text-[#7C91AA]">{formattedDate}</span>
                </div>
                <div className="flex gap-2 mt-1">
                    <button
                        onClick={onEdit}
                        className="flex-1 text-xs border border-[#B8C1CD] text-[#183354] rounded-md py-1.5 hover:border-[#183354] transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex-1 text-xs border border-[#F4796C] text-[#F4796C] rounded-md py-1.5 hover:bg-[#FFF3F2] transition"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden sm:grid grid-cols-[1fr_120px_100px_100px] gap-4 items-center">
                <div>
                    <p className="font-medium text-[#0C1622] text-sm leading-snug line-clamp-1">
                        {post?.title || "Untitled Post"}
                    </p>
                    <p className="text-xs text-[#7C91AA] mt-0.5 line-clamp-1">
                        {post?.slug || "no-slug"}
                    </p>
                </div>

                <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize w-fit ${
                        categoryColors[post?.category?.toLowerCase()] ||
                        "bg-[#DFDFDF] text-[#545E69]"
                    }`}
                >
                    {post?.category || "Uncategorized"}
                </span>

                <span className="text-xs text-[#7C91AA]">{formattedDate}</span>

                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={onEdit}
                        className="text-xs border border-[#B8C1CD] text-[#183354] rounded-md px-3 py-1.5 hover:border-[#183354] transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="text-xs border border-[#F4796C] text-[#F4796C] rounded-md px-3 py-1.5 hover:bg-[#FFF3F2] transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
}