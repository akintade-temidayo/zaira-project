"use client"

import React from "react";
import { FaFacebookF, FaPinterestP, FaTwitter, FaInstagram, FaLinkedinIn  } from "react-icons/fa";

export default function SubscribeFollowers() {
    // Exact social network definitions matching the design grid
    const NETWORKS = [
        {
            name: "Facebook",
            href: "#facebook",
            color: "text-[#000000]",
            icon: (
                <FaFacebookF />
            )
        },
        {
            name: "Twitter",
            href: "#twitter",
            color: "text-[#000000]",
            icon: (
                <FaTwitter />
            )
        },
        {
            name: "Instagram",
            href: "#instagram",
            color: "text-[#000000]",
            icon: (
                <FaInstagram />
            )
        },
        {
            name: "Youtube",
            href: "#youtube",
            color: "text-[#000]",
            icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            )
        },
        {
            name: "LinkedIn",
            href: "#linkedin",
            color: "text-[#000000]",
            icon: (
                <FaLinkedinIn />
            )
        },
        {
            name: "Pinterest",
            href: "#pinterest",
            color: "text-[#000]",
            icon: (
                <FaPinterestP />
            )
        }
    ];

    return (
        <div className="w-full flex flex-col mt-4">
            
            {/* Header section with tapered design from Figma */}
            <div className="w-full mb-6">
                <h3 className="text-[#0C1622] font-bold text-lg tracking-tight">
                    Subscribe & Followers
                </h3>
                {/* Horizontal dividing structure with a left-aligned coral highlight box */}
                <div className="relative w-full h-[1px] bg-[#E2E8F0] mt-3">
                    <div className="absolute top-[-2px] left-0 h-1 w-8 bg-[#F4796C] rounded-sm" />
                </div>
            </div>

            {/* Two-column social link layout grid */}
            <div className="grid grid-cols-2 gap-3">
                {NETWORKS.map((network) => (
                    <a
                        key={network.name}
                        href={network.href}
                        className="flex items-center gap-3 px-4 py-2.5 bg-[#EEF5F5] rounded-[4px] hover:bg-[#E2ECEC] hover:shadow-xs transition-all duration-200 group"
                    >
                        {/* Dynamic colorful brand color activation on parent wrapper hover */}
                        <span className={`${network.color} transition-colors`}>
                            {network.icon}
                        </span>
                        
                        <span className="text-xs font-semibold text-[#334155] group-hover:text-[#0C1622] transition-colors">
                            {network.name}
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}