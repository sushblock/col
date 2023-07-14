'use client';

import { SafeUser } from "@/app/types";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { MdOutlineShoppingCart } from 'react-icons/md';
import UserMenu from "./UserMenu";
import { useSearchParams, useRouter } from "next/navigation";
import qs from 'query-string';
import Image from "next/image";

interface NavbarProps {
    myUser: SafeUser | null;
    basketItems: any[];
}

export default function Navbar({ myUser, basketItems }: NavbarProps) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const router = useRouter();
    const params = useSearchParams();

    const closeUserMenu = () => {
        setUserMenuOpen(false);
    };

    const onSearch = (e: FormEvent) => {
        e.preventDefault();

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            result: searchQuery,
        };

        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery,
            },
            { skipNull: true }
        );

        router.push(`/search/${url}`);
    };

    return (
        <div className="shadow-xl bg-white z-[99999] sticky">
            <div className="p-3 bg-zinc-200 font-semibold" >
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-6 flex-1 relative">
                        <Link href="/">
                            <Image src={"/logo.svg"} alt="Logo" width={100} height={30} />
                        </Link>
                        <form
                            className="lg:flex-1 lg:flex md:flex-1 md:flex"
                            onSubmit={onSearch}
                        >
                            <input
                                type="text"
                                placeholder="Search for anything ..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-3 font-light bg-white rounded-full border-black border-[1px] outline-none"
                            />
                        </form>
                    </div>
                    <div className="flex-1 items-center gap-3 hidden lg:flex">
                        <div>
                            <Link href="#">CoL for Business</Link>
                        </div>
                        <div>
                            <a href={myUser ? "/create" : "/login"}>Teach on CoL</a>
                        </div>
                        <div>
                            <a href={myUser ? "/videochat" : "/login"}>Video Chat</a>
                        </div>
                        <div>
                            <a href={myUser ? "/whiteboard" : "/login"} target="_blank" referrerPolicy="no-referrer">White Board</a>
                        </div>
                        <div className="relative">
                            <Link href="/basket">
                                <MdOutlineShoppingCart className="h-6 w-10" />
                            </Link>
                            <div className="absolute -right-1 -bottom-2 bg-blue-500 rounded-full w-6 h-6 flex justify-center items-center text-white">
                                {basketItems.length}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {!myUser && (
                            <>
                                <div>
                                    <Link href="/login" className="p-2 border-black border-[1px]">
                                        Login
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/register" className="py-2 px-3 bg-black text-white border-[1px] border-black">
                                        Sign up
                                    </Link>
                                </div>
                            </>
                        )}
                        {myUser && (
                            <div className="w-[40px] h-[40px] rounded-full bg-black flex items-center justify-center text-white cursor-pointer" onClick={() => setUserMenuOpen(prev => !prev)}>
                                <span>{myUser.name?.charAt(0)?.toUpperCase()}</span>
                                <span>{myUser.name?.charAt(1)?.toUpperCase()}</span>
                            </div>
                        )}
                        {userMenuOpen && (
                            <div className="absolute bottom-0 top-16 right-0">
                                <UserMenu
                                    currentUser={myUser}
                                    closeUserMenu={closeUserMenu}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-4 text-[.8rem] px-2 lg:hidden my-2 mx-4">
                    <div>
                        <Link href="#">CoL for Business</Link>
                    </div>
                    <div>
                        <a href={myUser ? "/create" : "/login"}>Teach on CoL</a>
                    </div>
                    <div>
                        <a href={myUser ? "/videochat" : "/login"}>Video Chat</a>
                    </div>
                    <div>
                        <a href={myUser ? "/whiteboard" : "/login"} target="_blank" referrerPolicy="no-referrer">White Board</a>
                    </div>
                    <div className="relative">
                        <Link href="/basket">
                            <MdOutlineShoppingCart className="h-6 w-10" />
                        </Link>
                        <div className="absolute -right-1 -bottom-2 bg-blue-500 rounded-full w-6 h-6 flex justify-center items-center text-white">
                            {basketItems.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
