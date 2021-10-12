import React, { useState } from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import Tag from "@/Components/Tag"
import { Inertia } from "@inertiajs/inertia"

export default function EditTag({ user, page, tag }) {
    const [body, setBody] = useState("")
    const [bodyError, setBodyError] = useState(false)

    function post() {
        if (body) {
            Inertia.post("/tags/edit", {
                guidance: body, 
                tag
            })
        }
    }

    return (
        <>
            <Navbar user={user} />

            <Grid page={page}>
                <div className="m-5">
                    <h1 className="text-2xl mb-6">Editing tag for <Tag tag={tag[0]} /></h1>

                    <label 
                        for="question-body"
                        className="block font-bold text-black"
                    >
                        Usage guidance
                    </label>
                    <textarea 
                        id="body" 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        onFocus={() => setBodyError(false)}
                        className={`block w-4/5 mt-1 text-sm rounded-sm ${bodyError ? "border-red-500" : "border-gray-300" }`} 
                        rows="5"
                    ></textarea>
                    <p className="text-sm mt-2 text-gray-500">(plain text only, no Markdown formatting)</p>

                    <button 
                        type="button"
                        onClick={post}
                        className=" mt-6 px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-sm shadow-sm"
                    >
                        Save Edits
                    </button>
                </div>
            </Grid>
        </>
    )
}