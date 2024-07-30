import { Stack, Button } from '@mui/material';
import { CustomSlider } from './CustomSlider';
import { useState } from 'react';
import dpAnimation from "../dpAnimation.js";

export const QueryDamper = ({ pendulum }) => {
    const [damp, setDamp] = useState(pendulum.getDamp() / 0.02) // Scaling factor. We map values of [0, 100] to [0, 2]

    return (
        <div>
            <Stack direction="row" spacing={6}>
                <CustomSlider name="Damping" step={1} min={0} max={100} val={damp} onChange={handleDampChange} />
                <Button value="Share" variant="outlined" onClick={handleShareClick} style={{ height: 40, marginTop: 4}}>
                    Share                     
                </Button>
            </Stack>
        </div>
    )

    function handleDampChange(e, val) {
        // The 0.02 is for scaling. We map values of [0, 100] to [0, 2]
        pendulum.setDamp(val * 0.02)
        setDamp(val) 
    }

    function handleShareClick() {
        const baseLink = window.location.href.split('?')[0]
        // Gets all the methods in the pendulum animation class that have the word 'set' in them
        // These are the methods that set the parameters for the pendulum and are necessary to have
        // in the query params. We remove the 'set' word and use just the main attribute for the 
        // query param name. This isn't necessary but looks cleaner. The index.js file handles
        // the query params based on this format
        var methods = Object.getOwnPropertyNames(dpAnimation.prototype)
            .filter(i => i.includes('set'))
            .map(i => i.replace('set', 'get'))
        // Now we get all the required parameters
        var queryParam = '?'
        for (var i = 0; i < methods.length; i++) {
            if (typeof pendulum[methods[i]] === 'function') {
                queryParam += methods[i].replace('get', '') + '=' + pendulum[methods[i]]() + '&'
            }
        }
        // Write to clipboard
        navigator.clipboard.writeText(baseLink + queryParam);
    }
}