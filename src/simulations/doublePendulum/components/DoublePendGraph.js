import { React, useState, useEffect, useRef } from 'react';
import { SimColors } from '../../../constants';
import Plot from 'react-plotly.js';

// Types of buttons for our function to detect
const buttonType = {
    reset: 'reset',
    angle: 'angle',
    speed: 'speed',
    energy: 'energy'
}

export const DoublePendGraph = ({ pendulum }) => {
    // Set intial colors based on users theme
    const theme = localStorage.getItem("theme")
    const colors = {
        bg: (theme === 'light') ? SimColors.bgLight : SimColors.bgDark,
        text: (theme === 'light') ? SimColors.black : SimColors.white,
        graph: (theme === 'light') ? SimColors.graphLight : SimColors.graphDark
    }
    // Stores graph color and other properties
    const lineOptions = {
        color: colors.graph,
        width: 0.5
    }
    const defaultData = {
        x: [],
        y: [],
        mode: 'lines',
        line: lineOptions
    }

    // data is a list of objects that contain info for each trace. Each object contains the 
    // x, y, mode, and line.
    const [data, setData] = useState([])
    const graphButton = [{
        buttons: 
        [{
            args: ['name', buttonType.reset],
            label: 'Reset',
            method: 'relayout'
        }],
        direction: 'left',
        pad: {'r': 10, 't': 10, 'l': 10},
        showactive: false,
        type: 'buttons',
        x: 0.04,
        xanchor: 'left',
        y: 1.17,
        yanchor: 'top'
    },
    {
        buttons: 
        [{
            args: ['name', buttonType.angle],
            label: 'Angle',
            method: 'relayout'
        },
        {
            args: ['name', buttonType.speed],
            label: 'Speed',
            method: 'relayout'
        },
        {
            args: ['name', buttonType.energy],
            label: 'Energy',
            method: 'relayout'
        }],
        direction: 'down',
        pad: {'r': 10, 't': 10, 'l': 10},
        showactive: false,
        x: 0.18,
        xanchor: 'left',
        y: 1.17,
        yanchor: 'top'
    }]
    // Layout needs to be a state for plotly to work properly. 
    const [layout, setLayout] = useState({
        plot_bgcolor: colors.bg,
        paper_bgcolor: colors.bg,
        font: {
            family: 'Raleway,  sans-serif',
            size: 12,
            color: colors.text
        },
        title: 'Double Pendulum Graph',
        datarevision: 0,
        showlegend: false,
        xaxis: { range: [-4, 4], autorange: false },
        yaxis: { range: [-4, 4], autorange: false },
        updatemenus: graphButton
    })


    // Need to avoid JS closures when using setInterval or eventListener
    const savedCallback = useRef()
    const savedCallbackColors = useRef()

    function newData() {
        const pi = Math.PI
        const pendData = pendulum.getPendulumValues()
        // Clean up the data. Bring back angles and speed to domain of 0 to 2pi
        Object.keys(pendData).forEach(val => {
            while (pendData[val] > pi) pendData[val] -= (2 * pi)
            while (pendData[val] < -pi) pendData[val] += (2 * pi)
        })
        const dataCopy = data
        if (data.length === 0) {
            dataCopy.push(defaultData)
        }
        const x = dataCopy[dataCopy.length - 1].x
        const y = dataCopy[dataCopy.length - 1].y
        // Here, we check if there is a large jump in the data points. This large jump implies that 
        // the above while statements were run. This happens when an angle is larger than pi or less 
        // than -pi. We don't want to graph these directly but instead want to find the equivalent angles
        // Once we have the equivalent angle, we cannot simply graph it on plotly as it'll create a line joining
        // the previous point and this new point. This creates a weird line through the middle of the graph.
        // To avoid this, we have to create a new trace.
        if ((Math.abs(pendData.theta1 - x[x.length - 1]) > 1) || (Math.abs(pendData.theta2 - y[y.length - 1]) > 1)) {
            dataCopy.push(defaultData)
        } 
        dataCopy[dataCopy.length - 1].x.push(pendData.theta1)
        dataCopy[dataCopy.length - 1].y.push(pendData.theta2)
        setData(dataCopy)
        setLayout({
            ...layout,
            datarevision: layout.datarevision + 1
        })
    }

    // On every render, we need to update the ref callback to contain new state value
    useEffect(() => {
        savedCallback.current = newData
        savedCallbackColors.current = updateColors
    })

    useEffect(() => {
        updateColors()
        // Call the current callback so we can get the new state variables
        function tick() {
            savedCallback.current();
        }
        function tick2() {
            savedCallbackColors.current();
        }

        window.addEventListener('themeChanged', tick2)
        const interval = setInterval(tick, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <Plot 
            style={{ display: 'block' }}
            data={data}
            layout={layout}
            onRelayout={handleGraphButton}
        />
    )

    function handleGraphButton({ name }) {
        switch(name) {
            case buttonType.reset:
                setData([])
                break

            case buttonType.angle:
                setData([])
                break

            default:
                break
        }

    }


    function updateColors() {
        const theme = localStorage.getItem("theme")
        const colors = {
            bg: (theme === 'light') ? SimColors.bgLight : SimColors.bgDark,
            text: (theme === 'light') ? SimColors.black : SimColors.white,
            graph: (theme === 'light') ? SimColors.graphLight : SimColors.graphDark
        }
        setData(data.map(elem => {
            return {
                ...elem,
                line: {
                    ...elem.line,
                    color: colors.graph
                }
            }
        }))
        setLayout({
            ...layout,
            plot_bgcolor: colors.bg,
            paper_bgcolor: colors.bg,
            datarevision: layout.datarevision + 1,
            font: {
                ...layout.font,
                color: colors.text
            }
        })
        
    }
}