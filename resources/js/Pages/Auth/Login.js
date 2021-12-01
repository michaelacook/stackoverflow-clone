import React, { useEffect } from "react"
import Navbar from "@/Components/Navbar"
import GoogleIcon from "@/Components/GoogleIcon"
import GitHubIcon from "@/Components/GitHubIcon"
import FacebookIcon from "@/Components/FacebookIcon"
import Label from "@/Components/Label"
import ValidationErrors from "@/Components/ValidationErrors"
import { Head, Link, useForm } from "@inertiajs/inertia-react"

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    })

    useEffect(() => {
        return () => {
            reset("password")
        }
    }, [])

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        )
    }

    const submit = (e) => {
        e.preventDefault()

        post(route("login"))
    }

    return (
        <div className="h-screen">
            <Navbar user={null} sticky={false} className="fixed w-full" />
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <ValidationErrors errors={errors} />

            <div className="h-screen flex flex-row justify-center bg-gray-100">
                <div className="absolute top-56 lg:w-2/5 xl:w-1/5">
                    <form onSubmit={submit}>
                        <div className="flex flex-row justify-center mb-6">
                            <svg
                                aria-hidden="true"
                                width="32"
                                height="37"
                                viewBox="0 0 32 37"
                            >
                                <path
                                    d="M26 33v-9h4v13H0V24h4v9h22Z"
                                    fill="#BCBBBB"
                                ></path>
                                <path
                                    d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
                                    fill="#F48024"
                                ></path>
                            </svg>
                        </div>

                        <div>
                            <a
                                href="/login/google"
                                className="w-full flex flex-row justify-center py-2 rounded bg-white border text-sm border-gray-300 mb-3"
                            >
                                <GoogleIcon className={"inline-block"} />
                                &nbsp;Log in with Google
                            </a>
                            <a
                                href="/login/github"
                                className="w-full flex flex-row justify-center py-2 rounded bg-black text-sm text-white mb-3"
                            >
                                <GitHubIcon
                                    className={`inline-block`}
                                    inverted={true}
                                />
                                &nbsp;Log in with GitHub
                            </a>
                            <a 
                                href="/login/facebook"
                                className="w-full flex flex-row justify-center py-2 rounded bg-facebook hover:bg-facebook-dark text-sm text-white mb-5"
                            >
                                <FacebookIcon
                                    className={`inline-block`}
                                    inverted={true}
                                />
                                &nbsp;Log in with Facebook
                            </a>
                        </div>

                        <div className="p-6 rounded-lg bg-white shadow-lg">
                            <div>
                                <Label
                                    forInput="email"
                                    value="Email"
                                    className="font-bold"
                                />

                                <input
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full text-sm rounded bg-white border border-gray-400"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={onHandleChange}
                                />
                            </div>

                            <div className="mt-4">
                                <div className="flex flex-row justify-between">
                                    <Label
                                        forInput="password"
                                        value="Password"
                                        className="font-bold"
                                    />
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-blue-600 hover:text-blue-500"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>

                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full text-sm rounded bg-white border-gray-400"
                                    autoComplete="current-password"
                                    onChange={onHandleChange}
                                />
                            </div>

                            <button
                                className="w-full py-2 mt-5 bg-blue-500 rounded text-white"
                                processing={processing}
                            >
                                Log in
                            </button>
                        </div>

                        <p className="mt-9 text-center text-sm text-gray-700">
                            Don't have an account?{" "}
                            <Link
                                className="text-blue-600 hover:text-blue-500"
                                href="/register"
                            >
                                Sign up
                            </Link>
                        </p>

                        {/* 
                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
