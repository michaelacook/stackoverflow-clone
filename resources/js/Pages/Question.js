import React, { useState } from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import Upvote from "../Components/Upvote"
import Downvote from "../Components/Downvote"
import { Link, usePage } from "@inertiajs/inertia-react"
import { Inertia } from "@inertiajs/inertia"
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
import UserAnswerWidget from "@/Components/UserAnswerWidget"
import RelativeDate from "@/Components/RelativeDate"
import QuestionTags from "@/Components/QuestionTags"
import AnswerComments from "@/Components/AnswerComments"
import Tag from "@/Components/Tag"

export default function Question({ page, question, answers, tags, comments }) {
    const { auth } = usePage().props
    const [addComment, setAddComment] = useState(false)
    const [questionComment, setQuestionComment] = useState("")
    const [answerBody, setAnswerBody] = useState("")

    function postQuestion() {
        if (answerBody) {
            Inertia.post("/answers", {
                question,
                answer: {
                    body: answerBody,
                },
            })
            setAnswerBody("")
        }
    }

    return (
        <>
            <Navbar user={auth.user} />
            <Grid page={page}>
                <div className="w-4/6 mt-5 ml-6 mb-6">
                    <h1 className="text-2xl mb-2">{question.title}</h1>

                    <div className="mb-3">
                        <span className="text-xs text-gray-600">
                            Asked{" "}
                            <span className="text-gray-900">
                                <RelativeDate UTCTime={question.created_at} />
                            </span>
                        </span>
                        <span className="text-xs text-gray-600 ml-5">
                            Active{" "}
                            <span className="text-gray-900">
                                <RelativeDate UTCTime={question.updated_at} />
                            </span>
                        </span>
                        <span className="text-xs text-gray-600 ml-5">
                            Viewed{" "}
                            <span className="text-gray-900">
                                {question.views} times
                            </span>
                        </span>
                    </div>

                    <hr />

                    <div className="flex flex-row">
                        <div id="votes" className="inline-block mr-4 mt-4">
                            <Upvote
                                data={question}
                                auth={auth}
                                href="/questions/upvote"
                            />
                            <span className="ml-3 text-gray-600 text-xl">
                                {question.votes}
                            </span>
                            <Downvote
                                data={question}
                                auth={auth}
                                href="/questions/downvote"
                            />
                        </div>

                        <div id="question-body" className="w-full mt-4 pb-12">
                            <ReactMarkdown
                                children={question.body}
                                components={{
                                    code({
                                        node,
                                        inline,
                                        className,
                                        children,
                                        ...props
                                    }) {
                                        const match = /language-(\w+)/.exec(
                                            className || ""
                                        )
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                children={String(
                                                    children
                                                ).replace(/\n$/, "")}
                                                style={solarizedlight}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            />
                                        ) : (
                                            <code
                                                className={className}
                                                {...props}
                                            >
                                                {children}
                                            </code>
                                        )
                                    },
                                }}
                            />
                            <QuestionTags tags={tags} />
                        </div>
                    </div>

                    {comments.length ? (
                        <div className="ml-14">
                            {comments.map((comment) => (
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

                    {auth.user && auth.user.email_verified_at ? (
                        <div className="ml-14 mt-2 mb-5">
                            {!addComment && auth.user ? (
                                <span
                                    onClick={() => setAddComment(true)}
                                    className="text-sm text-gray-400 hover:text-blue-400 cursor-pointer"
                                >
                                    Add a comment
                                </span>
                            ) : auth.user ? (
                                <div className="flex flex-row justify-start">
                                    <input
                                        type="text"
                                        autoFocus={true}
                                        value={questionComment}
                                        onChange={(e) =>
                                            setQuestionComment(e.target.value)
                                        }
                                        className="w-2/3 mr-4 text-xs text-gray-700 border border-gray-200 self-start rounded-sm"
                                        placeholder="comment..."
                                    />

                                    <Link
                                        href="/questions/comments"
                                        method="post"
                                        preserveScroll
                                        data={{
                                            user: auth.user,
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
                            ) : null}
                        </div>
                    ) : null}

                    {auth.user || comments.length ? <hr /> : null}

                    {/* put answers here */}
                    <p className="text-lg mt-4">
                        {answers.length ? answers.length : null}
                        {answers.length
                            ? answers.length > 1
                                ? " Answers"
                                : " Answer"
                            : "No answers yet"}
                    </p>

                    {answers.length
                        ? answers.map((answer) => (
                              <div id={answer.id}>
                                  <div className="flex flex-row">
                                      <div
                                          id="votes"
                                          className="inline-block mr-4 mt-4"
                                      >
                                          <Upvote
                                              data={{
                                                  answer,
                                                  slug: question["slug"],
                                              }}
                                              auth={auth}
                                              href="/answers/upvote"
                                          />
                                          <span className="ml-3 text-gray-600 text-xl">
                                              {answer.votes}
                                          </span>
                                          <Downvote
                                              data={{
                                                  answer,
                                                  slug: question["slug"],
                                              }}
                                              auth={auth}
                                              href="/answers/downvote"
                                          />
                                      </div>

                                      <div className="w-full mt-4 flex flex-col">
                                          <ReactMarkdown
                                              children={answer.body}
                                              components={{
                                                  code({
                                                      node,
                                                      inline,
                                                      className,
                                                      children,
                                                      ...props
                                                  }) {
                                                      const match =
                                                          /language-(\w+)/.exec(
                                                              className || ""
                                                          )
                                                      return !inline &&
                                                          match ? (
                                                          <SyntaxHighlighter
                                                              children={String(
                                                                  children
                                                              ).replace(
                                                                  /\n$/,
                                                                  ""
                                                              )}
                                                              style={
                                                                  solarizedlight
                                                              }
                                                              language={
                                                                  match[1]
                                                              }
                                                              PreTag="div"
                                                              {...props}
                                                          />
                                                      ) : (
                                                          <code
                                                              className={
                                                                  className
                                                              }
                                                              {...props}
                                                          >
                                                              {children}
                                                          </code>
                                                      )
                                                  },
                                              }}
                                          />

                                          <div className="w-full md:w-4/5 lg:w-9/12 flex flex-row justify-between mt-6 mb-12">
                                              <div>
                                                  <span className="text-sm text-gray-500">
                                                      Share{" "}
                                                  </span>
                                                  <span className="text-sm text-gray-500 ml-3">
                                                      Edit{" "}
                                                  </span>
                                                  <span className="text-sm text-gray-500 ml-3">
                                                      Follow
                                                  </span>
                                              </div>
                                              <UserAnswerWidget
                                                  answer={answer}
                                              />
                                          </div>
                                      </div>
                                  </div>

                                  <hr className="ml-14" />

                                  <AnswerComments
                                      auth={auth.user}
                                      answer={answer}
                                      question={question}
                                  />
                              </div>
                          ))
                        : null}

                    <div className="mt-5">
                        <div>
                            <p className="text-lg mb-5">
                                Share a link to this question via email,
                                Twitter, or Facebook.
                            </p>
                            <label
                                for="question-body"
                                className="text-2xl text-gray-700"
                            >
                                Your Answer
                            </label>
                            <textarea
                                id="question-body"
                                value={answerBody}
                                onChange={(e) => setAnswerBody(e.target.value)}
                                className={`w-full 
                                    focus-within:bg-white 
                                    bg-gray-50 mt-3 
                                    border-gray-300 
                                    text-sm 
                                    rounded-sm
                                    ${
                                        auth.user && auth.user.email_verified_at
                                            ? null
                                            : "btn-disabled"
                                    }
                                `}
                                placeholder="Use markdown format..."
                                rows="12"
                                disabled={
                                    auth.user && auth.user.email_verified_at
                                        ? false
                                        : true
                                }
                            ></textarea>

                            <button
                                type="button"
                                onClick={postQuestion}
                                className={`
                                    mt-4 
                                    px-3 py-3 
                                    bg-blue-500
                                    text-white 
                                    text-sm 
                                    rounded-sm 
                                    shadow-sm
                                    ${
                                        auth.user && auth.user.email_verified_at
                                            ? "hover:bg-blue-600"
                                            : "btn-disabled"
                                    }
                                `}
                            >
                                Post Your Answer
                            </button>
                        </div>

                        <div className="mt-6">
                            <p className="inline-block text-gray-700">
                                Browse other questions tagged
                            </p>
                            &nbsp;
                            {tags.map((tag) => (
                                <Tag tag={tag} />
                            ))}
                            <p className="inline-block">
                                {" "}
                                or{" "}
                                <Link
                                    className={`text-blue-600 ${
                                        auth.user && auth.user.email_verified_at
                                            ? null
                                            : "btn-disabled"
                                    }`}
                                    href={`${
                                        auth.user && auth.user.email_verified_at
                                            ? "/questions/new"
                                            : ""
                                    }`}
                                >
                                    ask your own question
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </Grid>
        </>
    )
}
