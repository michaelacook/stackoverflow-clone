import React from "react"
import { Link } from "@inertiajs/inertia-react"

export default function Tag({ tag }) {
    return (
        <Link href={`/questions/by-tag/${tag.name}`}>
            <span 
                className="py-1 px-2 rounded-sm bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-600 text-xs mr-1"
            >
                {tag.name}
            </span>
        </Link>
    )
}