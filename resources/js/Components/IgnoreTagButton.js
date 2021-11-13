import React from "react"
import { Link } from "@inertiajs/inertia-react"

export default function IgnoreTagButton({
    tag,
    ignored,
    auth,
    redirect,
    className = "",
}) {
    return (
        <React.Fragment>
            {!ignored.includes(tag.name) ? (
                <Link
                    method={`${auth.user.email_verified_at ? "post" : ""}`}
                    href={`${
                        auth.user.email_verified_at ? "/tags/ignore" : ""
                    }`}
                    data={{
                        redirect,
                        tag,
                    }}
                    className={`
                        p-3 
                        text-gray-700 
                        text-xs 
                        rounded-sm 
                        border 
                        border-gray-400 
                        ml-3
                        ${className}
                        ${!auth.user.email_verified_at ? "btn-disabled" : null}
                    `}
                    preserveScroll={true}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block mr-1"
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
            ) : (
                <Link
                    method={`${auth.user.email_verified_at ? "post" : ""}`}
                    href={`${
                        auth.user.email_verified_at ? "/tags/unwatch" : ""
                    }`}
                    data={{
                        redirect,
                        tag,
                    }}
                    className={`
                        p-3
                        text-gray-700 
                        text-xs 
                        rounded-sm 
                        border 
                        bg-gray-300
                        border-gray-500 
                        ml-3
                        ${className}
                        ${!auth.user.email_verified_at ? "btn-disabled" : null}
                    `}
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
            )}
        </React.Fragment>
    )
}
