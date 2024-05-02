import React, { useRef, useEffect } from "react";
import { Application, Graphics } from 'pixi.js';
import "./exampleStyle.css";

// Create page with react syntax. Need to do it this way
// so that Pixi.js works well with React
export const SimplePendulum = () => {
  // Ref used to display the pixi.js code
  const ref = useRef(null);

  // React hooks. Runs after render of page
  useEffect(() => {
    // Graphics instance. Used to create shapes or lines.
    // Can be reused for multiple shapes. For efficient methods,
    // check Pixi.JS documentation
    const graphics = new Graphics();

    // Rectangle example
    let rect = graphics.rect(50, 50, 100, 100);
    rect.fill(0xde3249);
    // Opt-in to interactivity
    rect.eventMode = 'static';
    // Shows hand cursor
    rect.cursor = 'pointer';
    function onClick() {
      rect.x += 10;
    }
    rect.on('pointerdown', onClick);

    // As we need async, we need to wrap this in a function due to how 
    // react works
    async function fetchData() {
      // Create a new application
      const app = new Application();
      // Initialize the application
      await app.init({ background: '#1099bb' });
      // Append the application canvas to the document body
      document.body.appendChild(app.canvas);
      // Add rect to the application
      app.stage.addChild(rect);
    }

    fetchData();
    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
  }, []);
 
  // Return the actual code for the Pixi.JS. 
  return (
    <div>
      <div ref={ref} />
      <div class="testing">    <h2>Testing more contsnt</h2>
    </div>
    </div>);
}
