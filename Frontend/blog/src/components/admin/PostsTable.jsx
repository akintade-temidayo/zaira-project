"use client";

import Link from "next/link";

export default function RecipesTable({ posts }) {
    if (!posts || posts.length === 0) {
        return (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-[#DFDFDF]">
                <p className="text-[#6D757F] text-sm">No recipes found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#DFDFDF]">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_120px] gap-4 px-6 py-3 bg-[#E8F1F1] text-xs font-semibold text-[#545E69] uppercase tracking-wide border-b border-[#DFDFDF]">
                <span>Recipe Title</span>
                <span>Category</span>
                <span>Author</span>
                <span className="text-right">Created</span>
            </div>

            <ul className="divide-y divide-[#DFDFDF]">
                {posts.map((post) => {
                    // 1. Resolve Author ID (checking for raw MongoDB $oid first)
                    const authorId = 
                        post.author?.$oid || 
                        (typeof post.author === "string" ? post.author : null) ||
                        post.user?._id || 
                        post.userId?._id;

                    // 2. Resolve Author Name
                    const authorName = 
                        post.authorName || 
                        post.author?.fullName || 
                        post.author?.name || 
                        post.user?.fullName || 
                        "Chef Zaira";

                    // 3. Resolve Date (handling MongoDB nested $date string)
                    const rawDate = post.createdAt?.$date || post.createdAt;
                    const dateString = rawDate 
                        ? new Date(rawDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })
                        : "N/A";
                        
                    return (
                        <li key={post._id?.$oid || post._id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                            {/* Desktop Layout */}
                            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_120px] gap-4 items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#E8F1F1] overflow-hidden flex-shrink-0 flex items-center justify-center">
                                        {post.image ? (
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-sm">🍳</span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#0C1622] text-sm truncate max-w-[280px]">{post.title}</p>
                                        {/* Optional micro-snippet of the recipe steps */}
                                        {post.recipe && (
                                            <p className="text-[11px] text-[#7C91AA] line-clamp-1 max-w-[280px]">
                                                {post.recipe}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 capitalize w-fit">
                                    {post.category || "Breakfast"}
                                </span>

                                {/* Clickable Author Link */}
                                <div className="text-sm text-[#6D757F] truncate">
                                    {authorId ? (
                                        <Link 
                                            href={`/author/${authorId}`} 
                                            className="font-medium text-[#183354] hover:text-[#F4796C] hover:underline transition-all"
                                        >
                                            {authorName}
                                        </Link>
                                    ) : (
                                        <span className="text-gray-400">{authorName}</span>
                                    )}
                                </div>

                                <p className="text-xs text-[#7C91AA] text-right">{dateString}</p>
                            </div>

                            {/* Mobile Layout */}
                            <div className="flex flex-col gap-2 sm:hidden">
                                <div className="flex justify-between items-start">
                                    <p className="font-semibold text-[#0C1622] text-sm">{post.title}</p>
                                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] text-[#0C1622] capitalize">{post.category || "Breakfast"}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-[#7C91AA]">
                                    <span>
                                        By{" "}
                                        {authorId ? (
                                            <Link 
                                                href={`/author/${authorId}`} 
                                                className="font-medium text-[#183354] hover:text-[#F4796C] hover:underline"
                                            >
                                                {authorName}
                                            </Link>
                                        ) : (
                                            authorName
                                        )}
                                    </span>
                                    <span>{dateString}</span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}