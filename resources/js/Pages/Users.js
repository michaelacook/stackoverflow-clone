import React, { useState } from "react"
import Grid from "@/Layouts/Grid"
import Navbar from "@/Components/Navbar"
import PaginationLinks from "@/Components/PaginationLinks"
import { usePage, Link } from "@inertiajs/inertia-react"

export default function Users({ page, users }) {
    const { auth } = usePage().props
    const [filterTerm, setFilterTerm] = useState("")

    return (
        <>
            <Navbar user={auth.user} />

            <Grid page={page}>
                <div className="w-5/6 mt-5 ml-6 mb-6">
                    <h1 className="text-3xl mb-2">Users</h1>

                    <div className="relative mt-7">
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
                            autoFocus={true}
                            value={filterTerm}
                            onChange={(e) => setFilterTerm(e.target.value)}
                            placeholder="Filter by user"
                            className="inline-block border-gray-300 bg-gray-50 rounded pl-8 py-2 placeholder-gray-400 text-gray-700 text-sm"
                        />
                    </div>

                    <div className="mt-14 flex flex-wrap">
                        {users.data
                            .filter((user) => {
                                if (filterTerm) {
                                    if (user.name.includes(filterTerm)) {
                                        return true
                                    }
                                    return false
                                }
                                return true
                            })
                            .map((user) => (
                                <div className="w-full flex flex-row justify-start md:w-2/5 xl:w-23/100 py-4 px-3 mb-3 mr-3">
                                    <img
                                        src={user.profileUrl}
                                        height="40"
                                        width="40"
                                    />
                                    <p className="text-blue-600 hover:text-blue-500 text-sm ml-3">
                                        {user.name}
                                    </p>
                                </div>
                            ))}
                    </div>

                    <PaginationLinks links={users.links} />
                </div>
            </Grid>
        </>
    )
}
