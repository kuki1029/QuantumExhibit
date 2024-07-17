import { React, useState, useEffect, useRef } from 'react';
import { SimColors } from '../../../constants';
import Plot from 'react-plotly.js';

export const DoublePendGraph = ({ pendulum }) => {
    // Set intial colors based on users theme
    const theme = localStorage.getItem("theme")
    const [colors, setColors] = useState({
        bg: (theme === 'light') ? SimColors.bgLight : SimColors.bgDark,
        text: (theme === 'light') ? SimColors.black : SimColors.white,
        graph: (theme === 'light') ? SimColors.graphLight : SimColors.graphDark
    })
    const [data, setData] = useState([{
        x: [],
        y: [],
        mode: 'markers',
        marker: {
            size: 2,
            symbol: 'circle',
            color: 'white'
        }
    }])

    // Need to avoid JS closures when using setInterval
    const savedCallback = useRef()

    function newPosition() {
        const pi = Math.PI
        const pendData = pendulum.getPendulumValues()
        // Clean up the data. Bring back angles and speed to domain of 0 to 2pi
        Object.keys(pendData).forEach(val => {
            if (Math.abs(pendData[val]) > pi) {
                pendData[val] = pendData[val] % pi
            }             
        })
        console.log(pendData)
        const newX = x[x.length - 1]
        setX([
            ...x, pendData.theta1
          ])
        setY([
            ...y, pendData.theta2
        ])
    }

    // On every render, we need to update the ref callback to contain new state value
    useEffect(() => {
        savedCallback.current = newPosition
    })

    // Get position of pendulum
    useEffect(() => {
        updateColors()
        // Call the current callback so we can get the new state variables
        function tick() {
            savedCallback.current();
        }
        const interval = setInterval(tick, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <Plot
            style={{ display: 'block' }}
            data={[
            {
                x: [[1,2,3], [6,7,8]],
                y: [[1,2,3], [6,7,8]],
                mode: 'markers',
                marker: {
                    size: 2,
                    symbol: 'circle',
                    color: 'white'
                }
            },
            {
                x: [[1,2,3], [3,7,8]],
                y: [[1,2,3], [2,5,6]],
                mode: 'lines'
            }
            ]}  
            layout={{ 
                plot_bgcolor:`${colors.bg}`, 
                paper_bgcolor: `${colors.bg}`, 
                font: {
                    family: 'Raleway,  sans-serif',
                    size: 12,
                    color: `${colors.text}`
                },
                title: 'Double Pendulum Graph'} }
        />
    )

    function updateColors() {
        window.addEventListener('themeChanged', () => {
            if (localStorage.getItem("theme") === 'light') {
                setColors({
                    bg: SimColors.bgLight,
                    text: SimColors.black,
                    graph: SimColors.graphLight,
                })
            } else {
                setColors({
                    bg: SimColors.bgDark,
                    text: SimColors.white,
                    graph: SimColors.graphDark,
                })
            }
        })
    }
}