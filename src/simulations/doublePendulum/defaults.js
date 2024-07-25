import { SimColors } from "../../constants"

// Types of buttons for our function to detect. Enum
export const buttonType = {
    reset: 'reset',
    angle: 'angle',
    speed: 'speed',
    energy: 'energy'
}

// Defaults for the Plotly graph. Helps simplify the main file
const theme = localStorage.getItem("theme")
const colors = {
    bg: (theme === 'light') ? SimColors.bgLight : SimColors.bgDark,
    text: (theme === 'light') ? SimColors.black : SimColors.white,
    graph: (theme === 'light') ? SimColors.graphLight : SimColors.graphDark
}

// Default data template for the plotting
export const regularDataOptions = {
    x: [],
    y: [],
    mode: 'lines',
    type: 'scatter',
    line: {
        color: colors.graph,
        width: 0.5
    }
}
export const barPlotDataOptions = {
    x: ['Potential', 'Kinetic', 'Total'],
    y: [0, 0, 0],
    marker: {
        color: ['#cd7058', '#f9a65a', '#599ad3']
    },
    type: 'bar'
}

const graphButton = [{
    buttons: 
        [{
            args: [{'name': buttonType.reset}],
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
            args: [{'xaxis.type': 'linear', 'yaxis.type': 'linear', 'type': 'scatter', 'name': buttonType.angle}],
            label: 'Angle',
            method: 'restyle'
        },
        {
            args: [{'xaxis.type': 'linear', 'yaxis.type': 'linear', 'type': 'scatter', 'name': buttonType.speed}],
            label: 'Speed',
            method: 'restyle'
        },
        {
            args: [{'xaxis.type': 'category', 'yaxis.type': 'category', 'name': buttonType.energy, }],
            label: 'Energy',
            method: 'restyle'
        }],
        direction: 'down',
        pad: {'r': 10, 't': 10, 'l': 10},
        showactive: false,
        x: 0.18,
        xanchor: 'left',
        y: 1.17,
        yanchor: 'top'
}]

export const layoutDefault = {
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
    updatemenus: graphButton,
}