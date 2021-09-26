import React from "react" 
import Navbar from "@/Components/Navbar"

export default function Home({ user }) {
  return (
      <div>
          <Navbar user={user} />

      </div>
  )
}