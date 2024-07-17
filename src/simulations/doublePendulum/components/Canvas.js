import { ToggleButton, Stack, useMediaQuery, useTheme  } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Screen } from "../../../constants.js";
import { DoublePendGraph } from './DoublePendGraph.js';

// Shows the canvas and show options button
export const Canvas = ({ pendAnimate, val, onSmash }) => {
    const ref = useRef(null);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    // If the screen is md size or larger, the button will be moved to the left
    // to accomodate the options
    const moveButton = matches && val

      // Runs once
    useEffect(() => {
        // We need a function for this as pixiJS requires async setup to be initialized
        async function initializePixiApp() {
            const app = await pendAnimate.initPixi(Screen.width/2, Screen.height/4)
            // Attach to the current DOM
            ref.current.appendChild(app.canvas);
        }
        initializePixiApp();
    }, []);

    return (
        <div>
            <Stack  spacing={2} >
                <Stack
                    direction="row"
                    justifyContent={moveButton ? "flex-start" : "flex-end"}
                    alignItems="center"
                    spacing={2}
                    maxWidth={Screen.width}>
                    <ToggleButton
                        value="Show Options"
                        selected={val}
                        onChange={onSmash}>
                            Show Options                        
                    </ToggleButton>
                </Stack>
                {/* Pixi Js Canvas */}
                <div ref={ref} display="flex" />
                <DoublePendGraph pendulum={pendAnimate} />
            </Stack>
        </div>
    )
}