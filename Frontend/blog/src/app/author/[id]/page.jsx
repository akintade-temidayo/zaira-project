"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecipeCard from "@/components/landing/RecipeCard";
import { CircleArrowLeft } from 'lucide-react';

export default function AuthorPage() {
    const { id } = useParams();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchAuthorPosts = async () => {
            try {
                // fetch all posts then filter by author id
                const data = await apiRequest("/posts");
                const allPosts = data.data || [];

                // filter posts by this author
                const authorPosts = allPosts.filter(
                    (post) => post.author?._id === id || post.author === id
                );

                if (authorPosts.length > 0) {
                    setAuthor(authorPosts[0].author);
                    setPosts(authorPosts);
                } else {
                    setError("No posts found for this author");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorPosts();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center gap-2 flex-col">
                <p className="text-md text-[#F4796C] font-bold">Loading...Please wait</p>
                <div className="flex gap-1 pb-2">
                    <span className="dot w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                    <span className="dot w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                    <span className="dot w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
                <p className="text-[#F4796C] text-sm">{error}</p>
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

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">

                {/* Back button */}
                <div className="mb-4">
                    <button
                        onClick={() => router.back()}
                        className="mb-3 text-sm p-1 text-[#7C91AA] hover:text-[#F4796C] transition-colors flex items-center gap-1">
                        <CircleArrowLeft /> Back
                    </button>
                </div>

                {/* Author header */}
                {author && (
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 pb-8 border-b border-[#DFDFDF]">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-[#E8F1F1] flex-shrink-0 border-2 border-[#DFDFDF]">
                            {author.profilePicture ? (
                                <img
                                    src={author.profilePicture}
                                    alt={author.fullName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl">
                                    👤
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-[#0C1622]">
                                {author.fullName}
                            </h1>
                            <p className="text-sm text-[#7C91AA] mt-1">
                                {posts.length} {posts.length === 1 ? "recipe" : "recipes"} posted
                            </p>
                        </div>
                    </div>
                )}

                {/* Section header */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#0C1622]">
                        Recipes by {author?.fullName?.split(" ")[0]}
                    </h2>
                    <div className="h-0.5 w-10 bg-[#F4796C] mt-1 rounded-full" />
                </div>

                {/* Posts grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <RecipeCard
                            key={post._id}
                            post={post}
                            variant="default"
                        />
                    ))}
                </div>

                {/* Back button
                <div className="mt-10">
                    <button
                        onClick={() => router.back()}
                        className="text-sm text-[#7C91AA] hover:text-[#183354] transition flex items-center gap-1"
                    >
                        ← Back
                    </button>
                </div> */}
            </main>

            <Footer />
        </div>
    );
}