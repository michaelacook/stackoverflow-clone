import React from "react"
import Dropdown from "./Dropdown"
import DotsMenuIcon from "./DotsMenuIcon"
import { Link } from "@inertiajs/inertia-react"

export default function ModeratorQuestionMenu({ question, className }) {
    return (
        <Dropdown className={`${className} text-gray-500`}>
            <Dropdown.Trigger>
                <DotsMenuIcon />
            </Dropdown.Trigger>
            <Dropdown.Content>
                <div className="px-2 py-1 text-xs text-gray-700 bg-gray-200">MENU</div>
                <Link 
                    href={`${question.open ? "/questions/" + `${question.id}` + "/close" : "/questions/" + `${question.id}` + "/open"}`} 
                    className="block py-1 px-2 hover:bg-gray-300 border-b border-gray-200"
                >
                    {question.open ? "Close" : "Open"}
                </Link>
                <Link 
                    method="DELETE"
                    href={`/questions/${question.id}`}
                    className="block py-1 px-2 hover:bg-gray-300 border-b border-gray-200"
                >
                    Delete
                </Link>
            </Dropdown.Content>
        </Dropdown>
    )
}