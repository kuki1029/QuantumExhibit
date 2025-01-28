import { React, useState, useEffect, useRef } from 'react';
import { SimColors, Constant } from '../../../constants';
import Plot from 'react-plotly.js';
import { 
    buttonType,
    regularDataOptions,
    barPlotDataOptions,
    layoutDefault
} from '../defaults';

export const DoublePendGraph = ({ pendulum }) => {
    const pi = Constant.pi
    const [graphType, setGraphType] = useState(buttonType.angle)
    const [maxBarRange, setMaxBarRange] = useState([0, 0])  // Needed to manually set the range for bar plot
    // Bcoz JS stores the array reference in the data options, making a copy of the object doesn't work 
    // as that just gives us a reference to the array. So we have to parse it and restore it to JSON which creates
    // a copy of the array
    const regularDataOptionsCopy = JSON.parse(JSON.stringify(regularDataOptions))

    // data is a Plotly object. Stores all the necessary information to plot the graph
    const [data, setData] = useState([])

    // Layout needs to be a state for plotly to work properly. 
    const [layout, setLayout] = useState(layoutDefault)

    // Need to avoid JS closures when using setInterval or eventListener
    const savedCallback = useRef()
    const savedCallbackColors = useRef()

    function newData() {
        // See which graph needs to be displayed
        if ((graphType === buttonType.angle) || (graphType === buttonType.speed)) {
            addPositionDataToGraph(graphType)
        }
        else if (graphType === buttonType.energy) {
            addEnergyDataToGraph()
        }
    }

    // On every render, we need to update the ref callback to contain new state value
    useEffect(() => {
        savedCallback.current = newData
        savedCallbackColors.current = updateColors
    })

    useEffect(() => {
        updateColors()
        // Call the current callback so we can get the new state variables
        function tick() {savedCallback.current()}
        function tick2() {savedCallbackColors.current()}

        window.addEventListener('themeChanged', tick2)
        const interval = setInterval(tick, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <Plot 
            style={{ display: 'block' }}
            data={data}
            layout={layout}
            onRelayout={(name) => handleGraphButton(name.name)}
            onRestyle={(name) => handleGraphButton(name[0].name)}
        />
    )

    // Handles clicks from the graph buttons
    function handleGraphButton(name) {
        // We set the layout xaxis here again because even thought plotly is supposed
        // to do it automatically based on the args in the graphButton, for some reason
        // it doesn't with the react state
        if (name) setData([])
        switch(name) {
            case buttonType.angle:
                setTypeAxis('linear')
                setGraphType(buttonType.angle)
                break
            case buttonType.speed:
                setTypeAxis('linear')
                setGraphType(buttonType.speed)
                break
            case buttonType.energy:
                setTypeAxis('category')
                setGraphType(buttonType.energy)
                break
            default:
                break
        }
    }

    // Sets the data state for the graph based on the angle or speed values
    function addPositionDataToGraph(graphType) {
        // Based on the graph type, we save only the needed data
        const pendData = pendulum.getPendulumValues()[graphType] // pendData is of type [number, numner] where the number is either theta or omega values of 1 and 2 pendula
        for (let i = 0; i < pendData.length; i++) {
            // Sets the angle or speed to be between -pi and pi
            // Otherwise the graph looks weird with large angles
            while (pendData[i] > pi) pendData[i] -= (2 * pi)
            while (pendData[i] < -pi) pendData[i] += (2 * pi)
        }
        const dataCopy = data
        if (data.length === 0) {
            dataCopy.push(regularDataOptionsCopy)
        }
        // Get last element
        const x = dataCopy[dataCopy.length - 1].x
        const y = dataCopy[dataCopy.length - 1].y
        // Here, we check if there is a large jump in the data points. This large jump implies that 
        // the above while statements were run. This happens when an angle is larger than pi or less 
        // than -pi. We don't want to graph these directly but instead want to find the equivalent angles
        // Once we have the equivalent angle, we cannot simply graph it on plotly as it'll create a line joining
        // the previous point and this new point. This creates a weird line through the middle of the graph.
        // To avoid this, we have to create a new trace.
        if ((Math.abs(pendData[0] - x[x.length - 1]) > 1) || (Math.abs(pendData[1] - y[y.length - 1]) > 1)) {
            dataCopy.push(regularDataOptionsCopy)
        } 

        dataCopy[dataCopy.length - 1].x.push(pendData[0])
        dataCopy[dataCopy.length - 1].y.push(pendData[1])
        setData(dataCopy)
        setLayout({
            ...layout,
            yaxis: {
                ...layout.yaxis,
                range: [-4, 4]
            },
            datarevision: layout.datarevision + 1
        })
    }

    // Adds the barplot data to show the kinetic and potential energy for the pendula
    function addEnergyDataToGraph() {
        const pendEnergy = pendulum.getEnergy()
        setData([{
            ...barPlotDataOptions,
            y: [pendEnergy.pe, pendEnergy.ke, pendEnergy.total]
        }])
        // Find if we need to reset the range bcoz plotly does it weirdly
        const maxBarValue = Object.values(pendEnergy).reduce((a, b) => Math.max(a, b), -Infinity);
        const minBarValue = Object.values(pendEnergy).reduce((a, b) => Math.min(a, b), Infinity);
        if (maxBarValue > maxBarRange[1]) {
            setMaxBarRange([maxBarRange[0], maxBarValue])
        } else if (minBarValue < maxBarRange[0]) {
            setMaxBarRange([minBarValue, maxBarRange[1]])
        }
        setLayout({
            ...layout,
            yaxis: {
                ...layout.yaxis,
                range: maxBarRange
            },
            datarevision: layout.datarevision + 1,
        })
    }

    // Just a helper function to set the axis category for axis
    function setTypeAxis(axisType) {
        setMaxBarRange([0, 0])
        setLayout({
            ...layout,
            xaxis: {
                ...layout.xaxis,
                type: axisType
            },
            datarevision: layout.datarevision + 1
        })
    }

    // Updates colors for the graph based on local storage theme
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