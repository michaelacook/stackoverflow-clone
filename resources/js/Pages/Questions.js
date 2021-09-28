import React from "react"
import Navbar from "@/Components/Navbar"
import Grid from "@/Layouts/Grid"

export default function Questions({ user, page, questions }) {
  return (
      <React.Fragment>
        <Navbar user={user} />

        <Grid page={page}>
            <div className="p-7">
                <h1 className="text-3xl">All Questions</h1>
            </div>

            <hr />
        </Grid>
      </React.Fragment>
  )
}