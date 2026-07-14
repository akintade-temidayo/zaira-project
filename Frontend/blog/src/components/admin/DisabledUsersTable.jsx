"use client";

import UserRow from "./UserRow";

export default function DisabledUsersTable({ users, onReactivate }) {
    if (!users || users.length === 0) {
        return (
            <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-[#DFDFDF]">
                <p className="text-[#6D757F] text-sm">No disabled accounts found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#DFDFDF]">
            <div className="hidden sm:grid grid-cols-[1fr_1fr_80px_100px_120px] gap-4 px-6 py-3 bg-[#E8F1F1] text-xs font-semibold text-[#545E69] uppercase tracking-wide border-b border-[#DFDFDF]">
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
                        onDisable={() => {}} // Disabled accounts don't need a disable action
                        onReactivate={() => onReactivate(user._id)}
                    />
                ))}
            </ul>
        </div>
    );
}