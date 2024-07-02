import { ToggleButton, Stack, useMediaQuery, useTheme  } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Screen } from "../../../constants.js";

// Shows the canvas and show options button
export const Canvas = ({ pendAnimate, val, onSmash }) => {
    const ref = useRef(null);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const moveButton = () => {
        if (!val) {
            return false
        } else {
            return matches && val
        }
    }
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
                {/* Pixi Js Canvas */}
                <div ref={ref} display="flex" />
                <Stack
                    direction="row"
                    justifyContent={moveButton() ? "flex-start" : "flex-end"}
                    alignItems="center"
                    spacing={2}
                    maxWidth={Screen.width}
                >
                    <ToggleButton
                        value="Show Options"
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