import { MathJax } from "better-react-mathjax";
import doubleDiagramLight from '../images/doubleDiagramLight.png'
import doubleDiagramDark from '../images/doubleDiagramDark.png'

export const Derivation = ({ isLightTheme }) => {
    return (
        <div>
            <h2>Derivation</h2>
            <p class='sPText'>
                I initially tried to do this derivation without using the Lagrangian. It's possible, however, the algebra 
                gets pretty complicated real quick. Thus, as any physicist would do, I decided to make use of the better tools 
                available to me and take a shortcut from the complicated algebra by using the Lagrangian. <br></br><br></br>
                We assume the usual list of items such as massless rods, point masses, and no air resistance. 
                We start with a basic diagram of the system:
                <img
                    className='simulationQuirkImages'
                    style={{ maxWidth: '30%' }}
                    src={isLightTheme ? doubleDiagramLight  : doubleDiagramDark}
                    alt="Example of graph with bad plotting"
                />
                Our coordinate system will be x positive to the right and y positive downwards. Angles will be measured 
                from the positive y axis in counter clockwise direction. From this diagram, we can obtain the equations 
                for each x and y coordinate:
                <MathJax>
                {`
                $$\\begin{align}
                    x_1 &= L_1 \\sin(\\theta_1) \\\\
                    y_1 &= L_1 \\cos(\\theta_1) \\\\
                    x_2 &= L_1 \\sin(\\theta_1) + L_2 \\sin(\\theta_2) \\\\
                    y_2 &= L_1 \\cos(\\theta_1) + L_2 \\cos(\\theta_2) 
                \\end{align}$$
                `}
                </MathJax>
                Taking derivatives of these:
                <MathJax>
                {`
                $$\\begin{align}
                    v_1 = \\dot{x_1} &= L_1 \\cos(\\theta_1) \\dot{\\theta_1} \\tag{1} \\\\
                    \\dot{y_1} &= -L_1 \\sin(\\theta_1) \\dot{\\theta_1} \\tag{1} \\\\
                    \\dot{x_2} &= L_1 \\cos(\\theta_1) \\dot{\\theta_1} + L_2 \\cos(\\theta_2) \\dot{\\theta_2}\\tag{3}  \\\\
                    \\dot{y_2} &= -L_1 \\sin(\\theta_1) \\dot{\\theta_1} - L_2 \\sin(\\theta_2) \\dot{\\theta_2}\\tag{4} 
                \\end{align}$$
                `}
                </MathJax>
                And another derivative for the acceleration
                <MathJax>
                {`
                $$\\begin{align}
                    a_1 = \\ddot{x_1} &= -L_1 \\sin(\\theta_1) \\ddot{\\theta_1} \\tag{5} \\\\
                    \\ddot{y_1} &= -L_1 \\cos(\\theta_1) \\ddot{\\theta_1} \\tag{6} \\\\
                    \\ddot{x_2} &= -L_1 \\sin(\\theta_1) \\ddot{\\theta_1} - L_2 \\sin(\\theta_2) \\ddot{\\theta_2}\\tag{7}  \\\\
                    \\ddot{y_2} &= -L_1 \\cos(\\theta_1) \\ddot{\\theta_1} - L_2 \\cos(\\theta_2) \\ddot{\\theta_2}\\tag{8} 
                \\end{align}$$
                `}
                </MathJax>
                These acceleration equations will be needed later on. For the Lagrangian, we need the potential and kinetic energy. 
                Starting with the potential energy. We assume that the pivot represents 0 potential energy.
                <MathJax>
                {`
                $$\\begin{align}
                    U &= m_1 g y_1 + m_2 g y_2 \\\\
                    &= m_1 g L_1 \\cos(\\theta_1) + m_2 g (L_1 \\cos(\\theta_1) + L_2 \\cos(\\theta_2) ) \\\\ 
                    &= L_1 g m_T \\cos( \\theta_1 ) + L_2 g m_2 \\cos(\\theta_2)
                \\end{align}$$
                `}
                </MathJax>
                Where <MathJax inline>{"\\( m_T = m_1 + m_2  \\)"}</MathJax>. Solving for the kinetic energy: 
                <MathJax>
                {`
                $$\\begin{align}
                    K &= \\frac{1}{2}m_1v_1^2 + \\frac{1}{2}m_2v_2^2  \\\\ 
                    &= \\frac{1}{2}m_1 (\\dot{x_1}^2 + \\dot{y_1}^2) + \\frac{1}{2}m_2 (\\dot{x_2}^2 + \\dot{y_2}^2) 
                \\end{align}$$
                `}
                </MathJax>
                Plugging in the appropriate equations from (1), (2), (3), and (4).
                <MathJax>
                {`
                $$\\begin{align}
                    K &= \\frac{1}{2}m_1v_1^2 + \\frac{1}{2}m_2v_2^2  \\\\ 
                    &= \\frac{1}{2}m_1 ((L_1 \\cos(\\theta_1) \\dot{\\theta_1})^2 + (-L_1 \\sin(\\theta_1) \\dot{\\theta_1})^2) \\\\
                    &+ \\frac{1}{2}m_2 ((L_1 \\cos(\\theta_1) \\dot{\\theta_1} \\\\
                    &+ L_2 \\cos(\\theta_2) \\dot{\\theta_2})^2 + (-L_1 \\sin(\\theta_1) \\dot{\\theta_1} - L_2 \\sin(\\theta_2) \\dot{\\theta_2})^2) \\\\
                    &= \\frac{1}{2}m_1 L_1^2 \\dot{\\theta_1}^2 + \\frac{1}{2}m_2 L_1^2 \\dot{\\theta_1}^2 + \\frac{1}{2}m_2 L_2^2 \\dot{\\theta_2}^2 \\\\
                    &+ m_2 L_1 L_2 \\dot{\\theta_1} \\dot{\\theta_2} (\\cos(\\theta_1)\\cos(\\theta_2) + \\sin(\\theta_1)\\sin(\\theta_2))\\\\
                    &= \\frac{1}{2} m_T L_1^2 \\dot{\\theta_1}^2 + \\frac{1}{2}m_2 L_2^2 \\dot{\\theta_2}^2 + m_2 L_1 L_2 \\dot{\\theta_1} \\dot{\\theta_2} \\cos(\\theta_1 - \\theta_2)
                \\end{align}$$
                `}
                </MathJax>
                In the last line, we use a trigonometry difference identity to simplify the equation. We will 
                make the following substistution <MathJax inline>{"\\( \\theta_1 - \\theta_2 = \\Delta \\theta \\)"}</MathJax> to 
                simplify the equations. The Lagrangian is:
                <MathJax>
                {`
                $$\\begin{align}
                    L &= T - U \\\\ 
                    &= \\frac{1}{2} m_T L_1^2 \\dot{\\theta_1}^2 + \\frac{1}{2}m_2 L_2^2 \\dot{\\theta_2}^2 + m_2 L_1 L_2 \\dot{\\theta_1} \\dot{\\theta_2} \\cos(\\Delta \\theta) \\\\
                    &- L_1 g m_T \\cos( \\theta_1 ) - L_2 g m_2 \\cos(\\theta_2)
                \\end{align}$$
                `}
                </MathJax>
                The Euler-Lagrange equations for <MathJax inline>{"\\( \\theta_1  \\)"}</MathJax> is:
                <MathJax>
                {`
                $$\\begin{align}
                    \\frac{ \\text{d} }{\\text{d} t} \\left (  \\frac{ \\partial L}{ \\partial  \\dot{\\theta_1} } \\right ) &= \\frac{ \\partial L}{ \\partial \\theta_1 }
                \\end{align}$$
                `}
                </MathJax>
                Focusing on the left side:
                <MathJax>
                {`
                $$\\begin{align}
                    \\frac{ \\text{d} }{\\text{d} t} \\left (  \\frac{ \\partial L}{ \\partial  \\dot{\\theta_1} } \\right ) &= \\frac{ \\text{d} }{\\text{d} t} \\left ( m_T L_1^2 \\dot{\\theta_1} + m_2 L_1 L_2 \\dot{\\theta_2} \\cos(\\Delta \\theta) \\right ) \\\\ 
                    &= m_T L_1^2 \\ddot{\\theta_1} + m_2 L_1 L_2 \\ddot{\\theta_2} \\cos(\\Delta \\theta) - m_2 L_1 L_2 \\dot{\\theta_2} \\sin(\\Delta \\theta) \\dot{\\theta_1} \\\\
                    &+ m_2 L_1 L_2 \\dot{\\theta_2^2} \\sin(\\Delta \\theta)  \\\\
                    &= m_T L_1^2 \\ddot{\\theta_1} + m_2 L_1 L_2 \\ddot{\\theta_2} \\cos(\\Delta \\theta) \\\\
                    &- m_2 L_1 L_2 \\dot{\\theta_2} \\sin(\\Delta \\theta) ( \\dot{\\theta_1} - \\dot{\\theta_2})
                \\end{align}$$
                `}
                </MathJax>
                Now the right side:
                <MathJax>
                {`
                $$\\begin{align}
                    \\frac{ \\partial L}{ \\partial \\theta_1 } &= -m_2 L_1 L_2 \\dot{\\theta_1} \\dot{\\theta_2} \\sin(\\Delta \\theta) + L_1 g m_T\\sin(\\theta_1)
                \\end{align}$$
                `}
                </MathJax>
                Setting them both equal to each other:
                <MathJax>
                {`
                $$\\begin{align}
                    & m_T L_1^2 \\ddot{\\theta_1} + m_2 L_1 L_2 \\ddot{\\theta_2} \\cos(\\Delta \\theta) \\\\
                    &- m_2 L_1 L_2 \\dot{\\theta_2} \\sin(\\Delta \\theta) ( \\dot{\\theta_1} - \\dot{\\theta_2}) \\\\ 
                     &= -m_2 L_1 L_2 \\dot{\\theta_1} \\dot{\\theta_2} \\sin(\\Delta \\theta) + L_1 g m_T\\sin(\\theta_1) \\\\
                     0 &= m_T L_1^2 \\ddot{\\theta_1} + m_2 L_1 L_2 \\ddot{\\theta_2} \\cos(\\Delta \\theta) \\\\
                     &+ m_2 L_1 L_2 \\dot{\\theta_2^2} \\sin(\\Delta \\theta)- L_1 g m_T\\sin(\\theta_1) \\tag{9}
                \\end{align}$$
                `}
                </MathJax>
                We repeat the same process for <MathJax inline>{"\\( \\theta_2 \\)"}</MathJax> with the Euler-Lagrange 
                equations and we get:
                <MathJax>
                {`
                $$\\begin{align}
                     0 &= L_2 \\ddot{\\theta_2} + L_1\\ddot{\\theta_1} \\cos(\\Delta \\theta) \\\\
                     &- L_1 \\dot{\\theta_1}^2 \\sin(\\Delta \\theta) - g\\sin(\\theta_2) \\tag{10}
                \\end{align}$$
                `}
                </MathJax>
                At this point, we have two equations and two unknowns: <MathJax inline>{"\\( \\ddot{\\theta_1}, \\ \\ddot{\\theta_2} \\)"}</MathJax>. 
                Thus, we can start solving for them. This part isn't pretty. Let us solve for <MathJax inline>{"\\( \\ddot{\\theta_2} \\)"}</MathJax>. 
                First we need to rearrange Equation (9):
                <MathJax>
                {`
                $$\\begin{align}
                     \\ddot{\\theta_1} &= \\frac{1}{-m_T L_1^2 } (m_2 L_1 L_2 \\ddot{\\theta_2} \\cos(\\Delta \\theta) \\\\
                     &+ m_2 L_1 L_2 \\dot{\\theta_2^2} \\sin(\\Delta \\theta)  - L_1 g m_T\\sin(\\theta_1)) \\tag{11}
                \\end{align}$$
                `}
                </MathJax>
                Plug Equation (11) into Equation (10):
                <MathJax>
                {`
                $$\\begin{align}
                     0 &= L_2 \\ddot{\\theta_2} + L_1 \\cos(\\Delta \\theta) \\frac{1}{-m_T L_1^2 } [m_2 L_1 L_2 \\ddot{\\theta_2} \\cos(\\Delta \\theta) \\\\
                     &+ m_2 L_1 L_2 \\dot{\\theta_2^2} \\sin(\\Delta \\theta) - L_1 g m_T\\sin(\\theta_1)] \\\\
                     &- L_1 \\dot{\\theta_1}^2 \\sin(\\Delta \\theta)- g\\sin(\\theta_2) \\tag{10}
                \\end{align}$$
                `}
                </MathJax>
                Rearrange to obtain an equation for <MathJax inline>{"\\( \\ddot{ \\theta_2 } \\)"}</MathJax>:
                <MathJax>
                {`
                $$\\begin{align}
                     0 &= L_2 \\ddot{\\theta_2} - \\frac{m_2 L_2 \\ddot{\\theta_2} \\cos^2(\\Delta \\theta)}{m_T} \\\\
                     &- \\frac{m_2 L_2 \\dot{\\theta_2^2} \\sin(\\Delta \\theta) \\cos(\\Delta \\theta)}{m_T} + g\\sin(\\theta_1)\\cos( \\Delta \\theta ) \\\\
                     &- L_1 \\dot{\\theta_1}^2 \\sin(\\Delta \\theta) - g\\sin(\\theta_2) \\\\ 
                    m_2 L_2 \\ddot{\\theta_2} \\cos^2(\\Delta \\theta) - L_2 m_T \\ddot{\\theta_2} &= -m_2 L_2 \\dot{\\theta_2^2} \\sin(\\Delta \\theta) \\cos(\\Delta \\theta) + g m_T \\sin(\\theta_1)\\cos( \\Delta \\theta ) \\\\
                     &- L_1 m_T \\dot{\\theta_1}^2 \\sin(\\Delta \\theta) - g m_T \\sin(\\theta_2) \\\\ 
                     \\ddot{\\theta_2} \\left (  m_2 L_2 \\cos^2(\\Delta \\theta) - L_2 m_T  \\right) &= -m_2 L_2 \\dot{\\theta_2^2} \\sin(\\Delta \\theta) \\cos(\\Delta \\theta) + g m_T \\sin(\\theta_1)\\cos( \\Delta \\theta ) \\\\
                     &- L_1 m_T \\dot{\\theta_1}^2 \\sin(\\Delta \\theta) - g m_T \\sin(\\theta_2) \\\\ 
                     \\ddot{\\theta_2} &= \\left (  m_2 L_2 \\cos^2(\\Delta \\theta) - L_2 m_T  \\right)^{-1} (-m_2 L_2 \\dot{\\theta_2^2} \\sin(\\Delta \\theta) \\cos(\\Delta \\theta) \\\\ 
                     &+ g m_T \\sin(\\theta_1)\\cos( \\Delta \\theta ) - L_1 m_T \\dot{\\theta_1^2} \\sin(\\Delta \\theta) - g m_T \\sin(\\theta_2)) \\\\ 
                \\end{align}$$
                `}
                </MathJax>
                We can repeat this for <MathJax inline>{"\\( \\ddot{ \\theta_1 } \\)"}</MathJax>: 
                <MathJax>
                {`
                $$\\begin{align}
                     \\ddot{\\theta_1} &= \\left (  m_2 L_1 \\cos^2(\\Delta \\theta) - L_1 m_T  \\right)^{-1} (m_2 L_1 \\dot{\\theta_1^2} \\sin(\\Delta \\theta) \\cos(\\Delta \\theta) \\\\
                     &+ m_2 g \\sin(\\theta_2) \\cos(\\Delta \\theta) + m_2 L_2 \\dot{\\theta_2^2} \\sin( \\Delta \\theta ) - m_T g \\sin(\\theta_1) )
                \\end{align}$$
                `}
                </MathJax>
                And there we have it. Two coupled second order ordinary differential equations to describe the motion of each pendulum in the system. 
                To solve this, we make use of Runge-Kutta 4 and make a change of variables to convert this into a first order ODE. 
                These equations can be simplified further, but for the purposes of this simulation, this is good enough. Ideally, on 
                an assignment, I would've simplified even further. 
            </p>
        </div>
    )
}