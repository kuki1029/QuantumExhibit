export const Motivation = () => {
    return (
        <div>
            {/* Motivations */}
            <h2>
                Motivations
            </h2>
            <p className="sPText">
                The goal behind this project was to extend the simple pendulum. I wanted to achieve a greater depth 
                with the simulation by letting users interact with the parameters of the pendulum and also visualize 
                the movement of the pendulum with graphs. I knew I would learn a lot with this simulation not just 
                with the physics, but also in regards to simulating such equations for people to understand in an easier manner. 
                The simple pendulum was great but it was too simple. There just wasn't much going on in terms of code and 
                things to do. I didn't feel satisfied enough to stop with the pendulums. With this simulation, I feel satisfied 
                that I can move on to another area of physics. 
            </p>    

            {/* In another world */}
            <h2>
                In Another World
            </h2>
            <p className="sPText">
                Although I feel satisfied with this simulation, I still have ambitious plans for what more I could implement. 
                One of my original ideas was to have an arbitrary number of pendulums in the system. This simulation would 
                allow users to add as many pendulums as they wanted and it would output a perfect simulation. Instead of a single 
                equation for the motion, I'd have to think of another method. And frankly, I don't know what the solution to that 
                would look like. My initial plans included modelling the rods with tiny springs and calculating the force at 
                each point. Based on the forces, I would then derive the motion. Easier said than done. I hope one day I can 
                sit down and really think about a solution to this. That would be a masterpiece in my book of simulations. 
            </p>  
        </div>
    )
}