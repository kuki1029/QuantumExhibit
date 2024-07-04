import { Screen, SimColors, DefaultDoublePend } from "../../constants.js";
import { Graphics, Text } from 'pixi.js';
import DoublePendulumData from './dpCalculation.js'
import { Application } from 'pixi.js';

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
        // Set intial colors based on users theme
        const theme = localStorage.getItem("theme")
        this.pivotColor = (theme === 'light') ? SimColors.black : SimColors.white; // Also color for second pendulum
        this.pendulumColor = (theme === 'light') ? SimColors.blue : SimColors.red;
        this.backgroundColor = (theme === 'light') ? SimColors.bgLight : SimColors.bgDark;
        this.ropeColor = this.pivotColor;
        this.len1 = DefaultDoublePend.defaultLen1
        this.len2 = DefaultDoublePend.defaultLen2
        this.showEnergy = false
        this.showTrace1 = false
        this.showTrace2 = false
        this.pend = new DoublePendulumData(DefaultDoublePend.mass1, DefaultDoublePend.mass2, defaultLen1, defaultLen2);
    }

    /**
     * Draws pivot. Draws it at the origin point
     */
    drawPivot() {
        const pivotSize = DefaultDoublePend.pivotSize
        // Need to calculate the coordinates of the upper left of rectangle as Pixi draws it from upper
        // left corner
        const upperLeftX = this.originX - pivotSize / 2
        const upperLeftY = this.originY - pivotSize / 2
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
        this.rope1.clear();
        this.rope2.clear();

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
        this.pendulum1.circle(this.originX, this.originY, DefaultDoublePend.pendulumSize)
        this.pendulum1.fill(this.pendulumColor)

        this.pendulum2.circle(this.originX, this.originY, DefaultDoublePend.pendulumSize)
        this.pendulum2.fill(this.pivotColor)
    }

    /**
     * Adds a ticker to the app instance of Pixi.Js. Runs every frame to 
     * help with animation. All animation is handled in here
     */
    animatePendulumRope() {
        // Runs on each render loop. Used to animate
        this.app.ticker.add(() => {
            // X, and y are switched as the angle is defind relative to y not x
            // as it usually is for polar to cartesian conversions
            const {x1, y1, x2, y2} = this.pend.calculateNextPos()
            this.setPendulumPosition(x1, y1, x2, y2)
            this.drawRopes(x1, y1, x2, y2)
            this.displayEnergyText()
            this.drawTraces(x1, y1, x2, y2)

        });
    }   

    /**
     * Check if the showEnergy var is true and displays the text
     * for the energy. 
     */
    displayEnergyText() {
        if (this.showEnergy) {
            const { ke, pe } = this.pend.getEnergy()
            this.energyText.text = `Kinetic: ${Math.round(ke * 100) / 100}\nPotential: ${Math.round(pe * 100) / 100}\nTotal: ${Math.round((Math.abs(ke+pe)) * 100) / 100}`
        } else {
            this.energyText.text = ""
        }
    }

    /**
     * Sets the pendula positions. 
     * @param {number} x1 - X coordinate of first pendulum
     * @param {number} y1 - Y coordinate of first pendulum
     * @param {number} x2 - X coordinate of second pendulum
     * @param {number} y2 - Y coordinate of second pendulum
     */
    setPendulumPosition(x1, y1, x2, y2) {
        this.pendulum1.x = x1
        this.pendulum1.y = y1
        this.pendulum2.x = x2 + x1
        this.pendulum2.y = y2 + y1
    }

    /**
     * This function draws the traces if the variables for the trace is true or not
     * @param {number} x1 - X coordinate of first pendulum
     * @param {number} y1 - Y coordinate of first pendulum
     * @param {number} x2 - X coordinate of second pendulum
     * @param {number} y2 - Y coordinate of second pendulum
     */
    drawTraces(x1, y1, x2, y2) {
        if (this.showTrace1) {
            this.firstTrace.lineTo(this.originX + x1, this.originY + y1)
            .stroke({ width: 2, color: this.pendulumColor })
        } 
        else {
            this.firstTrace.lineTo(this.originX + x1, this.originY + y1)
            .stroke({ width: 0, color: this.pendulumColor })
        }

        if (this.showTrace2) {
            this.secondTrace.lineTo(this.originX + x1 + x2, this.originY + y1 + y2)
                .stroke({ width: 2, color: this.pivotColor })
        } 
        else {
            this.secondTrace.lineTo(this.originX + x1 + x2, this.originY + y1 + y2)
                .stroke({ width: 0, color: this.pivotColor })
        }
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
                this.energyText.style.fill = SimColors.black;
            } else {
                this.pivotColor = SimColors.white;
                this.pendulumColor = SimColors.red;
                this.backgroundColor = SimColors.bgDark;
                this.ropeColor = this.pivotColor;
                this.energyText.style.fill = SimColors.white
            }
            this.drawPendulums()
            this.drawPivot()
            this.firstTrace.clear()
            this.secondTrace.clear()
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
        this.firstTrace = new Graphics()
        this.secondTrace = new Graphics()
        this.energyText = new Text({ text: "", style: {fill: this.pivotColor}});
        this.app.stage.addChild(this.pivot)
        this.app.stage.addChild(this.rope1)
        this.app.stage.addChild(this.rope2)
        this.app.stage.addChild(this.pendulum1)
        this.app.stage.addChild(this.pendulum2)
        this.app.stage.addChild(this.firstTrace)
        this.app.stage.addChild(this.secondTrace)
        this.app.stage.addChild(this.energyText)
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
        this.initTraces()
        this.energyText.x = 0
        this.energyText.y = 0

        return this.app
    }

    /**
     * Initializes the traces to their appropraite pendulums
     */
    initTraces() {
        const {x1, y1, x2, y2} = this.pend.calculateNextPos()
        this.firstTrace.moveTo(x1 + this.originX, y1 + this.originY + this.defaultLen1)
        .stroke({ width: 2, color: this.pendulumColor})
        this.firstTrace.clear()
        this.secondTrace.moveTo(x2 + this.originX, y2 + this.originY + this.defaultLen1)
            .stroke({ width: 2, color: this.pivotColor})
        this.secondTrace.clear()
    }

    /**
     * Changes the mass for first pendulum
     * @param {number} newMass - New mass value
     */
    setMass1(newMass) {
        this.pend.setMass1(newMass)
    }

    /**
     * Changes the mass for second pendulum
     * @param {number} newMass - New mass value
     */
    setMass2(newMass) {
        this.pend.setMass2(newMass)
    }

    /**
     * Changes the length for the first pendulum
     * @param {number} newLen - New length value
     */
    setLen1(newLen) {
        this.pend.setLen1(newLen)
        this.len1 = newLen
        this.secondTrace.clear()  
    }

    /**
     * Changes the length for the second pendulum
     * @param {number} newLen - New length value
     */
    setLen2(newLen) {
        this.pend.setLen2(newLen)
        this.len2 = newLen
        this.secondTrace.clear()  
    }

    /**
     * Changes the angle for the first pendulum
     * @param {number} newAngle - New angle value in radians
     */
    setAngle1(newAngle) {
        this.pend.setAngle1(newAngle)
        this.firstTrace.clear()  
        this.secondTrace.clear()  
    }

    /**
     * Changes the angle for the second pendulum
     * @param {number} newAngle - New angle value in radians
     */
    setAngle2(newAngle) {
        this.pend.setAngle2(newAngle)
        this.firstTrace.clear() 
        this.secondTrace.clear()  
    }

    /**
     * Changes the gravity for the simulation
     * @param {number} newGrav - New gravity
     */
    setGravity(newGrav) {
        this.pend.setGravity(newGrav)
    }

    /**
     * Changes the view for the energy display
     * @param {Boolean} showEnergy - To show energy or not
     */
    setEnergyDisplay(showEnergy) {
        this.showEnergy = showEnergy
    }

    /**
     * Changes the setTrace options for first pendulum
     * @param {Boolean} showTrace1 - To show energy or not
     */
    setTrace1(showTrace1) {
        this.firstTrace.clear()
        this.showTrace1 = showTrace1
    }

    /**
     * Changes the setTrace options for second pendulum
     * @param {Boolean} showTrace2 - To show energy or not
     */
    setTrace2(showTrace2) {
        this.secondTrace.clear()
        this.showTrace2 = showTrace2
    }

    /**
     * Returns the first pendulum mass from the calculator class
     * @returns {number} Returns mass of first pendulum
     */
    getMass1() {
        return this.pend.m1
    }

    /**
     * Returns the second pendulum mass from the calculator class
     * @returns {number} Returns mass of second pendulum
     */
    getMass2() {
        return this.pend.m2
    }
}
