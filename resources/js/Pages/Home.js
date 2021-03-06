import React from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import Tag from "@/Components/Tag"
import RelativeDate from "@/Components/RelativeDate"
import PaginationLinks from "@/Components/PaginationLinks"
import { Link } from "@inertiajs/inertia-react"
import { usePage } from "@inertiajs/inertia-react"
import WatchedTagsWidget from "@/Components/WatchedTagsWidget"
import IgnoredTagsWidget from "@/Components/IgnoredTagsWidget"

export default function Home({ page, questions, tagSuggestions }) {
    const { auth } = usePage().props

    return (
        <>
            <Navbar user={auth.user} />

            <Grid page={page}>
                <div className="w-full flex flex-row flex-wrap">
                    <div id="col-1" className="w-4/6">
                        <div className="mt-5 mb-1">
                            <div className="w-full flex flex-row justify-between">
                                <h1 className="text-3xl mb-8 ml-5">
                                    Top Questions
                                </h1>

                                <Link
                                    as="button"
                                    href="/questions/new"
                                    className={`px-2 py-3 bg-blue-500 text-white text-sm rounded-sm shadow-sm self-start
                                                ${
                                                    auth.user &&
                                                    !auth.user.email_verified_at
                                                        ? "btn-disabled"
                                                        : "hover:bg-blue-600"
                                                }
                                    `}
                                    disabled={
                                        auth.user &&
                                        !auth.user.email_verified_at
                                            ? true
                                            : false
                                    }
                                >
                                    Ask Question
                                </Link>
                            </div>

                            <hr />
                        </div>

                        <div id="questions">
                            {questions.data.map((question) => (
                                <div className="flex flex-row justify-start border-b border-gray-300 bottom-1 py-4">
                                    <div className="w-1/4 ml-6 flex flex-row justify-between">
                                        <p className="text-gray-500 text-lg font-semibold text-center">
                                            {question.votes}
                                            <span className="block text-xs text-gray-500">
                                                votes
                                            </span>
                                        </p>

                                        <p className="text-gray-500 text-lg font-semibold text-center">
                                            {question.answers.length}
                                            <span className="block text-xs text-gray-500">
                                                answers
                                            </span>
                                        </p>

                                        <p className="text-gray-500 text-lg font-semibold text-center">
                                            {question.views}
                                            <span className="block text-xs text-gray-500">
                                                views
                                            </span>
                                        </p>
                                    </div>

                                    <div className="ml-7 w-full">
                                        <Link
                                            href={`/questions/${question.slug}`}
                                        >
                                            <p className="text-blue-600 text-lg leading-tight font-medium">
                                                {question.title}
                                            </p>
                                        </Link>

                                        <div className="mt-2 flex flex-col xl:flex-row xl:justify-between">
                                            <div>
                                                {question.tags.map((tag) => (
                                                    <Tag tag={tag} />
                                                ))}
                                            </div>

                                            <p className="text-gray-500 text-sm self-end">
                                                Question asked{" "}
                                                <RelativeDate
                                                    UTCTime={
                                                        question.created_at
                                                    }
                                                />
                                                <Link
                                                    href={`/users/${question.user.name}`}
                                                >
                                                    <span className="text-blue-600">
                                                        {" "}
                                                        {question.user.name}
                                                    </span>

                                                    <span className="font-bold text-gray-500">
                                                        {" "}
                                                        {
                                                            question.user
                                                                .answers.length
                                                        }
                                                    </span>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex flex-row justify-end">
                                <PaginationLinks
                                    links={questions.links}
                                    className={`mt-5 mb-5`}
                                />
                            </div>
                        </div>
                    </div>
                    <div id="col-2" className="w-1/3">
                        <WatchedTagsWidget
                            auth={auth}
                            tagSuggestions={tagSuggestions}
                            className={`ml-7`}
                        />

                        <IgnoredTagsWidget
                            auth={auth}
                            tagSuggestions={tagSuggestions}
                            className={`ml-7 mt-8`}
                        />
                    </div>
                </div>
            </Grid>
        </>
    )
}
