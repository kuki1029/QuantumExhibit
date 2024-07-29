export const ThingsLeanred = () => {
    return (
        <div>
        {/* Things I learned */}
        <h2>
            Things I learned
        </h2>
            <p className="sPText">
            Every project I do, I learn something new. Otherwise I probably woulnd't do it. I got to learn a lot of 
            new things on this project, specifically React and JavaScript related. In the physics department, I mainly 
            just refreshed my memory on the Lagrangian and some algebra. 
            </p>
        {/* Asyn */}
        <h4>
          Async and Non-Blocking Code
        </h4>
        <p className="sPText">
        This project has a main ticker in the background that constantly updates the pendulums positions and 
        creates the animation. Any blocking to that ticker is very apparent in the frontend and ruins the user 
        experience. I had to be very careful to not do any synchronous processing of large arrays that would block the ticker. 
        For example, when preparing the data for the graph, I created the loops without any async functions. This led to 
        weird behaviour with the pendula where it would randomly stop and start or it wouldn't register any inputs. After 
        a lot of testing, I realized that my loops were blocking the ticker. <br></br><br></br>
        The fix here is simple. Just use promies and wait for the operations to finish and then do any plotting. There were 
        many other instances of this but fixes are usually quite simple. The more important thing here was that I was 
        more mindful of promises and async code. As my background didn't start with JavaScript, this felt a bit unusual 
        but I quickly realized that promises themselves are quite powerful. 
        </p>
        {/* JS Closures */}
        <h4>
          JavaScript Closures & useRef
        </h4>
        <p className="sPText">
            I've heard about closures before but I never quite understood them. I only read the theory but never 
            saw the use for it or rather the bugs that could arise from it. For the plotting, I made use of setInterval,
            which would poll for data every so often. I would pass a function to setInterval and it would call it as needed. 
            Quite simple right? Well, I realized that the data was there when I logged it but it wouldn't show up 
            in the graph. How could it be possible that data was being added to the variable, but it wouldn't show up on the graph 
            even though it was the SAME variable! <br></br><br></br>
            This made no sense to me. I spent days just logging the data, googling, looking through StackOverFlow
            trying to figure out why the two variables weren't consistent. It baffled me to what could be going on. 
            And then I somehow fumbled upon the topic of closures. As I looked more into it, I realized this was my exact problem. <br></br><br></br>
            I was passing a function to setInterval and it only had access to the current state of the variable. 
            It has no reference to the variable passed to it. It was simply updating its local reference of the variable. 
            I didn't realize this because I was logging the local reference. <br></br><br></br>
            So how did I fix this in React? I utilized the useRef hook. I set the current value of the ref to the 
            function on every render. This meant that the function stored in the current value was being updated 
            on every render. I then passed this ref into the setInterval as a function call. Thus, after all this, 
            every time setInterval callbacked the function, it would call on the ref, which stored the updated version 
            of all the state variables and updated the right values. <br></br><br></br>
            Another thing I learned was how to properly copy objects that had arrays in them. Just setting the object 
            equal to another object did copy it but the arrays within the objects were references to the orignial arrays. 
            To deal with this, I made use of the JSON methods such as stringify and parse. 
        </p>
        {/* Organizing */}
        <h4>
          Better Organization
        </h4>
        <p className="sPText">
            As I was working on this simulations, the codebase got large pretty quickly. There were just so many 
            components were needed. Not only for the front end but also all the calculations in the back end. There 
            was a lot of repeated code in the differential solvers I created, and the slider components. For the 
            different differential solvers, I decided to extract the logic and create a seperate class so that I could 
            use it for other simulations. I created a base solver class and each unique numerical integration method would 
            extend from this class. All of them needed similar methods anyway. <br></br><br></br>
            Another layer of organizaitons was seperating all the front end code into their own components just like 
            React suggests. This allowed me to remove a lot of repeated code and simplify the code base. Also made it 
            easier to read through. There were some parts of the code I couldn't really split up such as the animation class. 
            This one has a lot of methods that needed access to various variables and splitting it up just didn't make sense.
        </p>
        {/* Query Params*/}
        <h4>
          Query Params
        </h4>
        <p className="sPText">
            This one was a fun one. To create the share button, I embedded all the various parameters into the query 
            parameters. This would remove the need for any backend storage. To obtain the values from the URL, I could 
            simply just write out each parameter and get its value and then set it in the appropriate areas. This was fine 
            as there are only a set amount of parameters. However, as I was doing this, I realized that there must be a better way. 
            There is no way I have to do each variable individually. That just isn't the spirit of coding. <br></br><br></br>
            So I started to google and look at different techniques I might be able to use. I quickly realized that JavaScript 
            allows me to get all the methods in a classs and also call functions using square brackets. I started to see a few 
            different ways I could acheive what I wanted with a few loops. First, I standardized the naming for the variables. 
            Each variable has an appropriate setter and getter method in the animation class. Now, all I had to do was get 
            a list of all the parameters, join the word 'Get' to the start of the variable, and call the method in the class. 
            This made it super simple to set all the parameters and even support more parameters if I added them in the future. 
            Now I felt like I had properly achieved the share button functionality. 
        </p>
        {/* What more I could have learned */}
        <h4>
          Diving Deeper
        </h4>
        <p className="sPText">
            Throughout building this application, I had the choice to learn a few more libraries or hooks. However, 
            I didn't. I made this choice because I didn't want to introduce a lot of dependencies to this project. Why? 
            Simply because I wanted the focus to be the physics and the simulation. Not the advanced React functionality. 
            That is for my other projects. For example, implementing some sort of global state like Redux would've been 
            really helpful. I had to get data from a class object for each component of the slider. I simply passed the pendulum 
            class to each component to achieve this. However, this would've been much cleaner using Redux. 
        </p>
        </div>
    )
}