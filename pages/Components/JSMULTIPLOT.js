//import React, { Component } from 'react';
//import Plot from 'react-plotly.js';
import dynamic from 'next/dynamic'

const Plot = dynamic(
    () => import('/node_modules/react-plotly.js'),
    { ssr: false }
)

function JSMULTIPLOT({ Va, Vb, Vc, Tempo }) {
    return (
        <>
            <Plot
                data={[
                    {
                        y: Va,
                        x: Tempo,
                        type: 'scatter',
                        marker: {
                            color: 'rgb(127,127,127)',
                            size: 8
                        },
                        line: {
                            color: 'rgb(127,127,127)',
                            width: 3
                        },
                    },
                    {
                        y: Vb,
                        x: Tempo,
                        type: 'scatter',
                        marker: {
                            color: 'rgb(196,78,82)',
                            size: 8
                        },
                        line: {
                            color: 'rgb(196,78,82)',
                            width: 3
                        },
                    },
                    {
                        y: Vc,
                        x: Tempo,
                        type: 'scatter',
                        marker: {
                            color: 'rgb(85,168,104)',
                            size: 8
                        },
                        line: {
                            color: 'rgb(85,168,104)',
                            width: 3
                        },
                    }
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
                    margin: { t: 0.1, b: 0.1, l: 0.1, r: 0.1 }


                }}
                config={{ staticPlot: true, responsive: true }}

            />
        </>
    )
}
export default JSMULTIPLOT



