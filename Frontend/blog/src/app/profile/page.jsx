"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUser, removeToken, removeUser } from "@/lib/authStorage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(() => getUser());

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        removeToken();
        removeUser();
        router.push("/");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#E8F1F1] flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-10">
                <div className="bg-white rounded-2xl shadow-sm border border-[#DFDFDF] overflow-hidden">
                    {/* Cover */}
                    <div className="h-28 bg-gradient-to-r from-[#183354] to-[#7C91AA]" />

                    {/* Avatar + info */}
                    <div className="px-8 pb-8">
                        {/* Profile picture */}
                        <div className="relative -mt-12 mb-4">
                            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-[#E8F1F1] flex items-center justify-center shadow-sm">
                                {user.profilePicture ? (
                                    <image
                                        src={user.profilePicture}
                                        alt={user.fullName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl">👤</span>
                                )}
                            </div>
                        </div>

                        {/* Name and email */}
                        <h1 className="text-xl font-bold text-[#0C1622]">
                            {user.fullName}
                        </h1>
                        <p className="text-sm text-[#7C91AA] mt-0.5">
                            {user.email}
                        </p>

                        {/* Divider */}
                        <hr className="border-[#DFDFDF] my-6" />

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/dashboard" className="flex-1">
                                <Button
                                    variant="primary"
                                    className="w-full"
                                >
                                    My Dashboard
                                </Button>
                            </Link>
                            <Link href="/forgot-password" className="flex-1">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                >
                                    Change Password
                                </Button>
                            </Link>
                            <Button
                                variant="dark"
                                className="flex-1"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}