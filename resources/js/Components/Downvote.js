import React from "react"
import { Link } from "@inertiajs/inertia-react"

export default function Downvote({ href, data, auth }) {
    return (
        <Link
            preserveScroll
            method={`${auth.user && auth.user.email_verified_at ? "post" : ""}`}
            href={auth.user && auth.user.email_verified_at ? href : ""}
            data={data}
        >
            <svg
                fill="#BABFC4"
                aria-hidden="true"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                className={`${
                    auth.user && auth.user.email_verified_at
                        ? "cursor-pointer"
                        : "btn-disabled"
                }`}
            >
                <path d="M2 10h32L18 26 2 10Z"></path>
            </svg>
        </Link>
    )
}
