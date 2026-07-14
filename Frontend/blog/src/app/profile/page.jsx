"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUser, removeToken, removeUser, removeIsAdmin } from "@/lib/authStorage";
import { apiRequest } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Link from "next/link";
import { LayoutDashboard, UserKey, LogOut, UserRoundX } from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const token = getToken();
    const user = token ? getUser() : null;

    useEffect(() => {
        if (!token) router.push("/login");
    }, [router, token]);

    const handleLogout = () => {
        removeToken();
        removeUser();
        removeIsAdmin();
        router.push("/");
    };

    // opens the modal — the actual delete call now lives in confirmDeleteAccount below
    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    // runs only when the user actually confirms inside the modal
    const confirmDeleteAccount = async () => {
        setDeleting(true);
        try {
            await apiRequest("/auth/delete-account", {
                method: "DELETE",
                auth: true,
            });
            removeToken();
            removeUser();
            removeIsAdmin();
            router.push("/login?deleted=true");
        } catch (err) {
            alert(err.message || "Failed to delete account");
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const ACTIONS = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            type: "link",
            href: "/dashboard",
            style: "default",
        },
        {
            id: "change-password",
            label: "Change Password",
            icon: UserKey,
            type: "link",
            href: "/forgot-password",
            style: "default",
        },
        {
            id: "logout",
            label: "Logout",
            icon: LogOut,
            type: "button",
            onClick: handleLogout,
            style: "default",
        },
        {
            id: "delete",
            label: "Delete Account",
            icon: UserRoundX,
            type: "button",
            onClick: handleDeleteAccount,
            style: "danger",
        },
    ];

    if (!token || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center gap-2 flex-col">
                <p className="text-md text-[#F4796C] font-bold">
                    Loading...Please wait
                </p>
                <div className="flex gap-1 pb-2">
                    <span className="w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                    <span className="w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                    <span className="w-4 h-4 rounded-2xl bg-[#F4796C] inline-block" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#E8F1F1] flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-10">
                <div className="bg-white rounded-2xl shadow-sm border border-[#DFDFDF] overflow-hidden">

                    <div className="h-28 bg-gradient-to-r from-[#183354] to-[#7C91AA]" />

                    <div className="px-8 pb-8">

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

                        <h1 className="text-xl font-bold text-[#0C1622]">
                            {user.fullName}
                        </h1>
                        <p className="text-sm text-[#7C91AA] mt-0.5">
                            {user.email}
                        </p>

                        <hr className="border-[#DFDFDF] mt-6 mb-2" />

                        <div className="flex flex-col">
                            {ACTIONS.map((action, index) => {
                                const Icon = action.icon;

                                const baseClass = "flex flex-row items-center gap-3 font-medium w-full p-3 rounded-lg transition-colors";

                                const styleClass = action.style === "danger"
                                    ? "bg-[#F4796C] text-white hover:bg-[#e26255]"
                                    : "hover:bg-[#7C91AA] hover:text-white text-[#0C1622]";

                                const content = (
                                    <>
                                        <Icon size={20} />
                                        {action.label}
                                    </>
                                );

                                return (
                                    <div key={action.id}>
                                        {index > 0 && (
                                            <hr className="border-[#DFDFDF] my-1" />
                                        )}

                                        {action.type === "link" ? (
                                            <Link
                                                href={action.href}
                                                className={`${baseClass} ${styleClass}`}
                                            >
                                                {content}
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={action.onClick}
                                                className={`${baseClass} ${styleClass}`}
                                            >
                                                {content}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>

            {/* Delete-account confirmation — replaces the old window.confirm */}
            <ConfirmModal
                isOpen={showDeleteModal}
                title="Delete your account?"
                message="When you delete you wont have access to this account again, are you sure you want to delete your account"
                confirmLabel="Delete Account"
                cancelLabel="Cancel"
                danger
                loading={deleting}
                onConfirm={confirmDeleteAccount}
                onCancel={() => setShowDeleteModal(false)}
            />

            <Footer />
        </div>
    );
}