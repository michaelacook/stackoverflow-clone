import React, { useState } from "react"
import Grid from "@/Layouts/Grid"
import Navbar from "@/Components/Navbar"
import Tag from "@/Components/Tag"
import RelativeDate from "@/Components/RelativeDate"
import { usePage } from "@inertiajs/inertia-react"

export default function Tags({ page, tags }) {
    const { auth } = usePage().props
    const [filterTerm, setFilterTerm] = useState("")

    return (
        <>
            <Navbar user={auth.user} />

            <Grid page={page}>
                <div className="w-full mt-5 ml-6 mb-6">
                    <h1 className="text-2xl mb-2">Tags</h1>

                    <p className="w-3/4 mt-5 text-gray-700">
                        A tag is a keyword or label that categorizes your question with other, similar questions. 
                        Using the right tags makes it easier for others to find and answer your question.
                    </p>

                    <div className="relative mt-7">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 absolute top-1/2 transform -translate-y-1/2 left-2 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                            />
                        </svg>

                        <input 
                            type="text" 
                            autoFocus={true}
                            value={filterTerm}
                            onChange={(e) => setFilterTerm(e.target.value)}
                            placeholder="Filter tag by name" 
                            className="inline-block border-gray-300 bg-gray-50 rounded pl-8 py-2 placeholder-gray-400 text-gray-700 text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap mt-6">
                        {tags
                            .filter((tag) => {
                                if (filterTerm) {
                                    if (tag.name.includes(filterTerm)) {
                                        return true
                                    }
                                    return false
                                }
                                return true
                            })
                            .map((tag) => (
                                <div 
                                    className="w-full flex flex-col justify-between md:w-2/5 xl:w-23/100 py-4 px-3 border mb-3 mr-3 border-gray-300 rounded"
                                >
                                    <div>
                                        <Tag tag={tag} />

                                        <p className="mt-3 text-xs text-gray-700">
                                            {tag.guidance ? tag.guidance.substr(0, 120) + "..." : null}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-row justify-between">
                                        <span className="inline-block w-1/3 text-xs text-gray-500">
                                            {tag.questions.length} questions
                                        </span>

                                        <p className="text-xs text-gray-500">
                                            Created <RelativeDate UTCTime={tag.created_at} />
                                        </p>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            </Grid>
        </>
    )
}