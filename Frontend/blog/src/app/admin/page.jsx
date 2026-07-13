// admin page
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, getIsAdmin, removeToken, removeIsAdmin, removeUser } from "@/lib/authStorage";
import { apiRequest } from "@/lib/api";
import StatsCards from "@/components/admin/StatsCards";
import UsersTable from "@/components/admin/UsersTable";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../blog/public/logo.png";

export default function AdminPage() {
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsData, usersData] = await Promise.all([
                apiRequest("/admin/stats", { auth: true }),
                apiRequest("/admin/users", { auth: true }),
            ]);
            setStats(statsData.data);
            setUsers(usersData.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = getToken();
        const isAdmin = getIsAdmin();

        if (!token || !isAdmin) {
            router.push("/login");
            return;
        }

        // call fetchData asynchronously to avoid synchronous setState during effect
        const t = setTimeout(() => {
            fetchData();
        }, 0);

        return () => clearTimeout(t);
    }, [router]);

    const handleDisable = async (userId) => {
        const confirmed = window.confirm("Disable this account?");
        if (!confirmed) return;
        try {
            await apiRequest(`/admin/users/${userId}/disable`, {
                method: "PATCH",
                auth: true,
            });
            setUsers((prev) =>
                prev.map((u) =>
                    u._id === userId ? { ...u, isActive: false } : u
                )
            );
        } catch (err) {
            alert(err.message);
        }
    };

    const handleReactivate = async (userId) => {
        const confirmed = window.confirm("Reactivate this account?");
        if (!confirmed) return;
        try {
            await apiRequest(`/admin/users/${userId}/reactivate`, {
                method: "PATCH",
                auth: true,
            });
            setUsers((prev) =>
                prev.map((u) =>
                    u._id === userId ? { ...u, isActive: true } : u
                )
            );
        } catch (err) {
            alert(err.message);
        }
    };

    const handleLogout = () => {
        removeToken();
        removeIsAdmin();
        removeUser();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-[#E8F1F1]">
            {/* Top bar */}
            <header className="bg-[#0C1622] sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="flex flex-col gap-1 text-white font-bold text-lg">
                            Zaira Admin

                        <Link
                            href="/"
                            className="text-[#7C91AA] hover:text-white text-sm transition-colors">
                            ← View Site
                        </Link>
                        </h1>
                    </div>
                    <Button variant="primary" size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </header>
            
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
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
                ) : error ? (
                    <p className="text-[#F4796C] text-sm text-center py-20">{error}</p>
                ) : (
                    <>
                        {/* Stats */}
                        {stats && <StatsCards stats={stats} />}

                        {/* Users table */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-lg font-bold text-[#0C1622]">
                                        All Users
                                    </h2>
                                    <div className="h-0.5 w-8 bg-[#F4796C] mt-1 rounded-full" />
                                </div>
                                <button
                                    onClick={fetchData}
                                    className="text-sm text-[#7C91AA] hover:text-[#183354] transition-colors"
                                >
                                    ↻ Refresh
                                </button>
                            </div>
                            <UsersTable
                                users={users}
                                onDisable={handleDisable}
                                onReactivate={handleReactivate}
                            />
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}