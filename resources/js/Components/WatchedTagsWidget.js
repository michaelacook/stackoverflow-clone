import React, { useState, useEffect } from "react"
import { useForm } from "@inertiajs/inertia-react"
import useOutsideClick from "@/hooks/useOutsideClick"
import Tag from "./Tag"

export default function WatchedTagsWidget({ auth, className, tagSuggestions }) {
    const { visible, setVisible, ref } = useOutsideClick(false)
    const [tagSuggestionsEnabled, setTagSuggestionsEnabled] = useState(false)
    const [tagInput, setTagInput] = useState("")

    const { data, setData, post } = useForm({
        tag: "",
        redirect: "/",
    })

    useEffect(() => {
        if (tagInput !== data.tag.name) {
            setData("tag", "")
        }
    }, [tagInput])

    return auth.user ? (
        <div
            className={`w-9/12 mt-5 shadow-lg border border-gray-300 rounded ${className}`}
        >
            <div className="w-full flex flex-row justify-between px-3 py-2 bg-gray-100 border-b border-gray-300">
                <h3 className="text-gray-700 text-baseline">Watched Tags</h3>

                {auth.watchedTags.length ? (
                    <span
                        onClick={() => setVisible(true)}
                        className={`${
                            visible ? "invisible" : null
                        } text-gray-700 cursor-pointer`}
                    >
                        edit
                    </span>
                ) : null}
            </div>

            {!visible ? (
                <div className="p-5">
                    {auth.watchedTags.length ? (
                        <div className="flex flex-row flex-wrap">
                            {auth.watchedTags.map((tag) => (
                                <Tag
                                    key={tag.id}
                                    className={`mb-1`}
                                    tag={tag}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <svg
                                className="mx-auto"
                                aria-hidden="true"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="#379FEF"
                            >
                                <path
                                    opacity=".2"
                                    d="M29.22 38.1a3.4 3.4 0 014.81-4.82l8.81 8.81a3.4 3.4 0 01-4.81 4.81l-8.81-8.8z"
                                ></path>
                                <path d="M18.5 5a1 1 0 100 2c.63 0 1.24.05 1.84.15a1 1 0 00.32-1.98A13.6 13.6 0 0018.5 5zm7.02 1.97a1 1 0 10-1.04 1.7 11.5 11.5 0 0 1 5.44 8.45 1 1 0 0 0 1.98-.24 13.5 13.5 0 0 0-6.38-9.91zM18.5 0a18.5 18.5 0 1010.76 33.55c.16.57.46 1.12.9 1.57L40 44.94A3.5 3.5 0 1044.94 40l-9.82-9.82c-.45-.45-1-.75-1.57-.9A18.5 18.5 0 0018.5 0zM2 18.5a16.5 16.5 0 1133 0 16.5 16.5 0 0 1-33 0zm29.58 15.2a1.5 1.5 0 112.12-2.12l9.83 9.83a1.5 1.5 0 11-2.12 2.12l-9.83-9.83z"></path>
                            </svg>

                            <p className="mx-auto text-center mt-3 text-sm text-gray-500 w-2/3">
                                Watch tags to curate your list of questions.
                            </p>

                            <div className="w-full mt-4 flex flex-row justify-center">
                                <button
                                    onClick={() => setVisible(!visible)}
                                    className={`
                                        text-xs 
                                        bg-blue-200 
                                        border 
                                        border-blue-600 
                                        text-blue-600 
                                        px-2 py-2 
                                        rounded-sm
                                        ${!auth.user.email_verified_at ? "btn-disabled" : " hover:text-blue-800 hover:bg-blue-400"}
                                    `}
                                    disabled={!auth.user.email_verified_at ? true : false}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 inline-block mr-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Watch a tag
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div ref={ref} className="p-5">
                    {auth.watchedTags.length ? (
                        <div className="flex flex-row flex-wrap">
                            {auth.watchedTags.map((tag) => (
                                <Tag
                                    className={`mb-1`}
                                    tag={tag}
                                    deletable={true}
                                    redirect={"/"}
                                />
                            ))}
                        </div>
                    ) : null}
                    <div className="relative mt-4">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => {
                                setTagInput(e.target.value)
                            }}
                            autoFocus={true}
                            onFocus={() => setTagSuggestionsEnabled(true)}
                            className="w-full py-1 rounded-sm mb-1 bg-white border border-gray-300"
                        ></input>
                        <button
                            onClick={() => {
                                if (data.tag) {
                                    post("/tags/watch", {
                                        preserveState: true,
                                    })
                                    setTagInput("")
                                    setData("tag", "")
                                }
                            }}
                            style={{
                                right: "0.5px",
                            }}
                            className="absolute p-1 rounded-r-sm bg-blue-500 border border-blue-500 text-white"
                        >
                            Add
                        </button>
                    </div>
                    <div
                        className={`w-full bg-white max-h-32 rounded shadow-lg overflow-y-scroll ${
                            !tagSuggestionsEnabled ? "hidden" : null
                        }`}
                        id="autoCompleteSuggestions"
                    >
                        {tagInput
                            ? tagSuggestions
                                  .filter((tag) =>
                                      tag["name"].includes(tagInput.trim())
                                  )
                                  .filter(
                                      (tag) =>
                                          !auth.watchedTags
                                              .map((item) => item.name)
                                              .includes(tag.name)
                                  )
                                  .map((tag, i) => (
                                      <div
                                          key={i}
                                          className=" hover:bg-gray-200 text-xs text-gray-600 px-3 py-3 cursor-pointer"
                                          onClick={() => {
                                              setTagInput(tag.name)
                                              setData("tag", tag)
                                              setTagSuggestionsEnabled(false)
                                          }}
                                      >
                                          {tag.name}
                                      </div>
                                  ))
                            : null}
                    </div>
                </div>
            )}
        </div>
    ) : null
}
