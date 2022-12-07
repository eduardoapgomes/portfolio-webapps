//import React, { Component } from 'react';
//import Plot from 'react-plotly.js';
import dynamic from 'next/dynamic'

const Plot = dynamic(
  () => import('/node_modules/react-plotly.js'),
  { ssr: false }
)

function JSPLOT({X,Y}) {
  //console.log(X)
  return (
    <>
        <Plot
          data={[
            {
              x:X,
              y:Y,
              type: 'scatter',
              marker: {
                color: 'rgb(219, 64, 82)',
                size: 12
              },
              line: {
                color: 'rgb(219, 64, 82)',
                width: 3
              },

            },
          ]}

          layout={{
            width: 300, height: 200,

            xaxis: {
              title: 'Tempo (s)',
              showgrid: true,
              zeroline: false,
              automargin: true,
              showgrid: true,
              showline: true,
            },
            yaxis: {
              title: 'Tensão (p.u)',
              showgrid: true,
              showline: true,
              automargin: true
            },
            tickfont: {
              family: 'verdana',
              size: 12,
              color: 'rgb(82, 82, 82)',

            },
            margin: {t:0.1,b:0.1,l:0.1,r:0.1}


          }}
          config={{ staticPlot: true, responsive: true }}

        />
    </>
  )
}
export default JSPLOT
