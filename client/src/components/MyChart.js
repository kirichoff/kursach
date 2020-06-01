import React, { PureComponent } from 'react';
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, BarChart,
} from 'recharts';
import Cell from "recharts/lib/component/Cell";
import Brush from "recharts/lib/cartesian/Brush";
const randomColor = require('randomcolor');

 function MyChart (props) {
        return (
            <BarChart
                width={600}
                height={400}
                data={props.data}
            >
                <CartesianGrid strokeDasharray="3 3"  />
                <XAxis   dataKey="header" />
                <YAxis dataKey={props.dataKey} />
                <Tooltip />
                <Legend />
                <Brush dataKey="name" height={30} stroke="#8884d8" />
                <Bar   dataKey={props.dataKey} name={props.name} barSize={30} fill="#413ea0">
                    {
                        props.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={randomColor()} />
                        ))
                    }
                </Bar>
            </BarChart>
        );
}
export default MyChart;
