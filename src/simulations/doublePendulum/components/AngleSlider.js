import { Stack } from '@mui/material';
import { CustomSlider } from './CustomSlider';
import { useState } from 'react';
import { DefaultDoublePend } from '../../../constants';

export const AngleSlider = ({ pendulum }) => {
    const [angle1, setAngle1] = useState(pendulum.getAngle1())
    const [angle2, setAngle2] = useState(pendulum.getAngle2())

    return (
        <div>
            <Stack direction="row" spacing={6}>
                <CustomSlider name="Angle 1" step={0.01} min={0} max={7} val={angle1} onChange={handleAngleChange1} />
                <CustomSlider name="Angle 2" step={0.01} min={0} max={7} val={angle2} onChange={handleAngleChange2} />
            </Stack>
        </div>
    )

    function handleAngleChange1(e, val) {
        pendulum.setAngle1(val)
        setAngle1(val) 
    }

    function handleAngleChange2(e, val) {
        pendulum.setAngle2(val)
        setAngle2(val) 
    }
}