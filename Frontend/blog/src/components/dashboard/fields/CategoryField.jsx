"use client";

export default function CategoryField({ value, onChange }) {
    return (
        <div className="w-full">
            <label className="block mb-1.5 text-sm font-medium text-[#183354]">
                Category
            </label>
            <select
                name="category"
                value={value}
                onChange={onChange}
                className="w-full rounded-md border border-[#DFDFDF] px-4 py-2.5 text-sm text-[#0C1622] focus:outline-none focus:ring-2 focus:ring-[#7C91AA] focus:border-[#7C91AA] bg-white"
            >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>
        </div>
    );
}