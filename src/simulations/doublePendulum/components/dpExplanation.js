import { useState} from "react"
import { MathJaxContext } from "better-react-mathjax";
import { SimulationQuirks } from "./simulationQuirks";
import { ThingsLeanred } from "./ThingsILeanred";
import { Motivation } from "./Motivation";
import { Derivation } from "./Derivation";

export const DoubPendExplanation = () => {
    const [isLightTheme, setTheme] = useState((localStorage.getItem("theme") === 'light') ? true : false);

    // We emit an event in the themeToggle component and listen to it here
    window.addEventListener('themeChanged', () => {
        setTheme((localStorage.getItem("theme") === 'light') ? true : false)
    })

    return (
    <MathJaxContext>
        <h1>An Elegant Double Pendulum</h1>
        A list of features this double pendulum simulation has:
        <ul>
            <li>Click and drag the pendulum</li>
            <li>Change mass, length, angle, gravity with sliders</li>
            <li>Show traces for each pendulum</li>
            <li>Reset the pendulum or graph</li>
            <li>Show a graph of the angles, speeds or energy</li>
            <li>Display kinetic and potential energy</li>
            <li>Share graph parameters</li>
            <li>Add friction to the system</li>
            <li>A smooth seamless experience between changes</li>
        </ul>
        <p className="sPText">
            The derivation is at the end or click here to go to the derivation. 
            {/* TODO: ADD LINK TO GO TO DERIVATION */}
        </p>
        <SimulationQuirks isLightTheme={isLightTheme} />
        <ThingsLeanred />
        <Motivation />
        <Derivation isLightTheme={isLightTheme} />
    </MathJaxContext>
    )
}

/**
 * Topics
 * -Features
 * -Explain derivation
 * -In another world. I wanted to implement a multiple system pendulum where u can add as many pendulumas as u want. more integration methods. say wanted to do more project instersad of staying on this one
 */