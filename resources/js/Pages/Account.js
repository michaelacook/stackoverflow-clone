import React from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import { Link } from "@inertiajs/inertia-react"

export default function Account({ user, page }) {
    return (
        <>
            <Navbar user={user} />

            <Grid page={page}>
                <div className="p-6">

                    <div className="flex flex-row justify-start">

                        <img src="default-profile.png" alt="profile-image" className="w-36 h-36 shadow-md rounded-sm" />

                        <div className="ml-5">
                            <h1 className="text-4xl mt-3">{user.name}</h1>
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
                        <h1 className="font-bold text-blue-600">Answers <span className="text-gray-500">({user.answers.length})</span></h1>
                        <hr />
                        
                        <div>
                            {/* Here print prints to each question for which the user answered */}
                        </div>
                    </div>

                </div>
            </Grid>
        </>
    )
}