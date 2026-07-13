"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import NewsletterBanner from "@/components/landing/NewsletterBanner";
import CategorySection from "@/components/landing/CategorySection";
import WeeklyBest from "@/components/landing/WeeklyBest";
import LatestRecipes from "@/components/landing/LatestRecipes";
import Image from "next/image";
import logo from "../../public/logo.png";

// Fisher-Yates shuffle — true random, different every call
function shufflePosts(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Seeded PRNG (mulberry32)
function seededRandom(seed) {
    return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Same shuffle but driven by seeded PRNG
function seededShuffle(array, seed) {
    const shuffled = [...array];
    const random = seededRandom(seed);
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Stays constant all week then changes
function getWeekSeed() {
    const now = new Date();
    const anchor = new Date(2024, 0, 1);
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysSinceAnchor = Math.floor((now - anchor) / msPerDay);
    return Math.floor(daysSinceAnchor / 7);
}

export default function HomePage() {
    const [allPosts, setAllPosts] = useState([]);
    const [heroPosts, setHeroPosts] = useState([]);
    const [weeklyBest, setWeeklyBest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const allData = await apiRequest("/posts");
                const posts = allData.data || [];

                setAllPosts(posts);

                // Hero: genuinely random every page load
                setHeroPosts(shufflePosts(posts).slice(0, 4));

                // Weekly Best: consistent for everyone all week
                const weekSeed = getWeekSeed();
                setWeeklyBest(seededShuffle(posts, weekSeed).slice(0, 8));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Most recently posted author — backend sorts by createdAt: -1
    // so allPosts[0] is always the latest post
    const latestAuthor = allPosts[0]?.author || null;

        if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Image
                    src={logo}
                    alt="Zaira"
                    height={60}
                    width={0}
                    style={{ height: "60px", width: "auto" }}
                    className="animate-pulse"
                    priority
                />
            </div>
        );
        }

        if (error) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <p className="text-[#F4796C] text-sm">{error}</p>
                </div>
            );
        }

    return (
    <div className="min-h-screen bg-white flex flex-col">
        <Navbar />

        {/* Hero — 4 random posts, reshuffled on every page load */}
        <HeroSection posts={heroPosts} />

        <NewsletterBanner />

        {/* Latest recipes — no sidebar, full width */}
        <LatestRecipes posts={allPosts} />

        <CategorySection />

        {/* Weekly Best — same for everyone all week */}
        <WeeklyBest posts={weeklyBest} />

        <Footer />
    </div>
);
}