import React, {Component} from 'react';
import {connect} from "react-redux";
import Layout from "../components/Layout";

class About extends Component {
    render() {
        return (
                <Layout>
                <h1>Контактная информация</h1>
                    <p>Вы можете связаться с нами по телефону. Воспользуйтесь, пожалуйста, номерами телефонов, представленными ниже.
                        Адрес предприятия: 220021, Республика Беларусь, г. Минск, ул.Социалистическая, 2</p>
                    <h3>Телефоны Call-центра:</h3>
                    <p style={{backgroundColor: '#e9e9e9',borderRadius: 20,padding: '25px'}} >
                        + 8000 217 22 22  - звонок бесплатный (кроме  Республики Беларусь)

                        Звонок бесплатный для следующих регионов: Российская Федерация, Украина (кроме абонентов операторов мобильной связи ЧАО "Киевстар" и ООО "Лайфселл"), Казахстан, Узбекистан, Литва, Латвия, Польша, Германия, Венгрия, Болгария, Чехия

                       <div> (+375 17) 217-22-22</div>


                       <b> Режим работы телефонных линий: с 8.00 до 19.30 по минскому времени.</b>
                    </p>
                </Layout>
        );
    }
}
function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(About);
