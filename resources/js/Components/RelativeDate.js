import React from "react"
import moment from "moment"

/**
 * The purpose of this component is to format a UTC timestamp into a string usable by momentjs
 * 
 * @param {String} 
 */
export default function RelativeDate({ UTCTime }) {
    return moment(new Date(UTCTime), "YYYYMMDD").fromNow()
}