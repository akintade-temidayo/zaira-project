"use client"

import React from "react";
import Link from "next/link";

export default function AuthorCard({ author, className = "" }) {
    if (!author) return null;

    const SOCIAL_ICONS = {
        facebook: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
        ),
        twitter: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
        ),
        instagram: (
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
        ),
        youtube: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
        )
    };

    return (
        <div className={`relative bg-[#FAFAFA] border border-[#E2E8F0] rounded-xl px-6 pb-8 pt-20 flex flex-col items-center text-center mt-12 shadow-xs ${className}`}>

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-80 mix-blend-multiply rounded-xl overflow-hidden"
                style={{ backgroundImage: "url('/Background.png')" }}
            >
                <div className="absolute top-0 inset-x-0 h-[4px] bg-[#F4796C]" />
            </div>

            {/* Clickable profile picture → goes to author's posts page */}
            <Link
                href={`/author/${author._id}`}
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full p-1 bg-white shadow-md z-10 hover:scale-105 transition-transform"
            >
                <div className="w-full h-full rounded-full overflow-hidden bg-[#F2F4F7]">
                    {author.profilePicture ? (
                        <img
                            src={author.profilePicture}
                            alt={author.fullName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl bg-slate-100">
                            👤
                        </div>
                    )}
                </div>
            </Link>

            {/* Clickable name → same destination */}
            <Link
                href={`/author/${author._id}`}
                className="z-10 hover:text-[#F4796C] transition-colors"
            >
                <h3 className="text-[#0C1622] font-bold text-xl tracking-tight">
                    Hi, I&apos;m {author.fullName?.split(" ")[0] || "Jenny"}!
                </h3>
            </Link>

            <p className="text-[13px] text-[#4A5568] mt-4 leading-relaxed max-w-[290px] font-medium z-10">
                {author.bio || "When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book."}
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6 z-10">
                {Object.keys(SOCIAL_ICONS).map((platform) => (
                        <a
                        href={`#${platform}`}
                        key={platform}
                        className="w-8 h-8 rounded-full bg-[#F4796C] hover:bg-[#e26255] hover:scale-105 transition-all flex items-center justify-center text-white shadow-xs"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {SOCIAL_ICONS[platform]}
                    </a>
                ))}
            </div>

            {/* View all posts link */}
            <Link
                href={`/author/${author._id}`}
                className="mt-5 text-xs text-[#F4796C] hover:underline font-medium z-10"
            >
                View all recipes by {author.fullName?.split(" ")[0]} →
            </Link>
        </div>
    );
}