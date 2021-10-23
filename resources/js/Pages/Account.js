import React from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import moment from "moment"
import { Link, usePage } from "@inertiajs/inertia-react"

export default function Account({ page }) {
    const { auth } = usePage().props

    return (
        <>
            <Navbar user={auth.user} />

            <Grid page={page}>
                <div className="p-6">

                    <div className="flex flex-row justify-start">

                        <img src="default-profile.png" alt="profile-image" className="w-36 h-36 shadow-md rounded-sm" />

                        <div className="ml-5">
                            <h1 className="text-4xl mt-3">{auth.user.name}</h1>
                            <p className="flex flex-row mt-5 mb-7 text-sm text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="#64748B">
                                    <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>

                                <span>Member for {moment(auth.user.created_at).fromNow(true)}</span>
                            </p>

                            <Link 
                                href={route('logout')} 
                                method="post" 
                                className="text-blue-700 hover:text-blue-800"
                            >
                                Log out
                            </Link>
                        </div>

                    </div>

                    <div className="mt-8">
                        <Link className="p-1 px-3 bg-gray-200 text-xs rounded-full" href="/account?tab=summary">Summary</Link>
                        <Link className="p-1 px-3 ml-2 hover:bg-gray-300 text-xs rounded-full" href="/account?tab=answers">Answers</Link>
                        <Link className="p-1 px-3 ml-2 hover:bg-gray-300 text-xs rounded-full" href="/account?tab=questions">Questions</Link>
                        <Link className="p-1 px-3 ml-2 hover:bg-gray-300 text-xs rounded-full" href="/account?tab=tags">Tags</Link>
                    </div>

                    <div className="mt-5">
                        <h1 className="font-bold text-blue-600">Answers <span className="text-gray-500">({auth.user.answers.length})</span></h1>
                        <hr />
                        
                        <div>
                            {auth.user.answers.map((answer) => (
                                <Link href={`/questions/${answer.question.slug}#${answer.id}`}>
                                    <div>
                                        <div 
                                            className="inline-block py-1 border border-green-600 rounded-sm w-10 text-center text-green-600 text-sm mt-5 mr-3"
                                        >
                                            {answer.votes}
                                        </div>

                                        <div className="inline-block text-blue-700">{answer.question.title}</div>
                                    </div>
                                </Link>

                            ))}
                        </div>
                    </div>

                    <div className="mt-5">
                        <h1 className="font-bold text-blue-600">Questions <span className="text-gray-500">({auth.user.questions.length})</span></h1>
                        <hr />
                        
                        <div>
                            {auth.user.questions.map((question) => (
                                <Link href={`/questions/${question.slug}`}>
                                    <div>
                                        <div 
                                            className="inline-block py-1 border border-green-600 rounded-sm w-10 text-center text-green-600 text-sm mt-5 mr-3"
                                        >
                                            {question.votes}
                                        </div>

                                        <div className="inline-block text-blue-700">{question.title}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </Grid>
        </>
    )
}