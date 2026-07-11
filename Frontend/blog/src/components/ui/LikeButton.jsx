"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toggleLike } from "@/lib/api";
import { getUser } from "@/lib/authStorage";

export default function LikeButton({ post, className = "" }) {
    const user = getUser();
    const [liked, setLiked] = useState(
        Boolean(post.likedBy?.includes(user?.id))
    );
    const [loading, setLoading] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            window.location.href = "/login";
            return;
        }
        if (loading) return;

        setLoading(true);
        try {
            const data = await toggleLike(post._id);
            setLiked(data.liked);
            window.dispatchEvent(new Event("likes-updated"));
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            aria-label={liked ? "Unlike" : "Like"}
            className={`w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-105 transition-transform ${className}`}
        >
            <Heart
                size={16}
                className={liked ? "fill-[#F4796C] text-[#F4796C]" : "text-[#6D757F]"}
            />
        </button>
    );
}