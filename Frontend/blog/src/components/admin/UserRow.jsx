// user row
"use client";

export default function UserRow({ user, onDisable, onReactivate }) {
    const date = new Date(user.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <li className="px-4 sm:px-6 py-4">
            {/* Mobile layout */}
            <div className="flex flex-col gap-2 sm:hidden">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E8F1F1] overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt={user.fullName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-sm">👤</span>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-[#0C1622] text-sm">
                            {user.fullName}
                        </p>
                        <p className="text-xs text-[#7C91AA]">{user.email}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[#6D757F]">
                        <span>{user.postCount} posts</span>
                        <span>·</span>
                        <span
                            className={`px-2 py-0.5 rounded-full font-medium ${
                                user.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                            }`}
                        >
                            {user.isActive ? "Active" : "Disabled"}
                        </span>
                    </div>
                    {user.isActive ? (
                        <button
                            onClick={onDisable}
                            className="text-xs border border-[#F4796C] text-[#F4796C] rounded-md px-3 py-1.5 hover:bg-[#FFF3F2] transition"
                        >
                            Disable
                        </button>
                    ) : (
                        <button
                            onClick={onReactivate}
                            className="text-xs border border-[#183354] text-[#183354] rounded-md px-3 py-1.5 hover:bg-[#E8F1F1] transition"
                        >
                            Reactivate
                        </button>
                    )}
                </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden sm:grid grid-cols-[1fr_1fr_80px_100px_120px] gap-4 items-center">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#E8F1F1] overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt={user.fullName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-sm">👤</span>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="font-medium text-[#0C1622] text-sm truncate">
                            {user.fullName}
                        </p>
                        <p className="text-xs text-[#7C91AA]">{date}</p>
                    </div>
                </div>

                <p className="text-sm text-[#6D757F] truncate">{user.email}</p>

                <p className="text-sm text-[#6D757F]">{user.postCount}</p>

                <span
                    className={`text-xs px-2 py-1 rounded-full font-medium w-fit ${
                        user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                    }`}
                >
                    {user.isActive ? "Active" : "Disabled"}
                </span>

                <div className="flex justify-end">
                    {user.isActive ? (
                        <button
                            onClick={onDisable}
                            className="text-xs border border-[#F4796C] text-[#F4796C] rounded-md px-3 py-1.5 hover:bg-[#FFF3F2] transition"
                        >
                            Disable
                        </button>
                    ) : (
                        <button
                            onClick={onReactivate}
                            className="text-xs border border-[#183354] text-[#183354] rounded-md px-3 py-1.5 hover:bg-[#E8F1F1] transition"
                        >
                            Reactivate
                        </button>
                    )}
                </div>
            </div>
        </li>
    );
}