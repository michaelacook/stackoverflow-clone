import React from "react" 
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"
import { Link } from "@inertiajs/inertia-react"

export default function Home({ user, page }) {
  return (
    <>
        <Navbar user={user} />

        <Grid page={page}>
          <div className="mt-5 ml-4 mb-6">

            <div className="flex flex-row justify-between">
              <h1 className="text-3xl">Top Questions</h1>

              <Link 
                as="button" 
                href="/questions/new"
                className="px-2 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-sm shadow-sm"
              >
                Ask Question
              </Link>
              
            </div>
            
          </div>
          <hr />
        </Grid>
    </>
  )
}