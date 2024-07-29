import { MathJax, MathJaxContext } from "better-react-mathjax";
import fbdLight from './images/fbdSimplePendulumLight.png'
import fbdDark from './images/fbdSimplePendulumDark.png'
import { useState } from "react";

// File for explanation for simple pendulum. Code contains latex which is displayed on FE
export const SimePendExplanation = () => {
    const [isLightTheme, setTheme] = useState((localStorage.getItem("theme") === 'light') ? true : false);

    // We emit an event in the themeToggle component and listen to it here
    window.addEventListener('themeChanged', () => {
        const theme = localStorage.getItem("theme");
        setTheme((theme === 'light') ? true : false)
    })

    return (
        <MathJaxContext>
        <h1>A Simple Single Pendulum</h1>
        {/* Physics Explanation */}
        <p className="sPText">Our goal here was to recreate a simple pendulum using elementary physics principles. 
            We start by drawing the free body diagram for the pendulum:
        </p>
        {/* Reactively shown the correct image for the theme */}
        <img
          className='centerImage'
          src={isLightTheme ? fbdLight  : fbdDark}
          alt="Free body diagram of pendulum"
        />
        <p className="sPText">
          From this free body diagram, we can derive the following equations:
        </p>
        <MathJax>{"\\[ F=ma  \\]"}</MathJax>
        <MathJax>{"\\[ -mg \\sin(\\theta) = ma  \\]"}</MathJax>
        {/* TODO: Fix this messed up text formatting */}
        <MathJax hideUntilTypeset={"first"}>
          {`Here, we need to apply a change of variables as we have two different variables for the position
          on each side of the equation. We can replace acceleration with \\(L \\alpha \\) where \\( \\alpha \\) represents the
          angular acceleration. Thus, we have:
          \\[ -mg \\sin(\\theta) = mL \\alpha \\]`}
        </MathJax>
        <MathJax>{"\\[ -g \\sin(\\theta) = L \\alpha  \\]"}</MathJax>
        <p className="sPText">
          Now, we will represent this in differential form so that we have a solvable equation:
        </p>
        <MathJax>{
          `
          $$\\begin{aligned}
            -g \\sin(\\theta) &= L \\frac{\\text{d}^2 \\theta}{\\text{d} t^2} \\\\ 
            \\frac{\\text{d}^2 \\theta}{\\text{d} t^2}  + \\omega^2 \\sin(\\theta) &= 0 \\\\
          \\end{aligned}$$`  
        }
        </MathJax>
        <p className="sPText">
          Here we define <MathJax inline>{"\\( \\omega = \\sqrt{\\frac{g}{L}} \\)"}</MathJax> as is done when solving equations
          of these sorts. We run into a small issue when trying to find a solution for this differential equation which is that
          it cannot be analytically solved. We can apply various numerical integration methods to obtain a solution for this
          but for the purposes of this simple simulation, we decided to use the small angle approximation. In this approximation, 
          we assume that <MathJax inline>{"\\( \\sin (\\theta) \\approx \\theta  \\)"}</MathJax>. Thus, we get:
        </p>
        <MathJax>{
          `
          $$\\begin{aligned}
            \\frac{\\text{d}^2 \\theta}{\\text{d} t^2}  + \\omega^2 \\theta &= 0 \\\\
          \\end{aligned}$$`  
        }
        </MathJax>
        <p className="sPText">
          This equation is now solvable, and the solution to it is given below:
        </p>
        <MathJax>{
          `
          $$\\begin{aligned}
            \\theta (t) &= \\theta _0 \\cos (\\omega t) \\\\
          \\end{aligned}$$`  
        }
        </MathJax>
        <p className="sPText">
          We make use of this equation in our simulation. The initial angle is a result of solving the differential and we set 
          it to 20 degrees. We do not use real world time as the animation would be too slow, rather we multiply the time by
          some factor to help speed up the animations.
        </p>
        {/* Simulation Quirks */}
        <h2>
          Simulation Quirks
        </h2>
        <p className="sPText">
          Aside from the actual physics involved, there are a few tricks we need to use while calculating the position
          of the pendulum. These quirks help us display a smooth and beautiful animation to the user while keeping the 
          math simple in the backend. 
        </p>
        {/* Phase Angle Offset */}
        <h3>
          Phase Angle Offset
        </h3>
        <p className="sPText">
          When changing the gravity, the <MathJax inline>{"\\( \\omega \\)"}</MathJax> term also changes as it depends on gravity.
          This means that the overall function is different and thus, the position at the same time will be different. The pendulum
          will just teleport to the new position which does not look visually appealing. <br></br>
          How do we combat this? We applied a phase angle to our solution:
        </p>
        <MathJax>{
          `
          $$\\begin{aligned}
            \\theta (t) &= \\theta _0 \\cos (\\omega t + \\phi) \\\\
          \\end{aligned}$$`  
        }
        </MathJax>
        <p className="sPText">
          The phase angle allows us to shift the wavefunction as we desire. This means that once we change the gravity, we can 
          calculate the phase shift by setting the old cosine equal to the new one and solve for the new phase shift in the new 
          cosine function. This allows for a really smooth transition while changing gravity.  
        </p>
         {/* Things we wanted to do differently */}
         <h2>
          In Another World
        </h2>
        <p className="sPText">
          As this was our first crack at a web based simulation, we did things that seemed to be the most straight forward. However, 
          in hindsight, we realize that there are a lot of things that we could've done differently to allow for more features for the user
          and faster calculations in the backend. For example, to obtain the position of the pendulum, we just made use of the equation
          of motion with the small angle approximations. This is fine but it limits what we can do. <br></br>
          For example, we wanted to allow the user to be able to drag the pendulum anywhere and flick it to any speed they like.
          This cannot be achieved with our current setup. To achieve this, we would need to also make use of energy conservation
          and calculate the initial speed of the pendulum based on how fast the user moves it. It was a level of complexity that
          we expect to overcome in our double pendulum simulation. <br></br><br></br>
          Also, another thing we would like to implement is some form of numerical integration instead of using the small angle 
          approximation. Although it works just fine and the difference wouldn't be noticeable, it would still be nice to be 
          able to implement it in a more rigorous way. We will have to make use of numerical integration in our double pendulum 
          simulation. 
        </p>
        {/* Motivations*/}
        <h2>
          Motivations
        </h2>
        <p className="sPText">
          This was our first simulation. Simple yet elegant. Our main motivation behind this simulation was to learn how Pixi.JS works 
          and how we can use it to create physics simulations. It wasn't meant to be complicated. We could've added plenty of options
          and customizations but we wanted to keep it simple. This simulation led the way for all our future simulations as it allowed
          us to learn what we might need to do differently. For example, our project structure, how we split up work and communicate with each other,
          or even how we implement different equations in our calculations. <br></br>
          This first simulation was extremely fun to make as we spent our time figuring out something new and learning many things along the way. 
          The future simulations will hopefully be a bit more complicated and showcase the magic of Physics as we intend to.
        </p>
        </MathJaxContext>
    )
}