import { Screen, SimColors } from "../../constants.js";
import { Graphics } from 'pixi.js';
import DoublePendulumData from './dpCalculation.js'
import { Application } from 'pixi.js';

// Constants for animation
const pivotSize = 20;
// const defaultLength = 200;
const defaultMass = 1;
const pendulumSize = 10;
const animationSpeed = 100;
const scaling = 100

/** Class creates the application for Pixi.JS and helper
 * functions to do all the drawing for it.
*/
export default class DoublePendulumAnimation { 
    /**
     * Initializes the application for Pixi.JS
     * @param {Renderer} app - Pixi.JS renderer
     * @param {number} originX - The origin for x values. All objects will be drawn from here
     * @param {number} originY - The origin for y values. All objects will be drawn from here
     * @param {number} defaultLen1 - Length from pivot to first pendulum
     * @param {number} defaultLen2 - Length from first pendulum to second pendulum
     */
    constructor(app, originX, originY, defaultLen1, defaultLen2) {
        // totalTime used to update the animation
        this.totalTime = 0;

        // Set intial colors based on users theme
        const theme = localStorage.getItem("theme")
        this.pivotColor = (theme === 'light') ? SimColors.black : SimColors.white;
        this.pendulumColor = (theme === 'light') ? SimColors.blue : SimColors.red;
        this.backgroundColor = (theme === 'light') ? SimColors.bgLight : SimColors.bgDark;
        this.ropeColor = this.pivotColor;
        this.len1 = defaultLen1 * scaling
        this.len2 = defaultLen2 * scaling
        this.pend = new DoublePendulumData(2, 0, defaultLen1, defaultLen2);
    }

    /**
     * Draws pivot. Draws it at the origin point
     */
    drawPivot() {
        // Need to calculate the coordinates of the upper left of rectangle as Pixi draws it from upper
        // left corner
        const upperLeftX = this.originX - pivotSize/ 2
        const upperLeftY = this.originY - pivotSize/2
        this.pivot.rect(upperLeftX, upperLeftY, pivotSize, pivotSize);
        this.pivot.fill(this.pivotColor);
    }

    /**
     * Draws ropes. Draws the first rope from the origin to first pendulum/
     * Second rope is drawn from the first pendulum to second pendulum
     * @param {number} x1 - X coordinate of first pendulum
     * @param {number} y1 - Y coordinate of first pendulum
     * @param {number} x2 - X coordinate of second pendulum
     * @param {number} y2 - Y coordinate of second pendulum
     */
    drawRopes(x1, y1, x2, y2) {
        this.rope1.moveTo(this.originX, this.originY);
        this.rope1.lineTo(this.originX + x1, this.originY + y1); 
        this.rope1.stroke({ width: 2, color: this.ropeColor });

        this.rope2.moveTo(this.originX + x1, this.originY + y1);
        this.rope2.lineTo(this.originX + x1 + x2, this.originY + y1 + y2); 
        this.rope2.stroke({ width: 2, color: this.ropeColor });


    }

     /**
     * Draws the 2 pendula. All coordinates 
     * are relative to the origin. We set the zero point for the pendulum here as the origin
     */
    drawPendulums() {
        this.pendulum1.circle(this.originX, this.originY, pendulumSize)
        this.pendulum1.fill(this.pendulumColor)

        this.pendulum2.circle(this.originX, this.originY, pendulumSize)
        this.pendulum2.fill("#ffffff")
    }

    /**
     * Adds a ticker to the app instance of Pixi.Js. Runs every frame to 
     * help with animation. All animation is handled in here
     */
    animatePendulumRope() {
        // Runs on each render loop. Used to animate
        this.app.ticker.add(() => {
            this.totalTime += this.app.ticker.elapsedMS / animationSpeed;
            // X, and y are switched as the angle is defind relative to y not x
            // as it usually is for polar to cartesian conversions
            this.pend.calculateNextPos()
            const { x: x1, y: y1 } = this.pend.getPos1(this.totalTime)
            const { x: x2, y: y2 } = this.pend.getPos2(this.totalTime)
            // Animate the pendulum
            this.pendulum1.x = x1 * scaling
            this.pendulum1.y = y1 * scaling
            this.pendulum2.x = x2 * scaling + x1 * scaling
            this.pendulum2.y = y2 * scaling + y1 * scaling
            // Animate rope
            this.rope1.clear();
            this.rope2.clear();
            this.drawRopes(x1 * scaling, scaling * y1, scaling * x2, scaling * y2)
            this.secondTrace.lineTo(this.originX + x1 + x2, this.originY + y1 + y2).stroke({ width: 2, color: this.ropeColor })

        });
    }   

    /**
     * Colors for simulation. If not light, assume dark
     * We emit an event in the themeToggle component and listen to it here
     * Whenever theme changes, we update our colors and redraw shapes
     */
    updateColors() {
        // Colors for simulation. If not light, assume dark
        // We emit an event in the themeToggle component and listen to it here
        // Whenever theme changes, we update our colors and redraw shapes
        window.addEventListener('themeChanged', () => {
            if (localStorage.getItem("theme") === 'light') {
                this.pivotColor = SimColors.black;
                this.pendulumColor = SimColors.blue;
                this.backgroundColor = SimColors.bgLight; 
                this.ropeColor = this.pivotColor;
            } else {
                this.pivotColor = SimColors.white;
                this.pendulumColor = SimColors.red;
                this.backgroundColor = SimColors.bgDark;
                this.ropeColor = this.pivotColor;
            }
            this.drawPendulums()
            this.drawPivot()
            this.app.renderer.background.color = this.backgroundColor;
        })
    }

    /**
     * Initialize all the graphics objects and adds to stage
     */
    initObjectsToStage() {
        // Initialize all graphics instances
        this.pendulum1 = new Graphics()
        this.pendulum2 = new Graphics()
        this.rope1 = new Graphics()
        this.rope2 = new Graphics()
        this.pivot = new Graphics()
        this.secondTrace = new Graphics()
        this.app.stage.addChild(this.pivot)
        this.app.stage.addChild(this.rope1)
        this.app.stage.addChild(this.rope2)
        this.app.stage.addChild(this.pendulum1)
        this.app.stage.addChild(this.pendulum2)
        this.app.stage.addChild(this.secondTrace)
    }

    /**
     * Initialize all the main components for Pixi.js including the app
     * Starts the animation and creates listeners for theme changes to update colors.
     * Also, creates all graphics objects and adds to stage.
     */
    async initPixi(originX, originY) {
        this.app = new Application();

        this.originX = originX
        this.originY = originY
        await this.app.init({ background: this.backgroundColor, width: Screen.width, 
            height: Screen.height, antialias: true });
        // Set colors to be reactive to theme changes
        
        this.updateColors();
        // Run animation
        this.animatePendulumRope()
        this.initObjectsToStage()
        this.drawPivot()
        this.drawPendulums()
        this.drawRopes(0, this.len1, 0, this.len2)
        const { x, y } = this.pend.getPos2()
        this.secondTrace.moveTo(x,y).stroke({ width: 2, color: this.ropeColor})
        console.log("SS")
        return this.app
    }

    /**
     * Changes the gravity for the pendulum. 
     * @param {number} newGrav - New gravity value in m/s^2
     */
    setGravity(newGrav) {
        this.pend.setGravity(newGrav, this.totalTime)
    }

    /**
     * Changes the length for the pendulum. 
     * @param {number} newLen - New length value in m
     */
    setLength(newLen) {
        this.pend.setLength(newLen, this.totalTime)
    }
}
