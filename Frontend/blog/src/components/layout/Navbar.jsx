"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search, Heart, ShoppingBag, ChevronDown, User } from "lucide-react";
import Button from "../ui/Button";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { getToken, removeToken, getUser, removeUser } from "@/lib/authStorage";
import { getLikedPosts } from "@/lib/api";
import useSWR from "swr";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Features", href: "/features", hasDropdown: true },
    { label: "Categories", href: "/categories", hasDropdown: true },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const router = useRouter();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Computed once during first render — avoids setState-in-effect warning
    const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(getToken()));
    const [currentUser, setCurrentUser] = useState(() => getUser() || null);
    const fetcher = () => getLikedPosts();
    

    const { data, error, isLoading } = useSWR(
        getToken() ? "liked-posts" : null,
        fetcher
    );

    const likedCount = data?.count ?? 0;

    const fetchLikedCount = async () => {
        if (!getToken()) {
            setLikedCount(0);
            return;
        }
        try {
            const data = await getLikedPosts();
            setLikedCount(data.count || 0);
        } catch {
            setLikedCount(0);
        }
    };

    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(Boolean(getToken()));
            setCurrentUser(getUser() || null);
        };

        // fetchLikedCount();

        window.addEventListener("storage", checkAuth);
        window.addEventListener("likes-updated", () => mutate("liked-posts"));
        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("likes-updated", fetchLikedCount);
        };
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    };

    const handleLogout = () => {
        removeToken();
        removeUser();
        setIsLoggedIn(false);
        setCurrentUser(null);
        // setLikedCount(0);
        router.push("/");
    };

    return (
        <header className="w-full border-b border-[#DFDFDF] bg-white sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
                <button
                    className="lg:hidden text-[#0C1622]"
                    onClick={() => setIsMobileOpen((prev) => !prev)}
                    aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileOpen}
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <ul className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#0C1622]">
                    {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <Link
                                href={link.href}
                                className="flex items-center gap-1 hover:text-[#F4796C] transition-colors"
                            >
                                {link.label}
                                {link.hasDropdown && <ChevronDown size={14} />}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link href="/" className="flex items-center">
                    <Image
                        src={logo}
                        alt="Zaira Logo"
                        height={30}
                        width={0}
                        style={{ height: "30px", width: "auto" }}
                    />
                </Link>

                <div className="hidden lg:flex items-center gap-5">
                    <form onSubmit={handleSearch} className="flex items-center gap-2 border border-[#DFDFDF] rounded-full px-4 py-2">
                        <Search size={16} className="text-[#6D757F]" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="text-sm outline-none placeholder-[#6D757F] w-32"
                        />
                    </form>

                    <Link href="/wishlist" className="relative text-[#0C1622]">
                        <Heart size={20} />
                        <span className="absolute -top-2 -right-2 bg-[#F4796C] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                            {likedCount}
                        </span>
                    </Link>

                    <Link href="/cart" className="relative text-[#0C1622]">
                        <ShoppingBag size={20} />
                        <span className="absolute -top-2 -right-2 bg-[#F4796C] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                            0
                        </span>
                    </Link>

                    <Link href="/profile" className="relative flex-shrink-0">
                        <div className="w-9 h-9 rounded-full border-2 border-[#DFDFDF] overflow-hidden bg-[#E8F1F1] flex items-center justify-center hover:border-[#F4796C] transition-colors">
                            {currentUser?.profilePicture ? (
                                <img
                                    src={currentUser.profilePicture}
                                    alt={currentUser.fullName || "Profile"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User size={18} className="text-[#6D757F]" />
                            )}
                        </div>
                    </Link>

                    {isLoggedIn ? (
                        <div className="flex items-center gap-2">
                            <Link href="/dashboard">
                                <Button variant="outline" size="sm">
                                    Dashboard
                                </Button>
                            </Link>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="outline" size="sm">
                                Sign In
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="flex lg:hidden items-center gap-4">
                    <Link href="/wishlist" className="relative text-[#0C1622]">
                        <Heart size={20} />
                        <span className="absolute -top-2 -right-2 bg-[#F4796C] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                            {likedCount}
                        </span>
                    </Link>
                    <Link href="/cart" className="text-[#0C1622]">
                        <ShoppingBag size={20} />
                    </Link>
                </div>
            </nav>

            {isMobileOpen && (
                <div className="lg:hidden border-t border-[#DFDFDF] bg-white px-4 py-4">
                    <ul className="flex flex-col gap-4 text-sm font-medium text-[#0C1622]">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="flex items-center justify-between hover:text-[#F4796C] transition-colors"
                                >
                                    {link.label}
                                    {link.hasDropdown && <ChevronDown size={14} />}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2 border border-[#DFDFDF] rounded-full px-4 py-2 mt-4">
                        <Search size={16} className="text-[#6D757F]" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="text-sm outline-none placeholder-[#6D757F] w-full"
                        />
                    </div>

                    {isLoggedIn ? (
                        <div className="flex flex-col gap-2 mt-4">
                            <Link href="/dashboard" onClick={() => setIsMobileOpen(false)}>
                                <Button variant="outline" size="sm" className="w-full">
                                    Dashboard
                                </Button>
                            </Link>
                            <Button variant="primary" size="sm" className="w-full" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login" className="block mt-4">
                            <Button variant="outline" size="sm" className="w-full">
                                Sign In
                            </Button>
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}