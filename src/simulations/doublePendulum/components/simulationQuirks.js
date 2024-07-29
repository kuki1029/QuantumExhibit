import { MathJax } from "better-react-mathjax";
import graphExampleLight from '../images/graphExampleLight.png'
import graphExampleDark from '../images/graphExampleDark.png'

export const SimulationQuirks = ({ isLightTheme }) => {
    return (
        <div>
        {/* Simulation Quirks */}
        <h2>
            Simulation Quirks
        </h2>
        <p className="sPText">
          This simulation was a lot more involved than the simple pendulum simulation. The components like the graphs,
          the sliders, the extra math, and even the share button were all new things that I got to learn and implement. Here
          are few of the things that I implemented in my own unique ways:
        </p>
        {/* Damping */}
        <h4>
          Damping (sort of...)
        </h4>
        <p className="sPText">
            What do I mean by damping? Damping is just some sort of friction or resistance to slow down the pendula 
            over time to mimic a real world double pendulum. One could add air resistance or some arbitary applied force.
            So why didn't I? This makes the already complicated problem into an even more complicated one but still a solvable one. 
            Well, if it is solvable, why didn't I just solve that. The main reason I chose not to solve it directly is because
            it would just take me too long and would be an even lengthier derivation. However, I found a simple workaround for this problem. <br></br><br></br>
            The first method I tried was multiplying each iteration of the numerical integration by a coefficient close to 1
            such as 0.999. This would make it so that each iterationw ould slowly decrease and slow down the pendula. This worked
            for small angles, however, it introduced some very eratic behaviour at larger angles or speeds. The pendula would
            just stop at random angles and move in random directions. This should've been obvious because multiplying each 
            iteration by a fixed constant ruins the whole point of the numerical method (Runge-Kutta 4). <br></br><br></br>
            Then I thought of just subtracting some amount from the speed of each pendula after integration. Again, led to eratic behaviour
            which didn't make sense and didn't relate to what one would expect from a real world double pendulum. <br></br><br></br>
            The solution to this problem was to modify the equations for the acceleration. I added a subtractive term to the <MathJax inline>{"\\( \\ddot{\\theta} \\)"}</MathJax> 
            calculations in the form of <MathJax inline>{"\\( -a \\omega \\)"}</MathJax>. Where <MathJax inline>{"\\( a  \\)"}</MathJax> is 
            some arbitrary constant. This was added to both the equations for <MathJax inline>{"\\( \\ddot{\\theta} \\)"}</MathJax>.
            In this case, the subtraction from the speed was done before any integration and this led to very realistic
            damping of the system. The important factor that I was missing all along was scaling the subtractive term. 
            In my previous attempts, I simply multiplied by a fixed amount or subtracted a fixed amount which wouldn't scale
            with the magnitude of the values and thus led to eratic behaviour. 
        </p>
        {/* Graph Plotting */}
        <h4>
          Plotly Graphs
        </h4>
        <p className="sPText">
            Plotting sounds relatively simple. Make a few grid lines, axis marks, add a scale, and just draw lines
            based on the input points. Right? Well, not quite. With any rotational system, you can have angles 
            that are greater than <MathJax inline>{"\\( 2\\pi \\)"}</MathJax> or less than 0. These angles still 
            relate to values within that range and it doesn't make a difference in the math but it does make a 
            difference when graphing. <br></br><br></br>
            If I just graphed the values directly, it would make no sense. There would be extremely high angle values
            or really negative values. The graph would just keep on going with no relation to other lines. This was an 
            easy fix, just find the modulous and make sure the angles are in the required domain. <br></br><br></br>
            The more complicated problem came when passing this data into PlotlyJS. Lets say the value to plot was 
            <MathJax inline>{"\\( (\\pi, 3\\pi) \\)"}</MathJax>. The second value is outside our domain so we find the equivalent angle and get 
            <MathJax inline>{"\\( \\pi \\)"}</MathJax>. When plotting this new value in Plotly, we got this weird behvaiour:
            <img
                className='simulationQuirkImages'
                style={{ maxWidth: '40%' }}
                src={isLightTheme ? graphExampleLight  : graphExampleDark}
                alt="Example of graph with bad plotting"
            />
            The way Plotly works is that it connects the dots no matter where it is. This creates these straight lines
            that go from one end to another when we fix the domain. This obviously isn't ideal and doesn't look great. 
            At first, I was just going to make the plot with markers instead of lines and that would simplify my life. I could 
            just skip this problem, but that was not what I had in mind for this. <br></br><br></br>
            To fix this, I had to add a new trace to the plot everytime I had to fix the domain. This means that instead of 
            just having one data array, I had multiple each time there would be a jump in the values. Every line you see on the 
            plot, is an individual array full of points. It sounds relatively simple now but took me a day or two of brainstorming 
            and playing around with the Plotly library. I definetely learned a lot about the library and coming up with unique solutions. 
        </p>
        {/* Checking Accuracy */}
        <h4>
          Accuracy
        </h4>
        <p className="sPText">
            After I finished the simulation, I thought to myself: How do I know if it's right? Anyone can make
            two pendula move in a sort of convincing way and call it a double pendulum simulation. How could I 
            actually be sure that my simulation is actually correct? <br></br><br></br>
            First was to compare with other simulations. I found a few simulations online and compared them to my 
            simulation. But it was hard. I had to follow two different systems, set the initial conditions to be the same,
            and see if they followed the same pattern. But man, it ain't easy following 4 pendula and seeing if they 
            move the same. I wanted a more rigorous way of checking if the simulation was correct. For this, I turned to 
            energy. I calculated the energy of the system. If this simulation was correct, the total energy should stay constant.
            Otherwise I'd be violating one of the fundamental laws of the universe. <br></br><br></br>
            Calculating the energy was quite simple. Just a combination of kinetic and potential energy. Both values we calculated
            in the derivation of the equations of motion. And thankfully, the energy was constant. This was a relief. One concern I 
            had was about the pivot. If the pivot is applying a force on the system, and it doesn't move, wouldn't that affect 
            the total energy of the system? The simple answer to this is that although the pivot does apply 
            a force on the system, there is no work done by the pivot as it doesn't move in the direction of the force. 
            This means that there are no energy effects due to the pivot. 
        </p>
        </div>
    )
}