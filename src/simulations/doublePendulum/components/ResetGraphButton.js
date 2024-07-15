import { Stack, Button, ToggleButton } from '@mui/material';
import { useState } from 'react';

export const ResetGraphButtons = ({ pendulum, showGraph, setShowGraph }) => {

    return (
        <div>
            <Stack direction="row" spacing={6} style={{ marginBottom: 12}} >
                <Button value="Reset" variant="outlined" onClick={handleRestClick} style={{ height: 40, marginTop: 4}}>
                    Reset                     
                </Button>
                <ToggleButton value="Show Graph" selected={showGraph} onChange={setShowGraph} style={{ height: 40, marginTop: 4 }}>
                    Show Graph                    
                </ToggleButton>
            </Stack>
        </div>
    )

    function handleRestClick() {
        pendulum.resetPendulum()
    }
}