import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import MyChart from "../components/MyChart";
import {rest} from "../rest/rest";
import '../style/StatsPage.css'
import MyChart2 from "../components/MyChart2";
import MyAreaCart from "../components/MyAreaCart";
import './digital.svg'
import {Button} from "rambler-ui";
let reports = [
    ["количестве заказанной продукции",'ordersCount'],
    ["Топ самой продаваемой продукции",'mostPopular'],
    ["Зазкачики",'Customers'],
    ["Прайс лист",'priceList']
]
function StatsPage(props) {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    useEffect(() => {
        rest.GetItemStats().then(res => res.length ? setData(res) : null);
        rest.GetItemStatsPrice().then(res => res.length ? setData2(res) : null);
        rest.GetRatingStats().then(res => res.length ? setData3(res) : null)
    }, []);

    console.log(data2)
    return (
        <Layout>
            <div style={{width: '120%'}}>
                <div>
                    <h1 className={'section'}>Отчеты</h1>

                    {
                        reports.map(item=>
                            <div className={'repContainer'}>
                                <span className={'repText'} >{item[0]}</span>
                                <span className={'repButton'}>
                                    <Button
                                        href={'/docx/'+item[1]}
                                        rounded={true}
                                    >
                                        <span style={{fontSize: '20px'}}>docx</span>
                                   <img style={{width: 30}}  src={'digital.svg'}/>
                                    </Button>
                                </span>
                            </div>
                        )
                    }



                </div>
                <div>
                    <h1 className={'section'}>Графики</h1>
                <div style={{display: 'inline-block'}}>
                    <h1 style={{textAlign: 'center'}}>Популярность товара</h1>
                    <MyChart
                        dataKey={'count'}
                        xAxis={'header'}
                        yAxis={'count'}
                        name={'количесвто'}
                        data={data}/>
                </div>
                <div style={{display: 'inline-block'}}>
                    <h1 style={{textAlign: 'center'}}>Цены на товары</h1>
                    <MyChart
                        dataKey={'price'}
                        xAxis={'header'}
                        yAxis={'price'}
                        name={'цена'}
                        data={data2}/>
                </div>
                </div>
                {/*<MyAreaCart data={data3}/>*/}
            </div>
        </Layout>
    );
}

export default StatsPage;
