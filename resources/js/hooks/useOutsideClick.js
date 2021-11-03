// I had help building this component, it is not my own original work

import React, { useRef, useState, useEffect } from "react"

export default function useOutsideClick({ initialValue }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(initialValue)

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)

        return () => {
            document.removeEventListener("click", handleClickOutside, true)
        }
    }, [ref])

    return { visible, setVisible, ref }
}
