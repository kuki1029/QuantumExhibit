import { Stack, ToggleButton } from '@mui/material';
import { useState } from 'react';

export const TraceButton = ({ pendulum }) => {
    const [trace1, setTrace1] = useState(pendulum.showTrace1)
    const [trace2, setTrace2] = useState(pendulum.showTrace2)

    return (
        <div>
            <Stack direction="row" spacing={6}>
                <ToggleButton value="Show Trace 1" selected={trace1} onChange={handleTraceChange1} style={{ height: 40, marginTop: 4}}>
                    Show Trace 1                       
                </ToggleButton>
                <ToggleButton value="Show Trace 2" selected={trace2} onChange={handleTraceChange2} style={{ height: 40, marginTop: 4}}>
                    Show Trace 2                      
                </ToggleButton>
            </Stack>
        </div>
    )

    function handleTraceChange1() {
        setTrace1(!trace1) 
        pendulum.setTrace1(!trace1)
    }

    function handleTraceChange2() {
        setTrace2(!trace2) 
        pendulum.setTrace2(!trace2)
    }
}