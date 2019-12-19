import React, {useState} from 'react';
import MyCarousel from "../components/MyCarousel";
import Layout from "../components/Layout";
import '../style/Home.css'
const array = [
    {url: './images/index-bg-1.jpg'},
    {url: './images/index-bg-2.jpg'},
    {url: './images/index-bg-3.jpg'}
];
function Home(props) {

    return (
        <Layout>
            <div style={{width: '100%'}} >
            <MyCarousel items ={ array }/>
            <div style={{margin:'70px'}} >
                <div className={'item-home'} >
                <img src={'./images/bus.png'} />
                <div>
                Продукция Минского автомобильного завода – это техника, соответствующая экологическим стандартам Евро-2, Евро-3, Евро-4, Евро-5, Евро-6.
                Под маркой «МАЗ» с конвейера завода сходят седельные тягачи, бортовые автомобили, шасси под установку различного спецоборудования. Всего более 500 моделей и модификаций.</div>
                </div>
                <div className={'item-home'} >
                <img src={'./images/maz_grating.jpg'} alt={''}/>
                <div>
                    С 1995 года Минский автомобильный завод выпускает пассажирскую технику. Городские, междугородние, туристические и специальные автобусы успешно работают на различных маршрутах по всему миру. За свой дизайн, функциональность, качество и надежность они неоднократно были удостоены высоких наград на международных автомобильных салонах и специализированных выставках. Сегодня пассажирская техника МАЗ представлена 15 моделями в более чем ста исполнениях.
                </div>
                </div>
            </div>
            </div>
        </Layout>
    );
}

export default Home;
