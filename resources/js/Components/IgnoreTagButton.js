import React from "react"
import { Link } from "@inertiajs/inertia-react"

export default function IgnoreTagButton({
    tag,
    ignored,
    redirect,
    className = "",
}) {
    return (
        <React.Fragment>
            {!ignored.includes(tag.name) ? (
                <button
                    className={`
                    px-2 
                    py-2 
                    h-12 
                    w-25 
                    text-gray-700 
                    text-xs 
                    rounded-sm 
                    border 
                    border-gray-400 
                    ml-3
                    ${className}
                `}
                >
                    <Link
                        method="post"
                        href="/tags/ignore"
                        data={{
                            redirect,
                            tag,
                        }}
                        preserveScroll={true}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline-block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                        </svg>
                        Ignore tag
                    </Link>
                </button>
            ) : (
                <button
                    className={`
                        px-2 
                        py-2 
                        h-12 
                        w-25 
                        text-gray-700 
                        text-xs 
                        rounded-sm 
                        border 
                        bg-gray-300
                        border-gray-500 
                        ml-3
                        ${className}
                    `}
                >
                    <Link
                        method="post"
                        href="/tags/unwatch"
                        data={{
                            redirect,
                            tag,
                        }}
                        preserveScroll={true}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline-block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                        </svg>
                        Unignore tag
                    </Link>
                </button>
            )}
        </React.Fragment>
    )
}
