import React, { useEffect } from "react"
import Input from "@/Components/Input"
import ValidationErrors from "@/Components/ValidationErrors"
import { Head, useForm, usePage } from "@inertiajs/inertia-react"
import Navbar from "@/Components/Navbar"

export default function ResetPassword({ token, email }) {
    const { auth } = usePage().props
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    })

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation")
        }
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route("password.update"))
    }

    return (
        <>
            <Head title="Reset Password" />
            <Navbar user={auth.user} />

            <ValidationErrors errors={errors} />

            <div className="h-screen flex flex-col justify-center bg-gray-200">
                <div className="flex flex-row justify-center">
                    <div className="w-3/5 md:w-1/3 lg:w-2/6 xl:w-1/6 p-6 bg-white rounded-lg shadow-lg">
                        <form onSubmit={submit}>
                            <div>
                                <label htmlFor="email">Email</label>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    handleChange={onHandleChange}
                                />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="password">Password</label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="pass-confirm">Confirm Password</label>

                                <Input
                                    id="pass-confirm"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    handleChange={onHandleChange}
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <button className="w-full bg-blue-500 text-white px-1 py-2 shadow-inner rounded" processing={processing}>
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
