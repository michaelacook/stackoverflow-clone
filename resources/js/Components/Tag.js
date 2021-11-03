import React from "react"
import { Link } from "@inertiajs/inertia-react"

export default function Tag({ tag, className, redirect, deletable = false }) {
    return !deletable ? (
        <Link className={className} href={`/questions/by-tag/${tag.name}`}>
            <span className="py-1 px-2 rounded-sm bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-600 text-xs mr-1">
                {tag.name}
            </span>
        </Link>
    ) : (
        <div
            className={`py-1 px-2 rounded-sm bg-blue-100 text-blue-500 text-xs mr-1 ${className}`}
        >
            {tag.name}
            <Link
                method="post"
                href="/tags/unwatch"
                data={{
                    redirect,
                    tag,
                }}
                preserveState={true}
                className=" ml-1 hover:bg-blue-600 hover:text-white cursor-pointer rounded-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block h-4 w-4 align-top font-bold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </Link>
        </div>
    )
}
