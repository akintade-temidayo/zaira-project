"use client";
import Link from "next/link";
import { SiFacebook, SiX, SiInstagram, SiYoutube, SiPinterest } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import logo from "../../../public/logo.png"

const FOOTER_COLUMNS = [
{
title: "Company",
links: [
    { label: "About Us", href: "/about" },
    { label: "The Test Kitchen", href: "/kitchen" },
    { label: "Podcast", href: "/podcast" },
    { label: "Events", href: "/events" },
    { label: "Jobs", href: "/jobs" },
],
},
{
title: "Get Help",
links: [
    { label: "Contact & FAQ", href: "/contact" },
    { label: "Orders & Returns", href: "/orders" },
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Register", href: "/register" },
    { label: "Catalog", href: "/catalog" },
],
},
{
title: "Explore",
links: [
    { label: "The Shop", href: "/shop" },
    { label: "Recipes", href: "/recipes" },
    { label: "Food", href: "/food" },
    { label: "Travel", href: "/travel" },
    { label: "Hotline", href: "/hotline" },
],
},
{
title: "Follow Us On",
links: [
    { label: "Facebook", href: "#", icon: SiFacebook },
    { label: "Twitter", href: "#", icon: SiX },
    { label: "Instagram", href: "#", icon: SiInstagram },
    { label: "Youtube", href: "#", icon: SiYoutube },
    { label: "Pinterest", href: "#", icon: SiPinterest },
],
},
];

export default function Footer() {
return (
<footer className="bg-[#0C1622] text-[#B8C1CD]">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
    {/* Brand column */}
    <div className="sm:col-span-2 lg:col-span-1">
        <Link href="/" className="text-2xl">
            <Image
            src={logo}
            alt="Zaira Logo"
            height={30}
            width={0}
            style={{ height: "30px", width: "auto" }}
            />
        </Link>
        <p className="mt-4 text-sm leading-relaxed text-[#6D757F]">
        Browned butter and brown sugar caramelly goodness, crispy edges,
        thick and soft centers and melty little puddles of chocolate.
        </p>
    </div>

    {/* Link columns */}
    {FOOTER_COLUMNS.map((column) => (
        <div key={column.title}>
        <h4 className="text-white font-semibold mb-1">{column.title}</h4>
        <div className="h-1 w-10 bg-[#F4796C] mt-1 rounded-full mb-4" />
        <ul className="flex flex-col gap-3 text-sm">
            {column.links.map((link) => (
            <li key={link.label}>
                <Link
                href={link.href}
                className="flex items-center gap-2 hover:text-[#F4796C] transition-colors"
                >
                {link.icon && (
                    <link.icon size={14} color="currentColor" />
                )}
                {link.label}
                </Link>
            </li>
            ))}
        </ul>
        </div>
    ))}
    </div>

    {/* Bottom bar */}
    <div className="border-t border-[#183354]">
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6D757F]">
        <p>© {new Date().getFullYear()} All Rights Reserved</p>
        <div className="flex items-center gap-4">
        <Link href="/privacy" className="hover:text-[#F4796C] transition-colors">
            Privacy Policy & Terms
        </Link>
        <Link href="/credits" className="hover:text-[#F4796C] transition-colors">
            Site Credits
        </Link>
        </div>
    </div>
    </div>
</footer>
);
}