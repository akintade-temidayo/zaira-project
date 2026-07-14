"use client";

import Link from "next/link";

export default function UserRow({ user, onDisable, onReactivate }) {
    // 1. Safety check: If user object is undefined or null, render nothing
    if (!user) return null;

    const formattedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
        : "N/A";

    // 2. Bulletproof Post Count Resolver
    const postCount = (() => {
        // If it's a direct number under any of these common names
        if (typeof user.postsCount === "number") return user.postsCount;
        if (typeof user.postCount === "number") return user.postCount;
        if (typeof user.recipesCount === "number") return user.recipesCount;
        if (typeof user.recipeCount === "number") return user.recipeCount;

        // If the backend returns posts/recipes as an array of objects, count them
        if (Array.isArray(user.posts)) return user.posts.length;
        if (Array.isArray(user.recipes)) return user.recipes.length;

        // Fallbacks
        return user.posts || user.recipes || 0;
    })();

    return (
        <li className="px-6 py-4 hover:bg-slate-50 transition-colors">
            {/* Desktop Layout */}
            <div className="hidden sm:grid grid-cols-[1fr_1fr_80px_100px_120px] gap-4 items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E8F1F1] overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt={user.fullName || "User"}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-sm">👤</span>
                        )}
                    </div>
                    <div>
                        {/* USER NAME LINK TO PROFILE */}
                        {user._id ? (
                            <Link 
                                href={`/author/${user._id}`}
                                className="font-semibold text-[#0C1622] text-sm hover:text-[#F4796C] hover:underline transition-colors block"
                            >
                                {user.fullName || "Unnamed User"}
                            </Link>
                        ) : (
                            <span className="font-semibold text-[#0C1622] text-sm block">
                                {user.fullName || "Unnamed User"}
                            </span>
                        )}
                        <p className="text-xs text-[#7C91AA]">{formattedDate}</p>
                    </div>
                </div>

                <p className="text-sm text-[#6D757F] truncate">{user.email || "No email"}</p>
                {/* DISPLAY RESOLVED POST COUNT */}
                <p className="text-sm text-[#6D757F] font-medium">{postCount}</p>

                <div>
                    <span
                        className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                            user.isActive
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                    >
                        {user.isActive ? "Active" : "Disabled"}
                    </span>
                </div>

                <div className="text-right">
                    {user.isActive ? (
                        <button
                            onClick={onDisable}
                            className="px-3 py-1.5 text-xs font-semibold text-rose-500 border border-rose-200 hover:bg-rose-50 hover:border-rose-300 rounded-lg transition-colors"
                        >
                            Disable
                        </button>
                    ) : (
                        <button
                            onClick={onReactivate}
                            className="px-3 py-1.5 text-xs font-semibold text-emerald-500 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 rounded-lg transition-colors"
                        >
                            Reactivate
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col gap-2 sm:hidden">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E8F1F1] overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {user.profilePicture ? (
                                <img
                                    src={user.profilePicture}
                                    alt={user.fullName || "User"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-xs">👤</span>
                            )}
                        </div>
                        <div>
                            {/* MOBILE USER NAME LINK TO PROFILE */}
                            {user._id ? (
                                <Link 
                                    href={`/author/${user._id}`}
                                    className="font-semibold text-[#0C1622] text-sm hover:text-[#F4796C] hover:underline"
                                >
                                    {user.fullName || "Unnamed User"}
                                </Link>
                            ) : (
                                <span className="font-semibold text-[#0C1622] text-sm">
                                    {user.fullName || "Unnamed User"}
                                </span>
                            )}
                            <p className="text-[10px] text-[#7C91AA]">{formattedDate}</p>
                        </div>
                    </div>
                    <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                            user.isActive
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                    >
                        {user.isActive ? "Active" : "Disabled"}
                    </span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#6D757F] mt-1">
                    <span>{user.email || "No email"}</span>
                    {/* DISPLAY RESOLVED POST COUNT */}
                    <span className="font-medium">{postCount} posts</span>
                </div>
                <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-slate-100">
                    {user.isActive ? (
                        <button
                            onClick={onDisable}
                            className="w-full py-1.5 text-xs font-semibold text-rose-500 border border-rose-200 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                            Disable
                        </button>
                    ) : (
                        <button
                            onClick={onReactivate}
                            className="w-full py-1.5 text-xs font-semibold text-emerald-500 border border-emerald-200 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                            Reactivate
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
}