import { Stack } from '@mui/material';
import { CustomSlider } from './CustomSlider';
import { useState } from 'react';
import { DefaultDoublePend } from '../../../constants';


export const MassSlider = ({ pendulum }) => {
    const [mass1, setMass1] = useState(DefaultDoublePend.mass1)
    const [mass2, setMass2] = useState(DefaultDoublePend.mass2)

    return (
        <div>
            <Stack direction="row" spacing={6}>
                <CustomSlider name="Mass 1" step={0.01} min={0} max={20} val={mass1} onChange={handleMassChange1}/>
                <CustomSlider name="Mass 2" step={0.01} min={0} max={20} val={mass2} onChange={handleMassChange2}/>
            </Stack>
        </div>
    )

    function handleMassChange1(e, val) {
        pendulum.setMass1(val)
        setMass1(val) 
    }

    function handleMassChange2(e, val) {
        pendulum.setMass2(val)
        setMass2(val) 
    }
}