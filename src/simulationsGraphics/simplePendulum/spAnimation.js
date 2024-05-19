import { Screen } from "../../constants.js";
import { Graphics } from 'pixi.js';
import SimplePendulumData from '../../simulationsCalcs/simplePendulum/calculation.js'

// Constants for animation
const pivotSize = 20;
const defaultLength = 200;
const defaultMass = 1;
const pendulumSize = 10;
const animationSpeed = 100;

const pend = new SimplePendulumData(defaultMass, defaultLength);

/** Class creates the application for Pixi.JS and helper
 * functions to do all the drawing for it.
*/
export default class simpPendAnimation { 
    /**
     * Initializes the application for Pixi.JS
     * @param {Renderer} app - Pixi.JS renderer
     * @param {number} originX - The origin for x values. All objects will be drawn from here
     * @param {number} originY - The origin for y values. All objects will be drawn from here
     */
    constructor(app, originX, originY) {
        // totalTime used to update the animation
        this.totalTime = 0;

        // Set intial colors based on users theme
        const theme = localStorage.getItem("theme")
        this.pivotColor = (theme === 'light') ? "#000000" : "#ffffff";
        this.pendulumColor = (theme === 'light') ? 0x4169E1 : 0xff0033;
        this.backgroundColor = (theme === 'light') ? '#ffffff' : '#0c0c0c';
        this.ropeColor = this.pivotColor;
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
     * Draws rope. Draws from origin to labelled x,y. All coordinates 
     * are relative to the origin which was passed in when initializing this class
     * @param {number} x - The second point to which we draw the line. First point is at origin
     * @param {number} y - The second point to which we draw the line. First point is at origin
     */
    drawRope(x, y) {
        this.rope.moveTo(this.originX, this.originY);
        this.rope.lineTo(this.originX + x, y); 
        this.rope.stroke({ width: 2, color: this.ropeColor });
    }

     /**
     * Draws pendulum. All coordinates 
     * are relative to the origin which was passed in when initializing this class
     */
    drawPendulum() {
        this.pendulum.circle(this.originX, this.originY, pendulumSize)
        this.pendulum.fill(this.pendulumColor)
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
            const xCoord = pend.getCurrentPosition(this.totalTime)[0]
            const yCoord = pend.getCurrentPosition(this.totalTime)[1]
            // Animate the pendulum
            this.pendulum.x = yCoord
            this.pendulum.y = xCoord
            // Animate rope
            this.rope.clear();
            this.drawRope(yCoord, xCoord + defaultLength)
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
                this.pivotColor = "#000000";
                this.pendulumColor = 0x4169E1;
                this.backgroundColor = '#ffffff'; 
                this.ropeColor = this.pivotColor;
            } else {
                this.pivotColor = "#ffffff";
                this.pendulumColor = 0xff0033;
                this.backgroundColor = 0x0c0c0c;
                this.ropeColor = this.pivotColor;
            }
            this.drawPendulum()
            this.drawPivot()
            this.app.renderer.background.color = this.backgroundColor;
        })
    }

    /**
     * Initialize all the graphics objects and adds to stage
     */
    initObjectsToStage() {
        // Initialize all graphics instances
        this.pendulum = new Graphics();
        this.rope = new Graphics();
        this.pivot = new Graphics();
        this.app.stage.addChild(this.pivot)
        this.app.stage.addChild(this.rope)
        this.app.stage.addChild(this.pendulum)
    }

    /**
     * Initialize all the main components for Pixi.js including the app
     * Starts the animation and creates listeners for theme changes to update colors.
     * Also, creates all graphics objects and adds to stage.
     */
    async initPixi(app, originX, originY) {
        this.app = app;
        this.originX = originX
        this.originY = originY
        await this.app.init({ background: this.backgroundColor, width: Screen.width, 
            height: Screen.height, antialias: true });
        // Set colors to be reactive to theme changes
        this.updateColors();
        // Run animation
        this.animatePendulumRope()
        this.initObjectsToStage()
    }

    /**
     * Changes the gravity for the pendulum. 
     * @param {number} newGrav - New gravity value in m/s^2
     */
    setGravity(newGrav) {
        pend.setGravity(newGrav, this.totalTime)
    }

    /**
     * Changes the length for the pendulum. 
     * @param {number} newLen - New length value in m
     */
    setLength(newLen) {
        pend.setLength(newLen, this.totalTime)
    }
}
