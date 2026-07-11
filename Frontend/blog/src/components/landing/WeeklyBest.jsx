"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RecipeCard from "./RecipeCard";
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function WeeklyBest({ posts = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // ✅ auto-advance every 3 seconds
    useEffect(() => {
        if (posts.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % posts.length);
        }, 6000);

        return () => clearInterval(interval); // cleanup
    }, [posts.length]);

    if (posts.length === 0) return null;

    const featured = posts[currentIndex];
    const rest = posts.filter((_, i) => i !== currentIndex).slice(0, 3);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
    };

    return (
        <section className="w-[80%] mx-auto px-4 sm:px-6 py-10 sm:py-14">
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0C1622]">
                        Weekly Best Recipes
                    </h2>
                    <div className="h-0.5 w-10 bg-[#F4796C] mt-1 rounded-full" />
                </div>

                <div className="flex items-center gap-3">
                    {/* ✅ prev / next arrows */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={goToPrev}
                            className="h-7 w-7 rounded-full border border-[#DFDFDF] flex items-center justify-center hover:border-[#F4796C] hover:text-[#F4796C] transition"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <button
                            onClick={goToNext}
                            className="h-7 w-7 rounded-full border border-[#DFDFDF] flex items-center justify-center hover:border-[#F4796C] hover:text-[#F4796C] transition"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>

                    <Link
                        href="/posts"
                        className="text-[12px] text-[#0C1622] border border-[#000000] px-2 py-1 rounded-[5px] hover:shadow-md flex items-center gap-1"
                    >
                        View All
                        <span className="text-[#F4796C]">
                            <ArrowUpRight />
                        </span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* ✅ Featured large card — cycles through posts */}
                <div className="rounded-xl overflow-hidden h-70 sm:h-90 relative">
                    {/* smooth fade transition */}
                    <div key={featured._id} className="w-full h-full animate-fadeIn">
                        <RecipeCard
                            post={featured}
                            variant="featured"
                        />
                    </div>

                    {/* ✅ dot indicators at the bottom */}
                    {/* <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                        {posts.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className="rounded-full transition-all duration-300"
                                style={{
                                    width: i === currentIndex ? "20px" : "6px",
                                    height: "6px",
                                    background: i === currentIndex ? "#F4796C" : "rgba(255,255,255,0.6)",
                                }}
                            />
                        ))}
                    </div> */}
                </div>

                {/* Smaller cards — right column */}
                <div className="flex flex-col gap-4 sm:gap-5">
                    {rest.slice(0, 3).map((post) => (
                        <RecipeCard
                            key={post._id}
                            post={post}
                            variant="horizontal"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}