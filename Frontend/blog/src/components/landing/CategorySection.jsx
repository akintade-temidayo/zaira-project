"use client"

import Image from "next/image";
import Link from "next/link";
import breakfastImg from "../../../public/breakfast.png";
import lunchImg from "../../../public/lunch.png";
import dinnerImg from "../../../public/dinner.png";

const CATEGORIES = [
    { label: "Breakfast", value: "breakfast", image: breakfastImg },
    { label: "Lunch", value: "lunch", image: lunchImg },
    { label: "Dinner", value: "dinner", image: dinnerImg },
];

export default function CategorySection() {
    return (
        <section
            className=""
            style={{ backgroundImage: "url('/Sectionbackground.png')" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0C1622] mb-2">
                        Our Top Categories
                    </h2>
                    <div className="mt-1 mb-3 h-0 w-10 mx-auto border-t-[5px] border-l-[4px] border-r-[4px] border-t-[#F4796C] border-l-transparent border-r-transparent" />
                </div>

                <p className="text-sm text-[#6D757F] max-w-md mx-auto mb-8">
                    Browned butter and brown sugar caramelly goodness, crispy
                    edges thick and soft centers and melty little puddles.
                </p>

                <div className="flex flex-wrap justify-center gap-7 sm:gap-6">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.value}
                            href={`/category/${cat.value}`}
                            className="flex flex-col items-center cursor-pointer group"
                        >
                            <div className="relative w-40 h-40 sm:w-32 sm:h-32 rounded-full bg-white ring-4 ring-white border-2 border-[#DFDFDF] overflow-hidden group-hover:border-[#F4796C] transition-colors shadow-sm">
                                <Image
                                    src={cat.image}
                                    alt={cat.label}
                                    fill
                                    sizes="(max-width: 640px) 160px, 128px"
                                    style={{ objectFit: "cover" }}
                                />
                                <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#F4796C] px-3 py-1 rounded-[4px] text-[10px] font-bold text-white uppercase tracking-wider text-center shadow-sm whitespace-nowrap z-10">
                                    {cat.label}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}