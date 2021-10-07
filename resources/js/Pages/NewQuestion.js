import React, { useState, useRef } from "react"
import Navbar from "@/Components/Navbar"
import { Inertia } from "@inertiajs/inertia"
import { Link } from "@inertiajs/inertia-react"

export default function NewQuestion({ user, page, tagSuggestions }) {
    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tagSuggestionsEnabled, setTagSuggestionsEnabled] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const [bodyError, setBodyError] = useState(false)
    const [tagsError, setTagsError] = useState(false)

    function validate() {
        if (!title) {
            setTitleError(true)
        }

        if (!body) {
            setBodyError(true)
        }

        if (!tags.length) {
            setTagsError(true)
        }
    }

    function addTag(e) {
        if (tags.length > 4) return
        if (e.target.value && e.key === " ") {
            setTags([...tags, 
                {
                    name: e.target.value
                }
            ])
            setTagInput("")
        }
    }

    function removeTag(i) {
        setTags(tags.filter((tag, index) => index !== i))
    }

    function addSuggestedTag(tag) {
        if (tags.length > 4) return
        setTagInput("")
        setTags([...tags, tag])
    }

    function post() {
        if (tags.length && title && body) {
            Inertia.post("/questions", {
                tags,
                title,
                body
            })
        }
    }

    function disableTagSuggestions() {
        setTimeout(() => {
            setTagSuggestionsEnabled(false)
        }, 150)
    }

    return (
        <div className="h-screen overflow-auto" style={{ background: "#F1F2F3" }}>
            <Navbar user={user} />

            <div className="container md:w-4/5 lg:w-3/5 2xl:w-8/12 mx-auto p-7">
                    
                <h1 className="text-3xl">Ask a public question</h1>

                <div className="p-5 mt-5 w-11/12 bg-white shadow-lg rounded-sm">
                    <form>
                        <label for="question" className="font-bold text-black text-sm">Title</label>
                        <p className="text-gray-700 text-sm">Be specific and imagine you’re asking a question to another person</p>
                        <input 
                            id="question"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text" 
                            autoFocus={true}
                            onFocus={() => setTitleError(false)}
                            placeholder="e.g. How do I create dynamic refs on React components?" 
                            className={`w-full mt-1 rounded-sm mb-1 bg-white text-xs ${titleError ? "border-red-500" : "border-gray-300"}`}
                        />
                        <p className={`${titleError ? null : "hidden"} text-sm text-red-600 mb-4`}>Please add a descriptive title.</p>


                        <label for="question-body" className="font-bold text-black text-sm">Body</label>
                        <p className="text-gray-700 text-sm">Include all the information someone would need to answer your question</p>
                        <textarea 
                            id="question-body" 
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            onFocus={() => setBodyError(false)}
                            className={`w-full mt-1 text-sm rounded-sm ${titleError ? "border-red-500" : "border-gray-300" }`} 
                            placeholder="Use markdown format..."
                            rows="12"
                        ></textarea>
                        <p className={`${bodyError ? null : "hidden"} text-sm text-red-600 mb-4`}>A question body is required.</p>

                        <label for="tags" className="font-bold text-black text-sm">Tags</label>
                        <p className="text-gray-700 text-sm">Add up to 5 tags to describe what your question is about</p>

                        <div 
                            className={`w-full py-2 border rounded-sm bg-white text-xs ${tagsError ? "border-red-500" : "border-gray-300"}`}
                        >
                            <span className="inline-flex flex-row flex-wrap justify-start">
                                {tags.map((tag, i) => (
                                    <span 
                                        className="px-1 py-1 bg-blue-100 rounded-sm ml-1 text-blue-600 text-xs"
                                    >
                                        {tag.name}
                                        <span 
                                            key={i}
                                            className=" ml-1 hover:bg-blue-600 hover:text-white cursor-pointer rounded-sm"
                                            onClick={(e) => removeTag(i)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4 align-top font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                    </span>
                                ))}
                                <input
                                    disabled={tags.length > 4}
                                    id="tags"
                                    type="text" 
                                    className="tag-editor inline-block text-xs ml-2 w-28"
                                    placeholder={`${!tagInput && !tags.length ? "e.g. reactjs, laravel" : ""}`}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onFocus={() => {
                                        setTagSuggestionsEnabled(true)
                                        setTagsError(false)
                                    }}
                                    onBlur={disableTagSuggestions}
                                    value={tagInput}
                                    onKeyPress={addTag}
                                />
                            </span>
                        </div>
                        <p className={`${tagsError ? null : "hidden"} text-sm text-red-600 mt-1 mb-4`}>Please add at least one relevant tag.</p>

                        <div className={
                            `bg-white max-h-32 rounded shadow-lg overflow-y-scroll ${!tagSuggestionsEnabled ? "hidden" : null}`
                            } id="autoCompleteSuggestions">
                            {tagInput && tags.length < 5 ? tagSuggestions
                                .filter((tag) => tag["name"].includes(tagInput.trim()))
                                .filter((tag) => !tags.map(item => item.name).includes(tag.name))
                                .map((tag, i) => (
                                    <div 
                                        key={i}
                                        className=" hover:bg-gray-200 text-xs text-gray-600 px-3 py-3 cursor-pointer"
                                        onClick={(e) => addSuggestedTag(tag)}
                                    >
                                        {tag.name}
                                    </div>
                            )) : null}
                        </div>
                        
                    </form>
                </div>

                <button 
                    type="button"
                    onClick={() => {
                        validate()
                        
                        if (titleError || bodyError || tagsError) {
                            return
                        }

                        post()
                    }}
                    className=" mt-8 px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-sm shadow-sm"
                >
                    Review your question
                </button>
            </div>
        </div>
    )
}