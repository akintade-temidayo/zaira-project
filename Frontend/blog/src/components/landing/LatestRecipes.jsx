"use client"

import Link from "next/link";
import RecipeCard from "./RecipeCard";
import AuthorCard from "./AuthorCard";
import SubscribeFollowers from "./SubscribeFollowers";
import { ArrowUpRight } from 'lucide-react';

export default function LatestRecipes({ posts = [] }) {
    if (posts.length === 0) return null;

    const [featured, second, third] = posts;
    const latestAuthor = posts[0]?.author;

    return (
        <section className="max-w-7xl mx-auto px-22 sm:px-6 py-14 sm:py-14">
            {/* Section header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0C1622]">
                        Explore Latest Recipes
                    </h2>
                    <div className="mt-2 h-0 w-6 border-t-[5px] border-l-[4px] border-r-[4px] border-t-[#F4796C] border-l-transparent border-r-transparent" />
                </div>
                <Link
                    href="/posts"
                    className="text-[12px] uppercase font-semibold text-[#0C1622] border border-[#E2E8F0] px-3 py-1.5 rounded-[5px] hover:shadow-sm flex items-center gap-1 transition-all"
                >
                    View All
                    <span className="text-[#F4796C]">
                        <ArrowUpRight className="w-4 h-4" />
                    </span>
                </Link>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left & Middle Area (Takes up 8 of 12 columns) */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Left Column: Big Feature Card */}
                    <div>
                        {featured && (
                            <RecipeCard post={featured} variant="hero" />
                        )}
                    </div>

                    {/* Middle Column: Two Stacked Horizontal Cards */}
                    <div className="flex flex-col gap-6">
                        {second && (
                            <RecipeCard post={second} variant="hero" />
                        )}
                        {third && (
                            <RecipeCard post={third} variant="hero" />
                        )}
                    </div>
                </div>

                {/* Right Column: Author Sidebar Component (Takes up 4 of 12 columns) */}
                <div className="lg:col-span-4 flex flex-col ">
                <AuthorCard author={latestAuthor} />
                <SubscribeFollowers /> {/* <-- Added perfectly right below */}
            </div>

            </div>
        </section>
    );
}