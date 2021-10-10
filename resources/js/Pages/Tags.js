import React, { useState } from "react"
import Grid from "@/Layouts/Grid"
import Navbar from "@/Components/Navbar"
import Tag from "@/Components/Tag"
import RelativeDate from "@/Components/RelativeDate"

export default function Tags({ user, page, tags }) {
    const [filterTerm, setFilterTerm] = useState("")

    return (
        <>
            <Navbar user={user} />

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

                    <div className="flex flex-row flex-grow flex-wrap w-full mt-6">
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
                                    className="py-4 px-3 border mb-3 mr-3 border-gray-300 rounded w-23/100"
                                >
                                    <Tag tag={tag} />

                                    <div className="mt-4 flex flex-row">
                                        <span className="inline-block mr-5 text-xs text-gray-500">
                                            {tag.questions.length} questions
                                        </span>

                                        <span className="text-xs text-gray-500">
                                            Created <RelativeDate UTCTime={tag.created_at} />
                                        </span>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            </Grid>
        </>
    )
}