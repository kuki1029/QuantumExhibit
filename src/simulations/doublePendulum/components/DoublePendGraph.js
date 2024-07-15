import { React, useState } from 'react';
import Plot from 'react-plotly.js';

export const Graph = ({ x, y }) => {
    const [col, setCol] = useState('black')


    return (
            <Plot
            style={{ display: 'none' }}
        data={[
          {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }
        ]}
        layout={ {plot_bgcolor:`${col}`, paper_bgcolor: `${col}`, font: {
            family: 'Courier New, monospace',
            size: 18,
            color: 'white'
          }, title: 'A Fancy Plot'} }
      />

    )


}