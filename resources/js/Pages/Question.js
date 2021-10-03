import React, { useState } from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import Upvote from "../Components/Upvote"
import Downvote from "../Components/Downvote"
import moment from "moment"
import { Link } from "@inertiajs/inertia-react"
import { Inertia } from '@inertiajs/inertia'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
    // dark,
    // funky,
    // okaidia,
    // twilight,
    // coy,
    solarizedlight,
    // tomorrow,
  } from "react-syntax-highlighter/dist/esm/styles/prism"
import ReactMarkdown from "react-markdown"

export default function Question({ 
    user, 
    page, 
    question, 
    answers,
    tags, 
    comments
 }) {
    const [addComment, setAddComment] = useState(false)
    const [questionComment, setQuestionComment] = useState("")
    const [answerBody, setAnswerBody] = useState("")

    function postQuestion() {
        if (answerBody) {
            Inertia.post("/answers", {
                question,
                answer: {
                    body: answerBody,
                }
            })
            setAnswerBody("")
        }
    }

    return (
        <>
            <Navbar user={user} />
            <Grid page={page}>

                <div className="w-full mt-5 ml-6 mb-6">

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

                        <div id="question-body" className="w-full mt-4 pb-12 border-b border-gray-200">
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
                    
                    {comments.length ? (
                        <div className="ml-14">
                            {comments.map((comment) => (
                                <div className="mt-1 pb-1 border-b border-gray-200">
                                    <p className="text-sm text-gray-700 ml-6 mt-1">{comment.body}</p> 
                                </div>
                            ))}
                        </div>
                    ) 
                    : null}

                    <div className="ml-14 mt-2 mb-5">
                        {!addComment ? (
                            <span 
                                onClick={() => setAddComment(true)}
                                className="text-sm text-gray-400 hover:text-blue-400 cursor-pointer"
                            >
                                Add a comment
                            </span>
                        ) 
                        : (
                            <div className="flex flex-row justify-start">
                                <input 
                                    type="text" 
                                    autoFocus={true}
                                    value={questionComment}
                                    onChange={(e) => setQuestionComment(e.target.value)}
                                    className="w-2/3 mr-4 text-xs text-gray-700 border border-gray-200 self-start rounded-sm"
                                    placeholder="comment..."
                                />

                                <Link 
                                    href="/questions/comments"
                                    method="post"
                                    preserveScroll
                                    data={{
                                        user,
                                        question,
                                        comment: questionComment,
                                    }}
                                >
                                    <button
                                        onClick={() => {
                                            setAddComment(false)
                                            setQuestionComment("")
                                        }} 
                                        className="text-xs py-2 px-2 text-white bg-blue-500 rounded-sm shadow-sm self-start"
                                    >
                                        Add comment
                                    </button>
                                </Link> 

                                <button 
                                    onClick={() => {
                                        setAddComment(false)
                                        setQuestionComment("")
                                    }}
                                    className="text-xs ml-1 py-2 px-2 text-white bg-gray-500 rounded-sm shadow-sm self-start"
                                >
                                    Cancel
                                </button>
                             </div>
                        )}
                        
                    </div>

                    <hr />

                    {/* put answers here */}
                    <p className="text-lg mt-4">
                       {answers.length ? answers.length : null} 
                       {answers.length ? (answers.length > 1 ? " Answers" : " Answer") : ("No answers yet")}
                    </p>

                    {answers.length ? (
                        answers.map((answer) => (
                            <div>
                                <div className="flex flex-row">
                                <div id="votes" className="inline-block mr-4 mt-4">
                                    <Upvote
                                        data={{answer, slug: question["slug"] }}
                                        href="/answers/upvote" 
                                    />
                                    <span className="ml-3 text-gray-600 text-xl">{answer.votes}</span>
                                    <Downvote
                                        data={{answer, slug: question["slug"] }}
                                        href="/answers/downvote" 
                                    />
                                </div>

                                <div className="w-full mt-4 pb-12">
                                    <ReactMarkdown
                                        children={answer.body}
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
                                </div>
                            </div>
                            
                            {answer.comments.length ? (
                                <div className="ml-14 mb-10">
                                    {answer.comments.map((comment) => (
                                        <div className="mt-1 pb-1 border-b border-gray-200">
                                            <p className="text-sm text-gray-700 ml-6 mt-1">{comment.body}</p> 
                                        </div>
                                    ))}
                                </div>
                            ) 
                            : null}
                            <hr />
                        </div>
                        ))

                    ) : null}

                    <div className="mt-5">
                        <div>
                            <p className="text-lg mb-5">Share a link to this question via email, Twitter, or Facebook.</p>
                            <label for="question-body" className="text-2xl text-gray-700">Your Answer</label>
                            <textarea 
                                id="question-body" 
                                value={answerBody}
                                onChange={(e) => setAnswerBody(e.target.value)}
                                className="w-full focus-within:bg-white bg-gray-50 mt-3 border-gray-300 text-sm rounded-sm" 
                                placeholder="Use markdown format..."
                                rows="12"
                            ></textarea>

                            <button 
                                type="button"
                                onClick={postQuestion}
                                className=" mt-4 px-3 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-sm shadow-sm"
                            >
                                Post Your Answer
                            </button>
                        </div> 

                        <div className="mt-6">
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
                </div>


            </Grid>
        </>

    )
}