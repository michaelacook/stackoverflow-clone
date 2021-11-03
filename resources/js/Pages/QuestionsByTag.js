import React from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import Tag from "@/Components/Tag"
import { Link, usePage } from "@inertiajs/inertia-react"
import UserQuestionWidget from "@/Components/UserWidget"
import WatchTagButton from "@/Components/WatchTagButton"
import PaginationLinks from "@/Components/PaginationLinks"

export default function QuestionsByTag({ page, tag, questions }) {
    const { auth } = usePage().props

    return (
        <>
            <Navbar user={auth.user} />

            <Grid page={page}>
                <div className="mt-5 mb-5 lg:w-4/6 w-11/12">
                    <div className="w-full flex flex-row justify-between">
                        <h1 className="text-lg lg:text-3xl mb-8 ml-5">
                            Questions tagged [{tag[0].name}]
                        </h1>

                        <Link
                            as="button"
                            href="/questions/new"
                            className="px-2 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-sm shadow-sm self-start"
                        >
                            Ask Question
                        </Link>
                    </div>

                    <p className="ml-5 mb-4 text-sm text-gray-700">
                        {tag[0].guidance ? (
                            tag[0].guidance
                        ) : (
                            <span>
                                The <Tag tag={tag[0]} />
                                tag has no usage guidance, can you{" "}
                                <Link
                                    className="text-blue-600"
                                    href={`/tags/edit/${tag[0].name}`}
                                >
                                    help us create it
                                </Link>
                                ?
                            </span>
                        )}
                    </p>

                    {auth.user ? (
                        <WatchTagButton
                            tag={tag[0]}
                            watched={auth.watchedTags.map((tag) => tag.name)}
                            redirect={`/questions/by-tag/${tag[0].name}`}
                            className={"block ml-5 mb-8"}
                        />
                    ) : null}

                    <p className="inline-block text-lg text-gray-800 ml-5 mb-5">
                        {new Intl.NumberFormat().format(questions.total)}{" "}
                        questions
                    </p>
                    <hr />
                </div>

                <div id="questions">
                    {questions.data.map((question) => (
                        <div className="w-4/6 flex flex-row justify-start border-b border-gray-300 bottom-1 py-4">
                            <div className="ml-6 text-center">
                                <p className="text-gray-500 font-semibold">
                                    {question.votes}
                                    <span className="block text-xs text-gray-500">
                                        votes
                                    </span>
                                </p>

                                <p className="mt-2 text-gray-500 font-semibold">
                                    {question.answers.length}
                                    <span className="block text-xs text-gray-500">
                                        answers
                                    </span>
                                </p>

                                <div className="flex flex-row justify-start mt-3">
                                    <p className="text-xs text-gray-500">
                                        {question.views}
                                    </p>
                                    <span className="text-xs text-gray-500 ml-1">
                                        views
                                    </span>
                                </div>
                            </div>

                            <div className="ml-6 align-top w-full">
                                <Link href={`/questions/${question.slug}`}>
                                    <p className="text-blue-600 text-lg leading-tight font-medium">
                                        {question.title}
                                    </p>
                                </Link>

                                <p className="text-sm text-gray-800 mt-2">
                                    {question.body
                                        .substr(0, 170)
                                        .replace(/[^\w\s]/gi, "")}
                                    ...
                                </p>

                                <div className="mt-1 flex flex-col xl:flex-row xl:justify-between">
                                    <div>
                                        {question.tags.map((tag) => (
                                            <Tag tag={tag} />
                                        ))}
                                    </div>

                                    <UserQuestionWidget question={question} />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="w-4/6 flex flex-row justify-end">
                        <PaginationLinks
                            className={`mt-5 mb-5`}
                            links={questions.links}
                        />
                    </div>
                </div>
            </Grid>
        </>
    )
}
