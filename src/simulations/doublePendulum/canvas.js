import { ToggleButton, Stack } from '@mui/material';
import { useEffect, useRef } from 'react';

// Shows the canvas and show options button
export const Canvas = ({ pendAnimate, val, onSmash}) => {
    const ref = useRef(null);
    console.log(ref)
      // Runs once
  useEffect(() => {
    // We need a function for this as pixiJS requires async setup to be initialized
    async function initializePixiApp() {
      const app = await pendAnimate.initPixi(Screen.width/2, Screen.height/4)
      // Attach to the current DOM
      ref.current.appendChild(app.canvas);
      console.log(app.canvas)
      console.log(ref)
    }

    initializePixiApp();
    console.log("A")
  }, [pendAnimate]);

    return (
        <div>
            <Stack  spacing={2}>
                {/* Pixi Js Canvas */}
                <div ref={ref} display="flex" />
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                >
                    <ToggleButton
                        value="check"
                        selected={val}
                        onChange={onSmash}
                    >
                        Show Options                        
                    </ToggleButton>
                </Stack>

            </Stack>
        </div>
    )
}