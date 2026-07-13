"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiRequest } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecipeCard from "@/components/landing/RecipeCard";
import Link from "next/link";
import { CircleArrowLeft } from 'lucide-react';

export default function CategoryPage() {
    const { value } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!value) return;

        const fetchPosts = async () => {
            try {
                const data = await apiRequest(`/posts?category=${value}`);
                setPosts(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [value]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14">

                <Link
                    href="/"
                    className="mb-3 text-sm p-1 text-[#7C91AA] hover:text-[#F4796C] transition-colors flex items-center gap-1">
                    <CircleArrowLeft />
                    Back to Homepage
                </Link>

                <h1 className="text-2xl font-bold text-[#0C1622] capitalize mb-6">
                    {value} Recipes
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
                        No recipes found in this category yet.
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <RecipeCard key={post._id} post={post} variant="default" />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}