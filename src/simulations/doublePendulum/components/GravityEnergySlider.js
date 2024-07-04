import { Stack, ToggleButton } from '@mui/material';
import { CustomSlider } from './CustomSlider';
import { useState } from 'react';

export const GravityEnergySlider = ({ pendulum }) => {
    const [gravity, setGravity] = useState(pendulum.gravity)
    const [energy, setEnergyButton] = useState(pendulum.showEnergy)

    return (
        <div>
            <Stack direction="row" spacing={6}>
                <CustomSlider name="Gravity" step={0.01} min={0} max={50} val={gravity} onChange={handleGravityChange} />
                <ToggleButton value="Show Energy" selected={energy} onChange={handleEnergyChange} style={{ height: 40, marginTop: 4}}>
                    Show Energy                        
                </ToggleButton>
            </Stack>
        </div>
    )

    function handleGravityChange(e, val) {
        pendulum.setGravity(val)
        setGravity(val) 
    }

    function handleEnergyChange() {
        setEnergyButton(!energy) 
        pendulum.setEnergyDisplay(!energy)
    }
}