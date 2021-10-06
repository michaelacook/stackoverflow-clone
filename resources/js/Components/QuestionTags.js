import React from "react"

export default function QuestionTags({ tags }) {
    return (
        <div className="mt-5">
            {tags.map((tag) => (
                <span 
                    className="py-1 px-2 rounded-sm bg-blue-100 text-blue-500 text-xs mr-1"
                >
                    {tag.name}
                </span>
            ))}
        </div>
    )
}