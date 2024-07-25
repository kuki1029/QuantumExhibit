import { useState} from "react"
import { MathJax, MathJaxContext } from "better-react-mathjax";

export const DoubPendExplanation = () => {
    const [isLightTheme, setTheme] = useState((localStorage.getItem("theme") === 'light') ? true : false);

    // We emit an event in the themeToggle component and listen to it here
    window.addEventListener('themeChanged', () => {
        setTheme((localStorage.getItem("theme") === 'light') ? true : false)
    })

    return (
        <MathJaxContext>
        <h1>An Elegant Double Pendulum</h1>

        </MathJaxContext>
    )
}

/**
 * Topics
 * -Features
 * -Explain derivation
 * -Quriks explained: Damping easy way. Graph plotting, using multiple traces. 
 * -Things learned: Blocking code or async code like the while loop that blocked th. More into JS closures. Class organization for 
 * diff solvers and testing code. Organizing react components. Global state instead of using redux. Calling funs with string for query params
 * -Motivations: Extension of simp Pend. Wanted to introduce level of detph with changing parameters.
 * -In another world. I wanted to implement a multiple system pendulum where u can add as many pendulumas as u want. more integration methods. say wanted to do more project
 */