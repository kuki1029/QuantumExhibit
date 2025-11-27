import { useRef, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import blackHoleAnimation, { RaySetup } from "./AnimationBlackHole";
import { Screen } from "../../constants";
import { SetupButtons } from "./components/SetupButtons";
import "./style.css";

const bhAnimate = new blackHoleAnimation();

export const BlackHole2D = () => {
  // Ref used to display the pixi.js code
  const ref = useRef<HTMLDivElement>(null);

  // Runs once
  useEffect(() => {
    // We need a function for this as pixiJS requires async setup to be initialized
    async function initializePixiApp() {
      const app = await bhAnimate.initPixi(Screen.width / 2, Screen.height / 3);

      // Attach to the current DOM
      if (ref.current) {
        ref.current.appendChild(app.canvas);
      }
    }

    initializePixiApp();
  }, []);

  // Handlers for different ray setups
  const handleSetup1 = () => {
    bhAnimate.resetAnimation(RaySetup.VERTICAL_LINE);
  };

  const handleSetup2 = () => {
    bhAnimate.resetAnimation(RaySetup.TOP_LEFT_CORNER);
  };

  const handleSetup3 = () => {
    bhAnimate.resetAnimation(RaySetup.CENTER_LEFT_RIGHT);
  };

  const handleSetup4 = () => {
    bhAnimate.resetAnimation(RaySetup.ORBITING);
  };

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
        <div style={{ width: `${Screen.width / 2}px`, margin: "12px auto" }}>
          <SetupButtons
            onSetup1={handleSetup1}
            onSetup2={handleSetup2}
            onSetup3={handleSetup3}
            onSetup4={handleSetup4}
          />
        </div>
      </div>
    </HelmetProvider>
  );
};
