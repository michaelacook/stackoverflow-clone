import React, { useState } from "react"
import { Link } from "@inertiajs/inertia-react"
import { Inertia } from "@inertiajs/inertia"
import Dropdown from "./Dropdown"

export default function Navbar({ user, className = "", sticky = true }) {
    const [query, setQuery] = useState("")

    function submit(e) {
        if (query) {
            e.preventDefault()
            Inertia.get(`/search?q=${query}`)
        }
    }

    return (
        <div
            className={`${sticky ? "sticky top-0 z-50" : "block"} ${className}`}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    submit(e)
                }
            }}
        >
            <div className="h-1 bg-yellow-600"></div>
            <div className="bg-gray-100 shadow">
                <div className="container md:w-4/5 lg:w-3/5 2xl:w-8/12 mx-auto flex flex-row justify-between">
                    <Link className="px-4 pt-1 hover:bg-gray-300" href="/">
                        <img
                            src="/favicon.ico"
                            alt="logo"
                            className="inline-block w-8 h-9"
                        />
                        <h1 className="hidden xl:inline-block align-bottom">
                            <span className="font-normal text-xl">clone</span>
                            <span> </span>
                            <span className="font-black text-xl">overflow</span>
                        </h1>
                    </Link>

                    <div className="inline-block flex-shrink relative w-2/5 xl:w-1/2 2xl:w-8/12 py-2 mx-auto">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="inline-block w-full border-gray-300 bg-white rounded pl-8 placeholder-gray-400 text-xs"
                        />
                    </div>

                    {user ? (
                        <div className="flex flex-row">
                            <div className="hover:bg-gray-300">
                                <div className="inline-block px-2">
                                    <Link href="/account">
                                        <img
                                            src={`/${user.profileUrl}`}
                                            alt="profile picture"
                                            className="w-6 h-6 rounded mt-3"
                                        />
                                    </Link>
                                </div>
                            </div>


                            <Dropdown className="hover:bg-gray-300 cursor-pointer">
                                <Dropdown.Trigger>
                                    <div className="inline-block px-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-gray-500 mt-3"
                                            viewBox="0 0 19 19"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </Dropdown.Trigger>

                                <Dropdown.Content width={"w-96"}>
                                    <div>
                                        <div className="px-2 py-1 flex flex-row justify-between bg-gray-200 ">
                                            <h5 className="text-xs font-semibold text-gray-700 self-center">INBOX</h5>

                                            <span className="text-blue-500 text-sm">all items</span>
                                        </div>

                                        <div className="px-2 py-1">
                                            No new notifications.
                                        </div>
                                        
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                            

                        </div>
                    ) : (
                        <div className="mt-2">
                            <Link
                                href="/login"
                                as="button"
                                type="button"
                                className="border-box px-2 py-1 text-sm text-blue-600 bg-blue-100 hover:bg-blue-200 border border-blue-600 rounded-sm mr-1"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                as="button"
                                className="border-box px-2 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 border border-blue-600 rounded-sm mr-2"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
