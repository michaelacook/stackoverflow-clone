import React, { useState, useEffect } from "react"
import { useForm } from "@inertiajs/inertia-react"
import useOutsideClick from "@/hooks/useOutsideClick"
import Tag from "./Tag"

export default function IgnoredTagsWidget({ auth, className, tagSuggestions }) {
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
                <h3 className="text-gray-700 text-baseline">Ignored Tags</h3>

                {auth.ignoredTags.length ? (
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
                    {auth.ignoredTags.length ? (
                        <div className="flex flex-row flex-wrap">
                            {auth.ignoredTags.map((tag) => (
                                <Tag
                                    key={tag.id}
                                    className={`mb-1`}
                                    tag={tag}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full flex flex-row justify-center">
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
                                    ${
                                        !auth.user.email_verified_at
                                            ? "btn-disabled"
                                            : " hover:text-blue-800 hover:bg-blue-400"
                                    }
                                `}
                                disabled={
                                    !auth.user.email_verified_at ? true : false
                                }
                            >
                                Add an ignored tag
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div ref={ref} className="p-5">
                    {auth.ignoredTags.length ? (
                        <div className="flex flex-row flex-wrap">
                            {auth.ignoredTags.map((tag) => (
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
                                    post("/tags/ignore", {
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
                                          !auth.ignoredTags
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
