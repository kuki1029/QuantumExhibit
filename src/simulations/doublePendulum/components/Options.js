import { Grid, Stack, ToggleButton } from '@mui/material';
import { CustomSlider } from './CustomSlider';
import { MassSlider } from './MassSlider';
import { LengthSlider } from './LengthSlider';
import { AngleSlider } from './AngleSlider';
import { GravityEnergySlider } from './GravityEnergySlider';

export const Options = ({ pendulum }) => {

    return (
            <Grid xs={4} sm={4} md={6} item={true} >
                <MassSlider pendulum={pendulum} />
                <LengthSlider pendulum={pendulum} />
                <AngleSlider pendulum={pendulum} />
                <GravityEnergySlider pendulum={pendulum} />
                {/* 
                <Stack direction="row" spacing={6}>
                    <CustomSlider name="Gravity" step={0.01} min={0} max={4}/>
                    <ToggleButton style={{ height: 40, marginTop: 4}}>
                        Show Energy                        
                    </ToggleButton>
                </Stack>
                <Stack direction="row" spacing={6}>
                    <ToggleButton style={{ height: 40, marginTop: 4}} >
                        Trace 1                      
                    </ToggleButton>
                    <ToggleButton style={{ height: 40, marginTop: 4}}>
                        Trace 2                       
                    </ToggleButton>
                </Stack> */}
            </Grid>
        )
}