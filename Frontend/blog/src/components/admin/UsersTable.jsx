"use client";

import UserRow from "./UserRow";

export default function UsersTable({ users, onDisable, onReactivate }) {
    if (users.length === 0) {
        return (
            <div className="bg-white rounded-xl p-10 text-center">
                <p className="text-[#6D757F] text-sm">No users found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden">
            {/* Table header — hidden on mobile */}
            <div className="hidden sm:grid grid-cols-[1fr_1fr_80px_100px_120px] gap-4 px-6 py-3 bg-[#E8F1F1] text-xs font-semibold text-[#545E69] uppercase tracking-wide">
                <span>Name</span>
                <span>Email</span>
                <span>Posts</span>
                <span>Status</span>
                <span className="text-right">Action</span>
            </div>

            <ul className="divide-y divide-[#DFDFDF]">
                {users.map((user) => (
                    <UserRow
                        key={user._id}
                        user={user}
                        onDisable={() => onDisable(user._id)}
                        onReactivate={() => onReactivate(user._id)}
                    />
                ))}
            </ul>
        </div>
    );
}