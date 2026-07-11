"use client"

import RecipeCard from "./RecipeCard";

export default function HeroSection({ posts = [] }) {
    if (posts.length === 0) return null;

    return (
        <section className="max-w-6xl min-h-9xl mx-auto px-4 sm:px-6 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {posts.slice(0, 4).map((post) => (
                    <RecipeCard
                        key={post._id}
                        post={post}
                        variant="hero"
                    />
                ))}
            </div>
        </section>
    );
}
// export default function HeroSection({ posts = [] }) {
//     if (posts.length === 0) return null;

//     return (
//         <section className="w-full bg-[#0C1622] py-1">  {/* ← dark background */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//                     {posts.slice(0, 4).map((post) => (
//                         <RecipeCard
//                             key={post._id}
//                             post={post}
//                             variant="hero"
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }