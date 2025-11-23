import { Stack } from '@mui/material';
import { CustomSlider } from './CustomSlider';
import { useState, useEffect } from 'react';

export const AngleSlider = ({ pendulum }) => {
    const [angle1, setAngle1] = useState(pendulum.getAngle1())
    const [angle2, setAngle2] = useState(pendulum.getAngle2())

    useEffect(() => {
        pendulum.setAngleCallback(setAngle1, setAngle2)
    }, [])

    return (
        <div>
            <Stack direction="row" spacing={6}>
                <CustomSlider 
                    name="Angle 1" 
                    step={0.01} 
                    min={0} 
                    max={Math.PI * 2} 
                    val={angle1} 
                    onChange={handleAngleChange1} 
                    handleLabel={displayLabel} />
                <CustomSlider 
                    name="Angle 2" 
                    step={0.01} 
                    min={0} 
                    max={Math.PI * 2} 
                    val={angle2} 
                    onChange={handleAngleChange2} 
                    handleLabel={displayLabel} />
            </Stack>
        </div>
    )

    function handleAngleChange1(e, val) {
        if (Math.abs(val - Math.PI) < 0.1) {
            setAngle1(Math.PI);
            pendulum.setAngle1(Math.PI)
            return;
        } else if (Math.abs(val - (2 * Math.PI)) < 0.1) {
            setAngle1(2 * Math.PI);
            pendulum.setAngle1(2 * Math.PI)
            return;
        }
        pendulum.setAngle1(val)
        setAngle1(val) 
    }

    function handleAngleChange2(e, val) {
        if (Math.abs(val - Math.PI) < 0.1) {
            setAngle2(Math.PI);
            pendulum.setAngle2(Math.PI)
            return;
        } else if (Math.abs(val - (2 * Math.PI)) < 0.1) {
            setAngle2(2 * Math.PI);
            pendulum.setAngle2(2 * Math.PI)
            return;
        }
        pendulum.setAngle2(val)
        setAngle2(val) 
    }

    function displayLabel(val) {
        if (Math.abs(val - Math.PI) < 0.1) {
            return 'π';
        } else if (Math.abs(val - (2 * Math.PI)) < 0.1) {
            return '2π';
        }
        return val
    }
}