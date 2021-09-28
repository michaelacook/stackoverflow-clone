import React from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import Upvote from "../Components/Upvote"
import Downvote from "../Components/Downvote"
import moment from "moment"
import { Link } from "@inertiajs/inertia-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
    dark,
    funky,
    okaidia,
    twilight,
    coy,
    solarizedlight,
    tomorrow,
  } from "react-syntax-highlighter/dist/esm/styles/prism"
import ReactMarkdown from "react-markdown"

export default function Question({ user, page, question, tags }) {
    return (
        <>
            <Navbar user={user} />
            <Grid page={page}>

                <div className="w-full mt-5 ml-4 mb-6">

                    <h1 className="text-2xl mb-2">{question.title}</h1>

                    <div className="mb-3">
                        <span className="text-xs text-gray-600">Asked <span className="text-gray-900">{moment(question.created_at, "YYYYMMDD").fromNow()}</span></span>
                        <span className="text-xs text-gray-600 ml-5">Active <span className="text-gray-900">{moment(question.updated_at, "YYYYMMDD").fromNow()}</span></span>
                        <span className="text-xs text-gray-600 ml-5">Viewed <span className="text-gray-900">{question.views} times</span></span>
                    </div>
                    

                    <hr />

                    <div className="flex flex-row">
                        <div id="votes" className="inline-block mr-4 mt-4">
                            <Upvote
                                data={question}
                                href="/questions/upvote" 
                            />
                            <span className="ml-3 text-gray-600 text-xl">{question.votes}</span>
                            <Downvote
                                data={question}
                                href="/questions/downvote" 
                            />
                        </div>

                        <div id="question-body" className="w-full mt-4">
                            <ReactMarkdown
                                children={question.body}
                                components={{
                                code({node, inline, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={solarizedlight}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    />
                                    ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                    )
                                }
                                }}
                            />

                            <div className="mt-5">
                                {tags.map((tag) => (
                                    <span 
                                        className="py-1 px-2 rounded-sm bg-blue-100 text-blue-500 text-xs mr-1"
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="mt-20">
                        <p className="text-lg mb-5">Share a link to this question via email, Twitter, or Facebook.</p>
                        <label for="question-body" className="text-2xl text-gray-700">Your Answer</label>
                        <textarea 
                            id="question-body" 
                            className="w-full bg-gray-50 mt-3 border-gray-300 text-sm rounded-sm" 
                            placeholder="Use markdown format..."
                            rows="12"
                        ></textarea>

                        <button 
                            type="button"
                            className=" mt-4 px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-sm shadow-sm"
                        >
                            Post Your Answer
                        </button>
                    </div> 

                    <div className="mt-10">
                        <p className="inline-block text-gray-700">Browse other questions tagged</p>&nbsp;
                        {tags.map((tag) => (
                            <span 
                                className="py-1 px-2 rounded-sm bg-blue-100 text-blue-500 text-xs mr-1"
                            >
                                {tag.name}
                            </span>
                        ))}
                        <p className="inline-block"> or <Link className="text-blue-600" href="/questions/new">ask your own question</Link>.</p>
                    </div>                   
                    
                </div>

                
            </Grid>
        </>

    )
}