"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RecipeCard from "@/components/landing/RecipeCard";
import { getLikedPosts } from "@/lib/api";
import { getToken } from "@/lib/authStorage";

export default function WishlistPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!getToken()) {
            router.push("/login");
            return;
        }

        const fetchLiked = async () => {
            try {
                const data = await getLikedPosts();
                setPosts(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLiked();
    }, [router]);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <h1 className="text-2xl font-bold text-[#0C1622] mb-6">
                Your Liked Recipes
            </h1>

            {loading && <div className="min-h-screen flex items-center justify-center gap-2 flex-col">
                <p className="text-md text-[#F4796C] font-bold">Loading...Please wait</p>
                <div className="flex gap-1 pb-2">
                    <span className="dot w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                    <span className="dot w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                    <span className="dot w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                </div>
                </div>}
            {error && <p className="text-sm text-[#F4796C]">{error}</p>}

            {!loading && posts.length === 0 && (
                <p className="text-sm text-[#6D757F]">
                    You haven&apos;t liked any recipes yet.
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <RecipeCard key={post._id} post={post} variant="default" />
                ))}
            </div>
        </main>
    );
}