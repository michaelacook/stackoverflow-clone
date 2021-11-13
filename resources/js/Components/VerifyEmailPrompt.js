import React from "react"
import { Link } from "@inertiajs/inertia-react"

export default function VerifyEmailPrompt({ auth }) {
    return auth.user && !auth.user.email_verified_at ? (
        <div className="w-full fixed bottom-0 flex flex-row justify-center py-2 bg-yellow-500 shadow-inner">
            <p className="self-center text-white">
                Thanks for signing up! Before continuing, please verify your
                email address by clicking the link in your email.
            </p>

            <Link
                className="py-1 px-2 rounded bg-white hover:bg-gray-100 text-gray-600 font-semibold text-sm self-center ml-3"
                href={"/email/verification-notification"}
                method="post"
            >
                Resend Link
            </Link>
        </div>
    ) : null
}
