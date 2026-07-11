import Link from "next/link";
import Image from "next/image";
import LikeButton from "@/components/ui/LikeButton";

const categoryColors = {
    breakfast: "bg-[#F4796C] text-white",
    lunch: "bg-[#F4796C] text-white",
    dinner: "bg-[#F4796C] text-white",
};

export default function RecipeCard({
    post,
    variant = "default", // "default" | "hero" | "featured" | "horizontal"
    className = "",
}) {
    const date = new Date(post.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const badge = (
        <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm tracking-wide ${
                categoryColors[post.category] || "bg-[#DFDFDF] text-[#545E69]"
            }`}
        >
            {post.category}
        </span>
    );

    // Dynamic text applied to regular metadata (By Admin • Date)
    const meta = (
        <div className="flex flex-col md:flex-row items-center gap-2 text-xs text-white mix-blend-difference">
            <span>By {post.author?.fullName || 'Admin'}</span>
            <span>•</span>
            <span>{date}</span>
        </div>
    );

    // Hero variant — large card, image on top, badge straddling the seam
    if (variant === "hero") {
        return (
            <Link
                href={`/posts/${post.slug}`}
                className={`group flex flex-col bg-white hover:shadow-lg p-1 border-2 border-[#FFFFFF] hover:border-[#F4796C] transition-all duration-300 h-full ${className}`}
            >
                <div className="relative flex-1 min-h-40">
                    <div className="absolute inset-0 overflow-hidden">
                        {post.image ? (
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#B8C1CD]" />
                        )}
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 z-10">
                        {badge}
                    </div>
                </div>  
                <div className="p-4 flex flex-col items-center justify-center gap-1 mt-4">
                    {/* Title with dynamic color blending */}
                    <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 mix-blend-difference text-center">
                        {post.title}
                    </h3>
                    {/* Meta data with dynamic color blending */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-xs text-white mix-blend-difference">
                        <span>By {post.author?.fullName || 'Admin'}</span>
                        <span>•</span>
                        <span>{date}</span>
                    </div>
                </div>
            </Link>
        );
    }

    // Horizontal variant — image left, text right (Weekly Best small cards)
    if (variant === "horizontal") {
        return (
            <Link
                href={`/posts/${post.slug}`}
                className={`flex items-start gap-3 group ${className}`}
            >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden">
                    {post.image ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#B8C1CD]" />
                    )}
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0 items-start">
                    {badge}
                    {/* Title with dynamic color blending */}
                    <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 mt-0.5 group-hover:text-[#F4796C] transition-colors mix-blend-difference">
                        {post.title}
                    </h3>
                    {meta}
                </div>
            </Link>
        );
    }

    // Featured variant — large left card in Weekly Best (Sits completely on top of image!)
    if (variant === "featured") {
        return (
            <Link
                href={`/posts/${post.slug}`}
                className={`relative block rounded-xl overflow-hidden group h-full min-h-70 sm:min-h-80 ${className}`}
            >
                {post.image ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-[#B8C1CD]" />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2 items-start">
                    {badge}
                    {/* Title with dynamic color blending */}
                    <h3 className="text-white font-bold text-lg leading-snug line-clamp-2 mix-blend-difference">
                        {post.title}
                    </h3>
                    {/* Meta data with dynamic color blending */}
                    <div className="flex items-center gap-2 text-xs text-white mix-blend-difference">
                        <span>By {post.author?.fullName || 'Admin'}</span>
                        <span>•</span>
                        <span>{date}</span>
                    </div>
                </div>
            </Link>
        );
    }

    // Default variant — standard vertical card
    return (
        <Link
            href={`/posts/${post.slug}`}
            className={`group flex flex-col rounded-xl bg-white border border-[#DFDFDF] hover:shadow-md transition-shadow h-full ${className}`}
        >
            <div className="relative">
            <div className="h-44 overflow-hidden rounded-t-xl">
                {post.image ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-[#B8C1CD]" />
                )}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 z-10">
                {badge}
            </div>
                <div className="absolute top-2 right-2 z-10">
                    <LikeButton post={post} />
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1 mt-4">
                {/* Title with dynamic color blending */}
                <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#F4796C] transition-colors mix-blend-difference">
                    {post.title}
                </h3>
                {/* Description content with dynamic color blending */}
                <p className="text-xs text-white line-clamp-2 flex-1 mix-blend-difference">
                    {post.content}
                </p>
                {meta}
            </div>
        </Link>
    );
}