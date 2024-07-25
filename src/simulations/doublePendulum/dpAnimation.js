import { Screen, SimColors, DefaultDoublePend } from "../../constants.js";
import { Graphics, Text } from 'pixi.js';
import DoublePendulumData from './dpCalculation.js'
import { Application, Ticker, Circle } from 'pixi.js';

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
        this.dragTarget = false
        this.currentPosition = { x1: 0, y1: 0, x2: 0, y2: 0 }
        this.ticker = Ticker.shared
        this.ticker.autoStart = false;
        this.ticker.stop()
    }

    /**
     * Initialize all the main components for Pixi.js including the app
     * Starts the animation and creates listeners for theme changes to update colors.
     * Also, creates all graphics objects and adds to stage.
     */
    async initPixi(originX, originY) {
        this.app = new Application()
        this.originX = originX
        this.originY = originY
        await this.app.init({ background: this.backgroundColor, width: Screen.width, 
            height: Screen.height, antialias: true })
        // Bind events for click handlers
        this.app.stage.eventMode = 'static'
        this.app.stage.hitArea = this.app.screen
        this.app.stage.on('pointerup', this.onDragEnd())
        this.app.stage.on('pointerupoutside', this.onDragEnd())
        // Set colors to be reactive to theme changes
        this.updateColors()
        // Run animation
        this.initObjectsToStage()
        this.initClickHandlers()
        this.animatePendulumRope()
        this.drawPivot()
        this.drawPendulums()
        this.drawRopes(0, this.len1, 0, this.len2)
        this.initTraces()
        this.energyText.x = 0
        this.energyText.y = 0
        return this.app
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
     * Adds a ticker to the app instance of Pixi.Js. Runs every frame to 
     * help with animation. All animation is handled in here
     */
    animatePendulumRope() {
        // Runs on each render loop. Used to animate
        this.ticker.add(() => {
            // X, and y are switched as the angle is defind relative to y not x
            // as it usually is for polar to cartesian conversions
            const {x1, y1, x2, y2} = this.pend.calculateNextPos()
            this.setPendulumPosition(x1, y1, x2, y2)
            this.drawRopes(x1, y1, x2, y2)
            this.displayEnergyText()
            this.drawTraces(x1, y1, x2, y2)
            Object.assign(this.currentPosition, { x1, y1, x2, y2 })
        });
        this.ticker.start()
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
     * Check if the showEnergy var is true and displays the text
     * for the energy. 
     */
    displayEnergyText() {
        if (this.showEnergy) {
            const { ke, pe } = this.pend.getEnergy()
            this.energyText.text = `Kinetic: ${Math.round(ke * 100) / 100}\nPotential: ${Math.round(pe * 100) / 100}\nTotal: ${Math.round((ke+pe) * 100) / 100}`
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
     * Initializes the interactivity for both the pendula
     */
    initClickHandlers() {
        this.pendulum1.eventMode = 'static';
        this.pendulum1.cursor = 'pointer';
        this.pendulum1.hitArea = new Circle(this.originX, this.originY, 80)
        this.pendulum1.on('pointerdown', this.onDragStart(), this.pendulum1);

        this.pendulum2.eventMode = 'static';
        this.pendulum2.cursor = 'pointer';
        this.pendulum2.hitArea = new Circle(this.originX, this.originY, 80)
        this.pendulum2.on('pointerdown', this.onDragStart(), this.pendulum2);
    }

    /**
     * Function when object starts being dragged
     */
    onDragStart() {
        // We set it up like this so that it can have access to class variables. 
        const app = this.app
        const ticker = this.ticker
        const onDragMove = this.onDragMove()
        const setDrag = () => {
            return this.dragTarget = true
        }
        // Store ref to data for multitouch support
        return function () {
            // Once this is passed into Pixi, the 'this' object changes to its own context 
            // so it is not the same as the class this object
            setDrag()
            ticker.stop()
            // Set which pend so we can track later. 1 for first pend, 2 for second
            app.stage.on('pointermove', onDragMove.bind(this))
        }
    }

    /**
     * Functions to execute when the pointer is held down and moving an object
     */
    onDragMove() {
        // We set it up like this so that it can have access to class variables. 
        const getDrag = () => this.dragTarget
        const moveRopes = (id, x, y) => {
            if (id === this.pendulum1.uid) {
                this.dragFirstpendulum(x, y)
            } else if (id === this.pendulum2.uid) {
                this.dragSecondpendulum(x, y)
            }
        }
        return function (event) {
            if (getDrag()) {
                this.x = event.global.x - 400
                this.y = event.global.y - 150
                moveRopes(this.uid, this.x, this.y)
            }
        }
    }

    /**
     * Function to execute once dragging is done. Clean up basically
     */
    onDragEnd() {
        // We set it up like this so that it can have access to class variables. 
        const app = this.app
        const ticker = this.ticker
        const setDrag = () => this.dragTarget = false
        const getDrag = () => this.dragTarget
        return function () {
            if (getDrag()) {
                app.stage.off('pointermove');
                ticker.start()
                setDrag()
            }
        }
    }

    /**
     * Calls appropriate functions to drag around the first pendulum
     */
    dragFirstpendulum(x, y) {
        this.drawRopes(x, y, this.currentPosition.x2, this.currentPosition.y2)
        this.setPendulumPosition(x, y, this.currentPosition.x2, this.currentPosition.y2)
        const len = this.calculateLength(x, y)
        const angle = this.calculateAngle(x, y)
        this.pend.setAngle1(angle)
        this.setAngle1Slider(angle)
        this.pend.setLen1(len)
        this.setLen1Slider(len)
    }

    /**
     * Calls appropriate functions to drag around the second pendulum
     */
    dragSecondpendulum(x, y) {
        this.drawRopes(this.currentPosition.x1, this.currentPosition.y1, x - this.currentPosition.x1, y - this.currentPosition.y1)        
        const len = this.calculateLength(x - this.currentPosition.x1, y - this.currentPosition.y1)
        const angle = this.calculateAngle(x - this.currentPosition.x1, y - this.currentPosition.y1)
        this.pend.setAngle2(angle)
        this.setAngle2Slider(angle)
        this.pend.setLen2(len)
        this.setLen2Slider(len)
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
     * Resets the pendulum so we start over from the user chosen settings
     */
    resetPendulum() {
        this.pend.resetPendulum()
        const {x1, y1, x2, y2} = this.pend.calculateNextPos()
        this.drawTraces(x1, y1, x2, y2)
        this.clearTrace() 
    }

    /**
     * Calculates the angle formed by (x, y) relative to the -y axis. Returns in domain of [0, 2pi]
     * @param {Number} x - x Value of the coordinate
     * @param {Number} y - y Value of the coordinate
     * @returns {Number} - Returns the angle within domain of [0, 2pi]. Coordinate system is 0 angle downwards and CCW
     */
    calculateAngle(x, y) {
        // Atan2 actually takes in arguments as (y, x) but our coordinate system is rotated so we pass in (x, y)
        const angle = Math.atan2(x, y)
        return (angle + 2 * Math.PI) % (2 * Math.PI)
    }

    /**
     * Changes the length from (0, 0) to (x, y). Length is scaled by the scaling provided in constants
     * @param {Number} x - x Value of the coordinate
     * @param {Number} y - y Value of the coordinate
     * @returns {Number} - Returns the length scaled down
     */
    calculateLength(x, y) {
        return (Math.sqrt(x**2 + y**2) / DefaultDoublePend.scaling)
    }

    /**
     * Sets length callback. This allows us to change the sliders when the user drags the pendulum
     * @param {Function} setLen1Slider - Sets the length value for the first pendulum on the slider
     * @param {Function} setLen2Slider - Sets the length value for the second pendulum on the slider
     */
    setLenCallback(setLen1Slider, setLen2Slider) {
        Object.assign(this, {setLen1Slider, setLen2Slider})
    }

    /**
     * Sets angle callback. This allows us to change the sliders when the user drags the pendulum
     * @param {Function} setAngle1Slider - Sets the angle value for the first pendulum on the slider
     * @param {Function} setAngle2Slider - Sets the angle value for the second pendulum on the slider
     */
    setAngleCallback(setAngle1Slider, setAngle2Slider) {
        Object.assign(this, {setAngle1Slider, setAngle2Slider})
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
        this.clearTrace() 
    }

    /**
     * Changes the length for the second pendulum
     * @param {number} newLen - New length value
     */
    setLen2(newLen) {
        this.pend.setLen2(newLen)
        this.len2 = newLen
        this.clearTrace()
    }

    /**
     * Changes the angle for the first pendulum
     * @param {number} newAngle - New angle value in radians
     */
    setAngle1(newAngle) {
        this.pend.setAngle1(newAngle)
        this.clearTrace()
    }

    /**
     * Changes the angle for the second pendulum
     * @param {number} newAngle - New angle value in radians
     */
    setAngle2(newAngle) {
        this.pend.setAngle2(newAngle)
        this.clearTrace()
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
        if (this.firstTrace) {
            this.firstTrace.clear()
        }
        this.showTrace1 = showTrace1
    }

    /**
     * Changes the setTrace options for second pendulum
     * @param {Boolean} showTrace2 - To show energy or not
     */
    setTrace2(showTrace2) {
        if (this.secondTrace) {
            this.secondTrace.clear()
        }
        this.showTrace2 = showTrace2
    }

    /**
     * Sets the damping value for the system
     * @param {Boolean} newDamp - New damp value
     */
    setDamp(newDamp) {
        this.pend.setDamp(newDamp)
    }

    /**
     * Returns all the parameters of the pendulum currently.
     * Values such as the angle of first and second pendulum, the omega values for each
     * @returns {Object} Returns { angle: [theta1, theta2], speed: [omega1, omega2] }
     */
    getPendulumValues() {
        const params = this.pend.params
        return {
            angle: [params[0], params[1]],
            speed: [params[2], params[3]],
        }
    }

    /**
     * Returns energy values of the pendulum. All taken to be positive for convienence
     * @returns {Object} Returns { angle: [theta1, theta2], speed: [omega1, omega2] }
     */
    getEnergy() {
        const energy = this.pend.getEnergy()
        return {
            pe: energy.pe,
            ke: energy.ke,
            total: energy.ke + energy.pe
        }
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

    /**
     * @returns {number} Returns current gravity
     */
    getGravity() {
        return this.pend.gravity
    }

    /**
     * Returns the first pendulum angle from the calculator class
     * @returns {number} Returns initial angle of first pendulum
     */
    getAngle1() {
        return this.pend.angle1
    }

    /**
     * Returns the second pendulum angle from the calculator class
     * @returns {number} Returns initla angle of second pendulum
     */
    getAngle2() {
        return this.pend.angle2
    }

    /**
     * Returns the first pendulum length 
     * @returns {number} Returns length of first pendulum
     */
    getLen1() {
        return this.len1
    }

    /**
     * Returns the second pendulum length 
     * @returns {number} Returns length of second pendulum
     */
    getLen2() {
        return this.len2
    }

    /**
     * Returns if the energy should be displayed or not
     * @returns {boolean} Returns if energyDisplay is true
     */
    getEnergyDisplay() {
        return this.showEnergy
    }

    /**
     * Returns if the first pendulum trace should be displayed or not
     * @returns {boolean} 
     */
    getTrace1() {
        return this.showTrace1
    }

    /**
     * Returns if the second pendulum trace should be displayed or not
     * @returns {boolean} 
     */
    getTrace2() {
        return this.showTrace2
    }

    /**
     * Returns the damping amount on the system
     * @returns {number} Returns damping number
     */
    getDamp() {
        return this.pend.dampCoeff
    }

    /**
     * Clears trace if they are defined
     */
    clearTrace() {
        if (this.firstTrace) {
            this.firstTrace.clear()
        }
        if (this.secondTrace) {
            this.secondTrace.clear()
        }
    }
}
