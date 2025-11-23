import { Screen, SimColors } from "../../constants.js";
import { Application } from "pixi.js";

export default class BlackHole2dAnimation {
  /**
   * Initializes the application for Pixi.JS
   * @param {Renderer} app - Pixi.JS renderer
   */
  constructor(app) {
    // Set intial colors based on users theme
    const theme = localStorage.getItem("theme");
    this.backgroundColor =
      theme === "light" ? SimColors.bgLight : SimColors.bgDark;
  }

  /**
   * Initialize all the main components for Pixi.js including the app
   * Starts the animation and creates listeners for theme changes to update colors.
   * Also, creates all graphics objects and adds to stage.
   */
  async initPixi(originX, originY) {
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
    // Set colors to be reactive to theme changes
    this.updateColors();
    return this.app;
  }

  /**
   * Colors for simulation. If not light, assume dark
   * We emit an event in the themeToggle component and listen to it here
   * Whenever theme changes, we update our colors and redraw shapes
   */
  updateColors() {
    window.addEventListener("themeChanged", () => {
      if (localStorage.getItem("theme") === "light") {
        this.backgroundColor = SimColors.bgLight;
      } else {
        this.backgroundColor = SimColors.bgDark;
      }

      this.app.renderer.background.color = this.backgroundColor;
    });
  }
}
