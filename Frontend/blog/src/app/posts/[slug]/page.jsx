// src/app/posts/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LikeButton from "@/components/ui/LikeButton";
import Image from "next/image";

export default function SinglePostPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            try {
                const data = await apiRequest(`/posts/${slug}`, { auth: true });
                setPost(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const categoryColors = {
        breakfast: "bg-[#E8F1F1] text-[#183354]",
        lunch: "bg-[#FFF3F2] text-[#F4796C]",
        dinner: "bg-[#183354] text-white",
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#E8F1F1]">
                <div className="w-8 h-8 border-4 border-[#F4796C] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F1F1] gap-4 px-4">
                <p className="text-[#F4796C] text-sm text-center">
                    {error || "Post not found"}
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="text-sm text-[#183354] underline"
                >
                    Back to home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16">

                {/* Category badge + Like button */}
                <div className="flex items-center justify-between mb-4">
                    <span
                        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                            categoryColors[post.category] ||
                            "bg-[#DFDFDF] text-[#545E69]"
                        }`}
                    >
                        {post.category}
                    </span>

                    <LikeButton post={post} />
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0C1622] leading-tight mb-4">
                    {post.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-3 text-sm text-[#7C91AA] mb-8">
                    <span>By {post.author?.fullName || 'Admin'}</span>
                    <span>•</span>
                    <span>{formatDate(post.createdAt)}</span>
                </div>

                {/* Cover image */}
                {post.image && (
                    <div className="w-full rounded-xl overflow-hidden mb-8 max-h-105">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <section className="mb-10">
                    <p className="text-[#545E69] text-base leading-relaxed whitespace-pre-line">
                        {post.content}
                    </p>
                </section>

                {/* Divider */}
                <hr className="border-[#DFDFDF] mb-10" />

                {/* Recipe section */}
                <section>
                    <h2 className="text-xl font-bold text-[#0C1622] mb-4">
                        Recipe
                    </h2>
                    <div className="bg-[#E8F1F1] rounded-xl p-5 sm:p-6">
                        <p className="text-[#545E69] text-sm leading-relaxed whitespace-pre-line">
                            {post.recipe}
                        </p>
                    </div>
                </section>

                {/* Back link */}
                <div className="mt-10">
                    <button
                        onClick={() => router.back()}
                        className="text-sm text-[#7C91AA] hover:text-[#183354] transition flex items-center gap-1"
                    >
                        ← Back
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}