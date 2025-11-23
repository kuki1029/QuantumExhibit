import { Stack, ToggleButton } from '@mui/material';
import { CustomSlider } from './CustomSlider';
import { useState } from 'react';
import { Constant } from '../../../constants';

export const GravityEnergySlider = ({ pendulum }) => {
    const [gravity, setGravity] = useState(pendulum.getGravity())
    const [energy, setEnergyButton] = useState(pendulum.showEnergy)

    return (
        <div>
            <Stack direction="row" spacing={6}>
                <CustomSlider name="Gravity" step={0.1} min={0} max={50} val={gravity} onChange={handleGravityChange} />
                <ToggleButton value="Show Energy" selected={energy} onChange={handleEnergyChange} style={{ height: 40, marginTop: 4}}>
                    Show Energy                        
                </ToggleButton>
            </Stack>
        </div>
    )

    // This condition helps to snap the slider to a specific value which is gravity val in this case
    function handleGravityChange(e, val) {
        if (Math.abs(val - Constant.gravity) < 1) {
            setGravity(Constant.gravity);
            pendulum.setGravity(val)
            return;
        }
        pendulum.setGravity(val)
        setGravity(val) 
    }

    function handleEnergyChange() {
        setEnergyButton(!energy) 
        pendulum.setEnergyDisplay(!energy)
    }
}