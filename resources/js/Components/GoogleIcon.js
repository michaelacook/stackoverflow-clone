import react from "react"

export default function GoogleIcon({ className = "" }) {
    return (
        <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className={className}
        >
            <path
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17Z"
                fill="#34A853"
            ></path>
            <path
                d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07Z"
                fill="#FBBC05"
            ></path>
            <path
                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3Z"
                fill="#EA4335"
            ></path>
        </svg>
    )
}
