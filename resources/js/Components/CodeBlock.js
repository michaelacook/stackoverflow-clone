import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
    dark,
    //   funky,
    //   okaidia,
    //   twilight,
    //   coy,
    // solarizedlight,
    //   tomorrow,
} from "react-syntax-highlighter/dist/esm/styles/prism"

/*
Syntax themes: 
-default 
-dark
-funky
-okaidia
twilight
coy
solarizedlight 
tomorrow 
*/

export default function CodeBlock({ language, value }) {
    return (
        <SyntaxHighlighter language={language} style={dark}>
            {value}
        </SyntaxHighlighter>
    )
}
