import React from "react"
import RelativeDate from "./RelativeDate"

export default function UserQuestionWidget({ question }) {
    return (
        <div className="text-xs text-gray-500 mt-2 lg:self-end lg:mt-0 lg:mr-6">
            asked <RelativeDate UTCTime={question.created_at} />
            <div className="flex flex-row justify-start mt-1">
                <img
                    width="32"
                    height="32"
                    className="rounded-sm self-start"
                    src="http://localhost:8000/default-profile.png"
                />
                <div className="ml-2">
                    <p className="text-blue-600 text-xs">
                        {question.user.name}
                    </p>
                    <span className="font-bold text-sm">
                        {question.user.answers.length}
                    </span>
                </div>
            </div>
        </div>
    )
}
