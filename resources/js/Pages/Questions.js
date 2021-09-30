import React from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import { Link } from "@inertiajs/inertia-react"
import moment from "moment"

export default function Questions({ user, page, questions, count }) {
  return (
      <React.Fragment>
        <Navbar user={user} />

        <Grid page={page}>
            <div className="w-full mt-5 mb-5">
                <div className="w-full flex flex-row justify-between">
                  <h1 className="text-3xl mb-8 ml-5">All Questions</h1>

                  <Link 
                    as="button" 
                    href="/questions/new"
                    className="px-2 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-sm shadow-sm self-start"
                  >
                    Ask Question
                  </Link>
                </div>
                

                <span className="inline-block text-lg text-gray-800 ml-5">
                  {new Intl.NumberFormat().format(count)} questions
                </span>
            </div>

            <hr />

            <div id="questions">
              {questions.map((question) => (
                <div className="flex flex-row justify-start border-b border-gray-300 bottom-1 py-4">
                  
                  <div className="ml-6 text-center">
                    <p className="text-gray-500 font-semibold">
                      {question.votes}
                      <span className="block text-xs text-gray-500">votes</span>
                    </p>
                    

                    <p className="mt-2 text-gray-500 font-semibold">
                      {question.answers.length}
                      <span className="block text-xs text-gray-500">answers</span>
                    </p>
                    

                    <div className="flex flex-row justify-start mt-3">
                      <p className="text-xs text-gray-500">{question.views}</p>
                      <span className="text-xs text-gray-500 ml-1">views</span>
                    </div>
                    
                  </div>

                  
                  
                  <div className="ml-6 align-top">
                    <Link href={`questions/${question.slug}`}>
                      <p className="text-blue-600 text-lg leading-tight font-medium">{question.title}</p>
                    </Link>
                    

                    <p className="text-sm text-gray-800 mt-2">
                      {question.body.substr(0, 170).replace(/[^\w\s]/gi, "")}...
                    </p>

                    <div className="mt-1 flex flex-col xl:flex-row xl:justify-between">
                      <div>
                        {question.tags.map((tag) => (
                            <span 
                                className="py-1 px-2 rounded-sm bg-blue-100 text-blue-500 text-xs mr-1"
                            >
                                {tag.name}
                            </span>
                        ))}
                      </div>

                      <div className="text-xs text-gray-500 mt-2 lg:self-end lg:mt-0 lg:mr-6">
                        {`asked ${moment(question.created_at, "YYYYMMDD").fromNow()}`}

                        <div className="flex flex-row justify-start mt-1">
                          <img 
                            width="32" 
                            height="32" 
                            className="rounded-sm self-start"
                            src="http://localhost:8000/default-profile.png" 
                          />
                          <div className="ml-2">
                            <p className="text-blue-600 text-xs">{question.user.name}</p>
                            <span className="font-bold text-sm">{question.user.answers.length}</span>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
        </Grid>
      </React.Fragment>
  )
}