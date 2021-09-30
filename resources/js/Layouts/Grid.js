import React from "react"
import { Link } from "@inertiajs/inertia-react"

export default function Grid({ page, ...props }) {
  return (
    <div className="flex flex-row container md:w-4/5 lg:w-3/5 2xl:w-8/12 mx-auto">

      <aside 
        id="sidebar" 
        className="h-screen fixed top-0 ml-2 border-r border-gray-300 w-48"
        style={{ paddingTop: "78.4px" }}
      >

        <Link
          href="/" 
          as="div" 
          className={`pl-1 py-1 text-gray-500 hover:text-gray-700 cursor-pointer ${page === "home" ? "active-sidebar-link" : null}`}
        >
            Home
        </Link>

        <h1 className="mt-4 text-gray-500 text-xs ml-1 mb-2">PUBLIC</h1>

        <Link
          href="/questions"
          as="div"
          className={`w-full py-1 text-gray-500 hover:text-gray-700 cursor-pointer ${page === "questions" ? "active-sidebar-link" : null}`}
        >
          <div class="inline-block align-middle pl-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="inline-block ml-1">Questions</h1>
        </Link>

        <Link 
          as="h1" 
          className={`block text-gray-500 mt-3 pl-6 py-1 hover:text-gray-700 cursor-pointer ${page === "tags" ? "active-sidebar-link" : null}`}
          href="/tags"
        >
          Tags
        </Link>

        <Link 
          as="h1" 
          className={`block text-gray-500 mt-3 pl-6 py-1 hover:text-gray-700 cursor-pointer ${page === "users" ? "active-sidebar-link" : null}`}
          href="/users"
        >
          Users
        </Link>
        
      </aside>

      <main className="relative left-48 ml-2 w-8/12">
          {props.children}
      </main>
    </div>
  )
}