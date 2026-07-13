"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUser, removeToken, removeUser } from "@/lib/authStorage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { LayoutDashboard, UserKey, LogOut, UserRoundX } from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();
    const token = getToken();
    const user = token ? getUser() : null;

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [router, token]);

    const handleLogout = () => {
        removeToken();
        removeUser();
        router.push("/");
    };

    if (!token || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center gap-2 flex-col">
                <p className="text-md text-[#F4796C] font-bold">Loading...Please wait</p>
                <div className="flex gap-1 pb-2">
                    <span className="dot w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                    <span className="dot w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                    <span className="dot w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                </div>
                </div>
        );
    }

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
                                    <img
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
                        <hr className="border-[#DFDFDF] mt-6 mb-2" />

                        {/* Actions */}
                        <div className="flex flex-col  ">
                            {/* dashboard action */}
                            <Link href="/dashboard" className="flex flex-row itwms-center gap-2 font-medium flex-1 w-full p-2 rounded-[5px] hover:bg-[rgb(124,145,170)] hover:text-[#DFDFDF]">
                                    <LayoutDashboard /> Dashboard 
                            </Link>

                            <hr className="border-[#DFDFDF] my-2" />

                            <Link href="/forgot-password" className="flex flex-row itwms-center gap-2 font-medium flex-1 w-full p-2 rounded-[5px] hover:bg-[#7C91AA] hover:text-[#DFDFDF]">
                                    <UserKey /> Change Password
                            </Link>

                            <hr className="border-[#DFDFDF] my-2" />

                            <div onClick={handleLogout} className="flex flex-row itwms-center gap-2 font-medium flex-1 w-full p-2 rounded-[5px] hover:bg-[#7C91AA] hover:text-[#DFDFDF]">
                                    <LogOut /> Logout
                            </div>

                            <hr className="border-[#DFDFDF] my-2" />

                            <div onClick={handleLogout} className="flex flex-row itwms-center gap-2 bg-[#F4796C] font-medium flex-1 w-full p-3 rounded-[5px]">
                                    <UserRoundX /> Delete Account
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}