import React from "react"
import { Link } from "@inertiajs/inertia-react"

export default function Downvote({ href, data }) {
    return (
        <Link preserveScroll method="post" href={href} data={data}>
            <svg
                fill="#BABFC4"
                aria-hidden="true"
                width="36"
                height="36"
                viewBox="0 0 36 36"
                className="cursor-pointer"
            >
                <path d="M2 10h32L18 26 2 10Z"></path>
            </svg>
        </Link>
    )
}
