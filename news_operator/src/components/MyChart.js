import React, { PureComponent } from 'react';
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, BarChart,
} from 'recharts';
import Cell from "recharts/lib/component/Cell";
import { scaleOrdinal } from 'd3-scale';
import {  schemeSet3 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeSet3).range();

 function MyChart (props) {
        return (
            <BarChart
                width={500}
                height={400}
                data={props.data}
            >
                <CartesianGrid strokeDasharray="3 3"  />
                <XAxis   dataKey="header" />
                <YAxis dataKey={props.dataKey} />
                <Tooltip />
                <Legend />
                <Bar   dataKey={props.dataKey} name={props.name} barSize={30} fill="#413ea0">
                    {
                        props.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))
                    }
                </Bar>
            </BarChart>
        );
}
export default MyChart;
