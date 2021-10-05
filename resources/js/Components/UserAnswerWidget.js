import React from "react"
import moment from "moment"

export default function UserAnswerWidget({ answer, className="" }) {
    return (
      <div className={`text-sm text-gray-500 lg:self-end lg:mr-6 ${className}`}>
        {`answered ${moment(answer.created_at, "YYYYMMDD").fromNow()}`}

        <div className="flex flex-row justify-start mt-1">
          <img 
            width="32" 
            height="32" 
            className="rounded-sm self-start"
            src="http://localhost:8000/default-profile.png" 
          />
          <div className="ml-2">
            <p className="text-blue-600 text-xs">{answer.user.name}</p>
            <span className="font-bold text-sm">{answer.user.answers.length}</span>
          </div>
          
        </div>
      </div>
    )
}