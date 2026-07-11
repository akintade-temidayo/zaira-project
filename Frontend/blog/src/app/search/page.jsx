"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { apiRequest } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RecipeCard from "@/components/landing/RecipeCard";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const search = async () => {
            setLoading(true);
            try {
                const data = await apiRequest("/posts");
                const filtered = (data.data || []).filter((post) =>
                    post.title.toLowerCase().includes(query.toLowerCase()) ||
                    post.content.toLowerCase().includes(query.toLowerCase()) ||
                    post.category.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (query) search();
    }, [query]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex-1">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#0C1622]">
                        Search results for{" "}
                        <span className="text-[#F4796C]">&#34;{query}&#34;</span>
                    </h1>
                    <div className="h-0.5 w-10 bg-[#F4796C] mt-2 rounded-full" />
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-[#F4796C] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : results.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-[#6D757F]">
                            No recipes found for &#34;{query}&#34;
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((post) => (
                            <RecipeCard
                                key={post._id}
                                post={post}
                                variant="default"
                            />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}