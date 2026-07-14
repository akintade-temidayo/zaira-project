"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, getIsAdmin, removeToken, removeIsAdmin, removeUser } from "@/lib/authStorage";
import { apiRequest } from "@/lib/api";
import StatsCards from "@/components/admin/StatsCards";
import UsersTable from "@/components/admin/UsersTable";
import DisabledUsersTable from "@/components/admin/DisabledUsersTable";
import PostsTable from "@/components/admin/PostsTable"; // Changed from RecipesTable
import Button from "@/components/ui/Button";
import Link from "next/link";
import { CircleArrowLeft } from 'lucide-react';

export default function AdminPage() {
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]); // Changed from recipes to posts
    const [activeTab, setActiveTab] = useState("users"); // "users" | "recipes" | "disabled"
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            // We fetch the posts using /posts (with authentication) 
            // and fallback to /admin/posts if needed
            const [statsData, usersData, postsData] = await Promise.all([
                apiRequest("/admin/stats", { auth: true }),
                apiRequest("/admin/users", { auth: true }),
                apiRequest("/posts", { auth: true })
                    .catch(() => apiRequest("/admin/posts", { auth: true }))
                    .catch(() => ({ data: [] }))
            ]);
            
            setStats(statsData.data);
            setUsers(usersData.data || []);
            setPosts(postsData.data || []);
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

    const disabledUsers = users.filter((u) => !u.isActive);

    return (
        <div className="min-h-screen bg-[#E8F1F1]">
            <header className="bg-[#0C1622] sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <h1 className="text-white font-bold text-lg">Zaira Admin</h1>
                    <Button variant="primary" size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </header>
            
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {loading ? (
                    <div className="min-h-screen flex items-center justify-center gap-2 flex-col">
                        <p className="text-md text-[#F4796C] font-bold">Loading...Please wait</p>
                        <div className="flex gap-1 pb-2">
                            <span className="w-4 h-4 rounded-2xl bg-[#F4796C] inline-block animate-bounce" />
                            <span className="w-4 h-4 rounded-2xl bg-[#F4796C] inline-block animate-bounce [animation-delay:0.2s]" />
                            <span className="w-4 h-4 rounded-2xl bg-[#F4796C] inline-block animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                ) : error ? (
                    <p className="text-[#F4796C] text-sm text-center py-20">{error}</p>
                ) : (
                    <>
                        <Link
                            href="/"
                            className="mb-3 text-sm p-1 text-[#7C91AA] hover:text-[#F4796C] transition-colors flex items-center gap-1 w-fit"
                        >
                            <CircleArrowLeft size={16} />
                            View site
                        </Link>

                        {stats && (
                            <StatsCards 
                                stats={stats} 
                                activeTab={activeTab} 
                                setActiveTab={setActiveTab} 
                            />
                        )}

                        <div className="mt-8">
                            <div className="flex items-center justify-between border-b border-[#DFDFDF] pb-1 mb-6">
                                <div className="flex gap-6 sm:gap-8">
                                    <button onClick={() => setActiveTab("users")} className="relative pb-1 text-sm sm:text-base font-bold hover:border-[#F4796C] transition-colors">
                                        <span className={activeTab === "users" ? "text-[#0C1622]" : "text-[#7C91AA] hover:text-[#0C1622]"}>All Users</span>
                                        {activeTab === "users" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F4796C] rounded-full" />}
                                    </button>

                                    <button onClick={() => setActiveTab("recipes")} className="relative pb-1 text-sm sm:text-base font-bold transition-colors">
                                        <span className={activeTab === "recipes" ? "text-[#0C1622]" : "text-[#7C91AA] hover:text-[#0C1622]"}>All Recipes</span>
                                        {activeTab === "recipes" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F4796C] rounded-full" />}
                                    </button>

                                    <button onClick={() => setActiveTab("disabled")} className="relative pb-1 text-sm sm:text-base font-bold transition-colors">
                                        <span className={activeTab === "disabled" ? "text-[#0C1622]" : "text-[#7C91AA] hover:text-[#0C1622]"}>Disabled Users</span>
                                        {activeTab === "disabled" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F4796C] rounded-full" />}
                                    </button>
                                </div>
                                <button onClick={fetchData} className="text-sm text-[#7C91AA] hover:text-[#183354] transition-colors">
                                    ↻ Refresh
                                </button>
                            </div>

                            {activeTab === "users" && (
                                <UsersTable 
                                    users={users} 
                                    onDisable={handleDisable} 
                                    onReactivate={handleReactivate} 
                                />
                            )}
                            
                            {activeTab === "recipes" && (
                                <PostsTable 
                                    posts={posts} 
                                />
                            )}
                            
                            {activeTab === "disabled" && (
                                <DisabledUsersTable 
                                    users={disabledUsers} 
                                    onReactivate={handleReactivate} 
                                />
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}