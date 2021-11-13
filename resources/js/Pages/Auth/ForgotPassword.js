import React from "react"
import Input from "@/Components/Input"
import ValidationErrors from "@/Components/ValidationErrors"
import { Head, useForm } from "@inertiajs/inertia-react"
import { usePage } from "@inertiajs/inertia-react"
import Navbar from "@/Components/Navbar"

export default function ForgotPassword({ status }) {
    const { auth } = usePage().props
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route("password.email"))
    }

    return (
        <div>
            <Head title="Forgot Password" />
            <Navbar user={auth.user} />

            <div className="h-screen flex flex-col justify-center bg-gray-200">
                <div className="flex flex-row justify-center">
                    <div className="w-3/5 md:w-1/3 lg:w-2/6 xl:w-1/6 p-6 bg-white shadow-lg rounded-lg top-60">
                        <p className="w-full mb-4 text-sm text-gray-800">
                            Forgot your account’s password? Enter your email
                            address and we’ll send you a recovery link.
                        </p>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-600">
                                {status}
                            </div>
                        )}

                        <ValidationErrors errors={errors} />

                        <form onSubmit={submit}>
                            <label className="font-bold" htmlFor="email">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="text"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />

                            <div className="flex items-center justify-end mt-4">
                                <button
                                    className="w-full px-1 py-2 bg-blue-500 text-white rounded-sm shadow-innersssssssssssssssssssssssssssssssssssssssssssssssss"
                                    processing={processing}
                                >
                                    Email Password Reset Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
