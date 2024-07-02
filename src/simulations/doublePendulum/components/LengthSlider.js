import { Stack } from '@mui/material';
import { CustomSlider } from './CustomSlider';
import { useState } from 'react';
import { DefaultDoublePend } from '../../../constants';

export const LengthSlider = ({ pendulum }) => {
    const [len1, setLen1] = useState(DefaultDoublePend.defaultLen1)
    const [len2, setLen2] = useState(DefaultDoublePend.defaultLen2)

    return (
        <div>
            <Stack direction="row" spacing={6}>
                <CustomSlider name="Length 1" step={0.01} min={0.01} max={3} val={len1} onChange={handleLenChange1} />
                <CustomSlider name="Length 2" step={0.01} min={0.01} max={3} val={len2} onChange={handleLenChange2} />
            </Stack>
        </div>
    )

    function handleLenChange1(e, val) {
        pendulum.setLen1(val)
        setLen1(val) 
    }

    function handleLenChange2(e, val) {
        pendulum.setLen2(val)
        setLen2(val) 
    }
}