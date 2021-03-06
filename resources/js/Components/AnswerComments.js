import React, { useState } from "react"
import RelativeDate from "./RelativeDate"
import { Link } from "@inertiajs/inertia-react"

export default function AnswerComments({ answer, question, auth }) {
    const [addComment, setAddComment] = useState(false)
    const [answerComment, setAnswerComment] = useState("")

    return (
        <>
            {answer.comments.length ? (
                <div className="ml-14">
                    {answer.comments.map((comment) => (
                        <div className="p-1 border-b border-gray-200">
                            <div className="ml-6">
                                <p className="inline-block text-sm text-gray-700 break-all">
                                    {comment.body} –
                                    <span className="text-blue-600 text-sm">
                                        &nbsp;{comment.user.name}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        &nbsp;
                                        <RelativeDate
                                            UTCTime={comment.created_at}
                                        />
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}

            <div className="ml-14 mt-2 mb-5">
                {!addComment && auth ? (
                    <span
                        onClick={() => setAddComment(true)}
                        className="text-sm text-gray-400 hover:text-blue-400 cursor-pointer"
                    >
                        Add a comment
                    </span>
                ) : auth ? (
                    <div className="flex flex-row justify-start">
                        <input
                            type="text"
                            autoFocus={true}
                            value={answerComment}
                            onChange={(e) => setAnswerComment(e.target.value)}
                            className="w-2/3 mr-4 text-xs text-gray-700 border border-gray-200 self-start rounded-sm"
                            placeholder="comment..."
                        />

                        <Link
                            href="/answers/comments"
                            method="post"
                            preserveScroll
                            data={{
                                question,
                                answer,
                                comment: answerComment,
                            }}
                        >
                            <button
                                onClick={() => {
                                    setAddComment(false)
                                    setAnswerComment("")
                                }}
                                className="text-xs py-2 px-2 text-white bg-blue-500 rounded-sm shadow-sm self-start"
                            >
                                Add comment
                            </button>
                        </Link>

                        <button
                            onClick={() => {
                                setAddComment(false)
                                setanswerComment("")
                            }}
                            className="text-xs ml-1 py-2 px-2 text-white bg-gray-500 rounded-sm shadow-sm self-start"
                        >
                            Cancel
                        </button>
                    </div>
                ) : null}
            </div>
            <hr />
        </>
    )
}
