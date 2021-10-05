import React from "react"
import moment from "moment"

/**
 * The purpose of this component is to format a PHP datetime into a string usable by momentjs
 * 
 * @param {String} 
 */
export default function RelativeDate({ phpDateTime }) {
    return moment(
        phpDateTime
            .split("T")[0]
            .split("-")
            .join(""),
        "YYYYMMDD"
    )
    .fromNow();
}