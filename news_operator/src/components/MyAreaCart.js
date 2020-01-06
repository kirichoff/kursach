import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export default class MyAreaCart extends PureComponent {
    render() {
        return (
            <AreaChart
                width={500}
                height={400}
                data={this.props.data}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis label={{value:'оценка',angle:10}} dataKey="ratingValue" />
                <YAxis  />
                <Tooltip />
                <Area name={'количесвто'} type="monotone" dataKey="count" stackId="1" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        );
    }
}
