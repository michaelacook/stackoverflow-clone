import React from "react" 
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import Tag from "@/Components/Tag"
import RelativeDate from "@/Components/RelativeDate"
import { Link } from "@inertiajs/inertia-react"
import { usePage } from '@inertiajs/inertia-react'

export default function Home({ user, page, watched, questionsByTag, allQuestions = null }) {
  const { auth } = usePage().props
  
  return (
    <>
        <Navbar user={user} />

        <Grid page={page}>
          <div className="mt-5 mb-1 w-5/6">
            <div className="w-full flex flex-row justify-between">
                <h1 className="text-3xl mb-8 ml-5">Top Questions</h1>

                <Link 
                    as="button" 
                    href="/questions/new"
                    className="px-2 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-sm shadow-sm self-start"
                >
                    Ask Question
                </Link>
            </div>
            
            <hr />
          </div>

                

            <div id="questions">
                {Object.values(questionsByTag).length ? Object.values(questionsByTag).reverse().map((question) => (
                    <div className="w-5/6 flex flex-row justify-start border-b border-gray-300 bottom-1 py-4">
                        
                        <div className="w-1/4 ml-6 flex flex-row justify-between">
                            <p className="text-gray-500 text-lg font-semibold text-center">
                                {question.votes}
                                <span className="block text-xs text-gray-500">votes</span>
                            </p>
                            

                            <p className="text-gray-500 text-lg font-semibold text-center">
                                {question.answers.length}
                                <span className="block text-xs text-gray-500">answers</span>
                            </p>
                            

                            <p className="text-gray-500 text-lg font-semibold text-center">
                                {question.views}
                                <span className="block text-xs text-gray-500">views</span>
                            </p>
                            
                        </div>

                        <div className="ml-7 w-full">
                            <Link href={`/questions/${question.slug}`}>
                                <p className="text-blue-600 text-lg leading-tight font-medium">{question.title}</p>
                            </Link>

                            <div className="mt-2 flex flex-col xl:flex-row xl:justify-between">
                                <div>
                                    {question.tags.map((tag) => (
                                        <Tag tag={tag} />
                                    ))}
                                </div>

                                <p className="text-gray-500 text-sm self-end">
                                    Question asked <RelativeDate UTCTime={question.created_at} />

                                    <Link href={`/users/${question.user.name}`}>
                                        <span className="text-blue-600"> {user.name}</span>

                                        <span className="font-bold text-gray-500"> {question.user.answers.length}</span>
                                    </Link>
                                    
                                </p>
                            </div>
                            
                        </div>
                    </div>
                )) : (
                    null
                    // here render a view of all questions
                )}
            </div>
        </Grid>
    </>
  )
}