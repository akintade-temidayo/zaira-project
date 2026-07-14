"use client";

export default function StatsCards({ stats }) {
    const cards = [
        {
            label: "Total Users",
            value: stats.totalUsers,
            bg: "bg-[#183354]",
            text: "text-white",
        },
        {
            label: "Total Recipes",
            value: stats.totalPosts,
            bg: "bg-[#F4796C]",
            text: "text-white",
        },
        {
            label: "Disabled Accounts",
            value: stats.disabledUsers,
            bg: "bg-white",
            text: "text-[#0C1622]",
            border: true,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className={`${card.bg} ${card.text} ${
                        card.border ? "border border-[#DFDFDF]" : ""
                    } rounded-xl p-6 flex items-center justify-between transition-transform duration-500 shadow-md hover:shadow-lg ease-in-out hover:scale-105 cursor-pointer`}
                >
                    <div>
                        <p className={`text-sm font-medium ${card.text} opacity-80`}>
                            {card.label}
                        </p>
                        <p className="text-3xl font-bold mt-1">{card.value}</p>
                    </div>
                    <span className="text-4xl">{card.icon}</span>
                </div>
            ))}
        </div>
    );
}