"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, removeToken } from "@/lib/authStorage";
import { apiRequest } from "@/lib/api";
import Button from "@/components/ui/Button";
import PostModal from "@/components/dashboard/PostModal";
import PostItem from "@/components/dashboard/PostItem";
import Link from "next/link";

export default function DashboardPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    // Isolated posts loading logic
    const loadPosts = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await apiRequest("/posts/my-posts", { auth: true });
            setPosts(data?.data || []);
        } catch (err) {
            setError(err.message || "Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    // Check authentication and load posts on mount
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
            return;
        }
        // Defer loading posts to avoid calling setState synchronously within the effect
        // which can cause cascading renders. Schedule on microtask queue.
        Promise.resolve().then(() => loadPosts());
    }, [router]);

    const handleNewPost = () => {
        setEditingPost(null);
        setModalOpen(true);
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setModalOpen(true);
    };

    const handleDelete = async (postId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this post? This cannot be undone."
        );
        if (!confirmed) return;

        try {
            await apiRequest(`/posts/${postId}`, {
                method: "DELETE",
                auth: true,
            });
            setPosts((prev) => prev.filter((p) => p._id !== postId));
        } catch (err) {
            alert(err.message || "Failed to delete post");
        }
    };

    const handleModalSuccess = (savedPost, isEdit) => {
        if (isEdit) {
            setPosts((prev) =>
                prev.map((p) => (p._id === savedPost._id ? savedPost : p))
            );
        } else {
            setPosts((prev) => [savedPost, ...prev]);
        }
        setModalOpen(false);
        setEditingPost(null);
    };

    const handleLogout = () => {
        removeToken();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-[#E8F1F1]">
            {/* Top bar */}
            <header className="bg-white border-b border-[#DFDFDF] sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <h1 className="text-lg sm:text-xl font-bold text-[#0C1622]">
                        My Dashboard
                    </h1>
                    <Link
                        href="/"
                        className="text-sm text-[#7C91AA] hover:text-[#F4796C] transition-colors flex items-center gap-1"
                    >
                        ← View Site
                    </Link>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleNewPost}
                        >
                            + New Post
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Stats bar */}
                <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <p className="text-sm text-[#6D757F]">Total Posts</p>
                        <p className="text-2xl font-bold text-[#0C1622]">
                            {posts.length}
                        </p>
                    </div>
                    <p className="text-sm text-[#7C91AA]">
                        Manage your recipes below
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="bg-white border border-[#F4796C] text-[#F4796C] rounded-xl px-4 py-3 text-sm mb-6">
                        {error}
                    </div>
                )}

                {/* Main View State logic */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-[#F4796C] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="bg-white rounded-xl p-10 text-center">
                        <p className="text-[#6D757F] text-sm mb-4">
                            You haven&apos;t created any posts yet.
                        </p>
                        <Button variant="primary" onClick={handleNewPost}>
                            Create your first post
                        </Button>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl overflow-hidden">
                        {/* Table header */}
                        <div className="hidden sm:grid grid-cols-[1fr_120px_100px_100px] gap-4 px-6 py-3 bg-[#E8F1F1] text-xs font-semibold text-[#545E69] uppercase tracking-wide">
                            <span>Title</span>
                            <span>Category</span>
                            <span>Date</span>
                            <span className="text-right">Actions</span>
                        </div>

                        <ul className="divide-y divide-[#DFDFDF]">
                            {posts.map((post) => (
                                <PostItem
                                    key={post._id}
                                    post={post}
                                    onEdit={() => handleEdit(post)}
                                    onDelete={() => handleDelete(post._id)}  />
                            ))}
                        </ul>
                    </div>
                )}
            </main>

            {/* Modal */}
            {modalOpen && (
                <PostModal
                    post={editingPost}
                    onClose={() => {
                        setModalOpen(false);
                        setEditingPost(null);
                    }}
                    onSuccess={handleModalSuccess}
                />
            )}
        </div>
    );
}