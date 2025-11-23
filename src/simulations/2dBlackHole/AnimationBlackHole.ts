import { Screen, SimColors } from "../../constants";
import { Application, Graphics, Ticker } from "pixi.js";

export default class BlackHole2dAnimation {
  app!: Application;
  originX!: number;
  originY!: number;
  blackHole!: Graphics;
  ray!: Graphics;
  ticker!: Ticker;
  backgroundColor: string;

  /**
   * Initializes the application for Pixi.JS
   */
  constructor() {
    // Set initial colors based on users theme
    const theme = localStorage.getItem("theme");
    this.backgroundColor =
      theme === "light" ? SimColors.bgLight : SimColors.bgDark;

    this.ticker = Ticker.shared;
    this.ticker.autoStart = false;
    this.ticker.stop();
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

    this.ray = new Graphics();
    this.blackHole = new Graphics();
    this.app.stage.addChild(this.ray);
    this.app.stage.addChild(this.blackHole);

    this.ray.circle(0, 30, 3);
    this.ray.fill("#f7dd1bff");

    this.blackHole.circle(Screen.width / 2, Screen.height / 2, 30);
    this.blackHole.fill("#ffffff");

    // Set colors to be reactive to theme changes
    this.updateColors();
    this.animateRays();
    return this.app;
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
      } else {
        this.backgroundColor = SimColors.bgDark;
      }

      this.app.renderer.background.color = this.backgroundColor;
    });
  }

  /**
   * Adds a ticker to the app instance of Pixi.Js. Runs every frame to
   * help with animation. All animation is handled in here
   */
  animateRays() {
    // Runs on each render loop. Used to animate
    this.ticker.add(() => {
      this.ray.x += 1;
    });
    this.ticker.start();
  }
}
