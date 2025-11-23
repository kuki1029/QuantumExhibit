import { useRef, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import blackHoleAnimation from "./blackHole2dAnimation.js";
import { Screen } from "../../constants.js";
import "./style.css";

const bhAnimate = new blackHoleAnimation();

export const BlackHole2D = () => {
  // Ref used to display the pixi.js code
  const ref = useRef(null);

  // Runs once
  useEffect(() => {
    // We need a function for this as pixiJS requires async setup to be initialized
    async function initializePixiApp() {
      const app = await bhAnimate.initPixi(Screen.width / 2, Screen.height / 3);

      // Attach to the current DOM
      ref.current.appendChild(app.canvas);
    }

    initializePixiApp();
  }, []);

  // Return the actual code for the Pixi.JS.
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title> Elegant 2D Black Hole Simulation</title>
        <meta
          name="description"
          content="An elegant black hole simulation using Einstein's General Relativity. This simulation shows how light rays react to a black hole.  "
        />
      </Helmet>
      <div>
        {/* Div for the canvas element. Pixi adds the canvas here through ref */}
        <div ref={ref} />
      </div>
    </HelmetProvider>
  );
};
