import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Navbar from '@/Components/Navbar';
import FacebookIcon from '@/Components/FacebookIcon';
import GoogleIcon from '@/Components/GoogleIcon';
import GitHubIcon from '@/Components/GitHubIcon';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <div className="h-screen">
            <Navbar user={null} />
            <Head title="Register" />

            <ValidationErrors errors={errors} />

            <div className="h-screen flex flex-row justify-center bg-gray-100">

                <div className="absolute w-full top-52 flex flex-row justify-center bg-gray-100">
                    <div className="lg:w-2/5 xl:w-1/5">
                        <div className="flex flex-row justify-center mb-6">
                            <svg aria-hidden="true" width="32" height="37" viewBox="0 0 32 37">
                                <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
                                <path 
                                    d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
                                    fill="#F48024"></path>
                            </svg>
                        </div>
                        
                        <div>
                            <button 
                                className="w-full flex flex-row justify-center py-2 rounded bg-white border text-sm border-gray-300 mb-3"
                            >
                                <GoogleIcon className={"inline-block"} />&nbsp;Sign up with Google
                            </button>
                            <button 
                                className="w-full flex flex-row justify-center py-2 rounded bg-black text-sm text-white mb-3"
                            >
                                <GitHubIcon className={`inline-block`} inverted={true} />&nbsp;Sign up with GitHub
                            </button>
                            <button 
                                className="w-full flex flex-row justify-center py-2 rounded bg-facebook hover:bg-facebook-dark text-sm text-white mb-5"
                            >
                                <FacebookIcon className={`inline-block`} inverted={true} />&nbsp;Sign up with Facebook
                            </button>
                        </div>

                        <div className="p-6 rounded-lg bg-white shadow-lg">
                            <form onSubmit={submit}>
                                <div>
                                    <Label forInput="name" value="Display Name" className="font-bold" />

                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full text-sm rounded bg-white border border-gray-400"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={onHandleChange}
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label forInput="email" value="Email" className="font-bold" />

                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full text-sm rounded bg-white border border-gray-400"
                                        autoComplete="username"
                                        onChange={onHandleChange}
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label forInput="password" value="Password" className="font-bold" />

                                    <input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full text-sm rounded bg-white border border-gray-400"
                                        autoComplete="new-password"
                                        onChange={onHandleChange}
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label forInput="password_confirmation" value="Confirm Password" className="font-bold" />

                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full text-sm rounded bg-white border border-gray-400"
                                        onChange={onHandleChange}
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <button className="w-full py-2 mt-5 bg-blue-500 rounded text-white text-sm" processing={processing}>
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                        <p className="mt-9 text-center text-sm text-gray-700">
                            Already have have an account? <Link className="text-blue-600 hover:text-blue-500" href="/login">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
