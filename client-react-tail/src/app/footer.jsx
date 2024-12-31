import React from "react";
import Link from 'next/link';

export default function Footer() {
    const buttons = [
        { href: "/", text: "Home" },
        { href: "/shifts", text: "My shifts" },
        { href: "/account", text: "Account" },
    ];

    return (
        <header className="flex items-center justify-between w-full h-[100px] bg-#e5e7eb  ">
            {buttons.map((button, index) => (
                <button key={index} className="bg-#e5e7eb w-1/3 h-[100px] hover:text-white hover:bg-black">
                    <Link href={button.href}>
                        <p className="text-2xl font-bold cursor-pointer">{button.text}</p>
                    </Link>
                </button>
            ))}
        </header>
    );
}