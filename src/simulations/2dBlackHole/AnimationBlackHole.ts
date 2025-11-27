import { Screen, SimColors } from "../../constants";
import { Application, Graphics, Ticker } from "pixi.js";
import { Ray } from "./Ray";
import {
  rs,
  RAY_COLOR_DARK,
  RAY_COLOR_LIGHT,
  EVENT_HORIZON_COLOR_DARK,
  EVENT_HORIZON_COLOR_LIGHT,
} from "./constants";

export enum RaySetup {
  VERTICAL_LINE = 1,
  TOP_LEFT_CORNER = 2,
  CENTER_LEFT_RIGHT = 3,
  ORBITING = 4,
}

interface RayObject {
  data: Ray;
  graphics: Graphics;
  id: string;
  positionHistory: Array<{ x: number; y: number }>;
}

export default class BlackHole2dAnimation {
  app!: Application;
  originX!: number;
  originY!: number;
  blackHole!: Graphics;
  rayObjects: RayObject[];
  ticker!: Ticker;
  backgroundColor: string;
  rayColor: string;
  eventHorizonColor: string;

  /**
   * Initializes the application for Pixi.JS
   */
  constructor() {
    // Set initial colors based on users theme
    const theme = localStorage.getItem("theme");
    this.backgroundColor =
      theme === "light" ? SimColors.bgLight : SimColors.bgDark;
    this.rayColor = theme === "light" ? RAY_COLOR_LIGHT : RAY_COLOR_DARK;
    this.eventHorizonColor =
      theme === "light" ? EVENT_HORIZON_COLOR_LIGHT : EVENT_HORIZON_COLOR_DARK;

    this.rayObjects = [];
    this.initializeRays(RaySetup.VERTICAL_LINE); // Start with default setup

    this.ticker = Ticker.shared;
    this.ticker.autoStart = false;
    this.ticker.stop();
  }

  /**
   * Initialize rays based on setup configuration
   * @param setupType - VERTICAL_LINE, TOP_LEFT_CORNER, CENTER_LEFT_RIGHT, or ORBITING
   */
  initializeRays(setupType: RaySetup): void {
    this.rayObjects = [];

    switch (setupType) {
      case RaySetup.VERTICAL_LINE:
        this.createVerticalLineRays();
        break;
      case RaySetup.TOP_LEFT_CORNER:
        this.createTopLeftCornerRays();
        break;
      case RaySetup.CENTER_LEFT_RIGHT:
        this.createCenterLeftRightRays();
        break;
      case RaySetup.ORBITING:
        this.createOrbitingRays();
        break;
    }
  }

  /**
   * Setup 1: 80 rays from left side, evenly spaced vertically, moving right
   */
  private createVerticalLineRays(): void {
    const RAYS = 80;
    const spacing = Screen.height / (RAYS + 1);

    for (let i = 0; i < RAYS; i++) {
      const yPosition = spacing * (i + 1) - Screen.height / 2;
      this.rayObjects.push({
        data: new Ray(-200, yPosition, 0),
        graphics: new Graphics(),
        id: `ray-${i}`,
        positionHistory: [],
      });
    }
  }

  /**
   * Setup 2: ~25 rays from top-left corner, angles 0° to 90°
   */
  private createTopLeftCornerRays(): void {
    const RAYS = 25;
    const startX = -200;
    const startY = -200;
    const startAngle = 0; // 0°
    const endAngle = Math.PI / 2; // 90°
    const angleStep = (endAngle - startAngle) / (RAYS - 1);

    for (let i = 0; i < RAYS; i++) {
      const angle = startAngle + i * angleStep;
      this.rayObjects.push({
        data: new Ray(startX, startY, angle),
        graphics: new Graphics(),
        id: `ray-${i}`,
        positionHistory: [],
      });
    }
  }

  /**
   * Setup 3: 20 rays from left, 20 from right, radiating toward center
   */
  private createCenterLeftRightRays(): void {
    const RAYS_PER_SIDE = 20;

    // Left side: angles from -90° to +90° (right-facing hemisphere)
    const leftX = -200;
    const leftY = 0;
    const leftStartAngle = -Math.PI / 2; // -90°
    const leftEndAngle = Math.PI / 2; // 90°
    const leftAngleStep =
      (leftEndAngle - leftStartAngle) / (RAYS_PER_SIDE - 1);

    for (let i = 0; i < RAYS_PER_SIDE; i++) {
      const angle = leftStartAngle + i * leftAngleStep;
      this.rayObjects.push({
        data: new Ray(leftX, leftY, angle),
        graphics: new Graphics(),
        id: `ray-left-${i}`,
        positionHistory: [],
      });
    }

    // Right side: angles from 90° to 270° (left-facing hemisphere)
    const rightX = 200;
    const rightY = 0;
    const rightStartAngle = Math.PI / 2; // 90°
    const rightEndAngle = (3 * Math.PI) / 2; // 270°
    const rightAngleStep =
      (rightEndAngle - rightStartAngle) / (RAYS_PER_SIDE - 1);

    for (let i = 0; i < RAYS_PER_SIDE; i++) {
      const angle = rightStartAngle + i * rightAngleStep;
      this.rayObjects.push({
        data: new Ray(rightX, rightY, angle),
        graphics: new Graphics(),
        id: `ray-right-${i}`,
        positionHistory: [],
      });
    }
  }

  /**
   * Setup 4: Rays from far away that approach, orbit, and escape
   */
  private createOrbitingRays(): void {
    const RAYS = 20;
    const photonSphereRadius = 1.5 * rs; // r = 30
    const startX = -250;

    for (let i = 0; i < RAYS; i++) {
      // Spread rays vertically
      const spacing = Screen.height / (RAYS + 1);
      const startY = spacing * (i + 1) - Screen.height / 2;

      // Calculate impact parameter (distance of closest approach if no gravity)
      const impactParameter = Math.abs(startY);

      // For orbiting behavior, we want impact parameters near the photon sphere
      // Aim the ray slightly off-center to create the right impact parameter
      let velocityAngle: number;

      if (impactParameter < photonSphereRadius * 0.8) {
        // Too close - aim slightly away to increase impact parameter
        velocityAngle = startY > 0 ? -0.05 : 0.05;
      } else if (impactParameter > photonSphereRadius * 1.2) {
        // Too far - aim slightly toward center to decrease impact parameter
        velocityAngle = startY > 0 ? 0.05 : -0.05;
      } else {
        // Just right - mostly horizontal with tiny adjustment
        velocityAngle = startY > 0 ? 0.02 : -0.02;
      }

      this.rayObjects.push({
        data: new Ray(startX, startY, velocityAngle),
        graphics: new Graphics(),
        id: `ray-orbit-${i}`,
        positionHistory: [],
      });
    }
  }

  /**
   * Initialize all the main components for Pixi.js including the app
   * Starts the animation and creates listeners for theme changes to update colors.
   * Also, creates all graphics objects and adds to stage.
   */
  async initPixi(originX: number, originY: number): Promise<Application> {
    this.app = new Application();
    this.originX = originX;
    this.originY = originY;
    await this.app.init({
      background: this.backgroundColor,
      width: Screen.width,
      height: Screen.height,
      antialias: true,
    });
    // Bind events for click handlers
    this.app.stage.eventMode = "static";
    this.app.stage.hitArea = this.app.screen;

    // Create world container with origin at center of screen

    for (var i = 0; i < this.rayObjects.length; i++) {
      const graphics = this.rayObjects[i].graphics;
      this.app.stage.addChild(graphics);
    }

    this.blackHole = new Graphics();
    this.app.stage.addChild(this.blackHole);

    // Draw black hole with radius = Schwarzschild radius (rs)
    this.blackHole.circle(Screen.width / 2, Screen.height / 2, rs);
    this.blackHole.fill(this.eventHorizonColor);

    // Set colors to be reactive to theme changes
    this.updateColors();
    this.animateRays();
    return this.app;
  }

  /**
   * Reset animation with a new setup configuration
   * @param setupType - VERTICAL_LINE, TOP_LEFT_CORNER, or CENTER_LEFT_RIGHT
   */
  resetAnimation(setupType: RaySetup): void {
    // Stop the ticker
    this.ticker.stop();

    // Remove all existing ray graphics from stage and destroy them
    for (let i = this.rayObjects.length - 1; i >= 0; i--) {
      const rayObj = this.rayObjects[i];
      this.app.stage.removeChild(rayObj.graphics);
      rayObj.graphics.destroy();
    }

    // Reinitialize rays with new configuration
    this.initializeRays(setupType);

    // Add new ray graphics to stage
    for (let i = 0; i < this.rayObjects.length; i++) {
      const graphics = this.rayObjects[i].graphics;
      this.app.stage.addChild(graphics);
    }

    // Restart the ticker
    this.ticker.start();
  }

  /**
   * Colors for simulation. If not light, assume dark
   * We emit an event in the themeToggle component and listen to it here
   * Whenever theme changes, we update our colors and redraw shapes
   */
  updateColors(): void {
    window.addEventListener("themeChanged", () => {
      if (localStorage.getItem("theme") === "light") {
        this.backgroundColor = SimColors.bgLight;
        this.rayColor = RAY_COLOR_LIGHT;
        this.eventHorizonColor = EVENT_HORIZON_COLOR_LIGHT;
      } else {
        this.backgroundColor = SimColors.bgDark;
        this.rayColor = RAY_COLOR_DARK;
        this.eventHorizonColor = EVENT_HORIZON_COLOR_DARK;
      }

      // Redraw black hole with new color
      this.blackHole.clear();
      this.blackHole.circle(Screen.width / 2, Screen.height / 2, rs);
      this.blackHole.fill(this.eventHorizonColor);

      // Clear all ray trails so they redraw with new color
      for (let i = 0; i < this.rayObjects.length; i++) {
        this.rayObjects[i].positionHistory = [];
        this.rayObjects[i].graphics.clear();
      }

      this.app.renderer.background.color = this.backgroundColor;
    });
  }

  /**
   * Adds a ticker to the app instance of Pixi.Js. Runs every frame to
   * help with animation. All animation is handled in here
   */
  animateRays() {
    const maxTrailLength = 200;

    // Runs on each render loop. Used to animate
    this.ticker.add(() => {
      for (let i = this.rayObjects.length - 1; i >= 0; i--) {
        const rayObj = this.rayObjects[i];
        const pos = rayObj.data.calculateNextPos();

        // If ray crossed event horizon, remove it
        if (pos === null) {
          this.app.stage.removeChild(rayObj.graphics);
          rayObj.graphics.destroy();
          this.rayObjects.splice(i, 1);
          continue;
        }

        // Convert to screen coordinates
        const screenX = Screen.width / 2 - pos.x;
        const screenY = Screen.height / 2 - pos.y;

        // Add current position to history
        rayObj.positionHistory.push({ x: screenX, y: screenY });

        // Limit trail length
        if (rayObj.positionHistory.length > maxTrailLength) {
          rayObj.positionHistory.shift();
        }

        // Clear and redraw the trail
        rayObj.graphics.clear();

        // Draw trail with fading alpha
        const historyLength = rayObj.positionHistory.length;
        for (let j = 0; j < historyLength - 1; j++) {
          const pos1 = rayObj.positionHistory[j];
          const pos2 = rayObj.positionHistory[j + 1];

          // Calculate alpha: older positions are more transparent
          const alpha = (j + 1) / historyLength;

          // Draw line segment
          rayObj.graphics
            .moveTo(pos1.x, pos1.y)
            .lineTo(pos2.x, pos2.y)
            .stroke({ width: 1, color: this.rayColor, alpha: alpha });
        }

        // Draw the ray head (bright circle at current position)
        rayObj.graphics.circle(screenX, screenY, 1.5).fill(this.rayColor);
      }
    });
    this.ticker.start();
  }
}
