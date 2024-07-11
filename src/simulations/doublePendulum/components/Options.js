import { Grid } from '@mui/material';
import { MassSlider } from './MassSlider';
import { LengthSlider } from './LengthSlider';
import { AngleSlider } from './AngleSlider';
import { GravityEnergySlider } from './GravityEnergySlider';
import { TraceButton } from './TraceButton';

export const Options = ({ pendulum, refresh }) => {
    return (
        <Grid xs={4} sm={4} md={6} item={true} >
            <MassSlider pendulum={pendulum} />
            <LengthSlider pendulum={pendulum} />
            <AngleSlider pendulum={pendulum} />
            <GravityEnergySlider pendulum={pendulum} />
            <TraceButton pendulum={pendulum} />
        </Grid>
    )
}