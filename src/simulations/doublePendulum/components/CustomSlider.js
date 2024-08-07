import { Slider, Typography, Box } from '@mui/material';

export const CustomSlider = ({ name, step, min, max, onChange, val, handleLabel }) => {
    return (
        <div>
            <Box sx={{ width: 140 }} >
                {/* Slider Label */}
                <Typography>
                    {name}
                </Typography>
                {/* Length Slider */}
                <Slider
                    value={val}
                    valueLabelFormat={handleLabel}
                    onChange={onChange}
                    size="small"
                    step={step}
                    min={min}
                    max={max}
                    valueLabelDisplay="auto"/>
            </Box>
        </div>
    )
}