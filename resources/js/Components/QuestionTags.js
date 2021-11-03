import React from "react"
import Tag from "./Tag"

export default function QuestionTags({ tags }) {
    return (
        <div className="mt-5">
            {tags.map((tag) => (
                <Tag tag={tag} />
            ))}
        </div>
    )
}
