import React from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
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
    
    const markdown = `**Here is some JavaScript code:**

~~~js
function doShit() {
    return "fuck you asshole";
}
~~~

so ***what*** do you think of it?

When I run the command \`cd ~ && npm run watch\` *nothing* happens!
    `

    return (
        <>
            <Navbar user={user} />
            <Grid page={page}>

                <div className="p-6">

                    <h1 className="text-2xl mb-5">{question.title}</h1>

                    <hr />

                    <div id="question-body" className="mt-4">
                        <ReactMarkdown
                            children={markdown}
                            components={{
                            code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={okaidia}
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
                    </div>

                    <div className="mt-5">
                        {tags.map((tag) => (
                            <span 
                                className="py-1 px-2 rounded-sm bg-blue-100 text-blue-500 text-xs mr-1"
                            >
                                {tag.name}
                            </span>
                        ))}
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
                        <p className="inline-block">Browse other questions tagged</p>&nbsp;
                        {tags.map((tag) => (
                            <span 
                                className="py-1 px-2 rounded-sm bg-blue-100 text-blue-500 text-xs mr-1"
                            >
                                {tag.name}
                            </span>
                        ))}
                        <p className="inline-block"> or ask your own question</p>
                    </div>                   
                    
                </div>

                
            </Grid>
        </>

    )
}