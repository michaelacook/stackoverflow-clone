import React from "react"

export default function PaginationLinks({ links, className }) {
    return links.to > links.total ? (
        <div className={className}>
            {links.map((link, i) => (
                <a href={link.url}>
                    <button 
                        dangerouslySetInnerHTML={{__html: link.label }}
                        className={`px-2
                                    py-1 
                                    rounded 
                                    text-xs 
                                    border 
                                    ml-2 
                                    ${link.active ? 
                                        "bg-yellow-500 text-white border-yellow-500" 
                                        : 
                                        "text-gray-700 border-gray-300"}
                                    `}
                    >
                    </button>  
                </a>
            ))}
        </div>
    ) : null
}