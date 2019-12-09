import React, {Component} from 'react';
import '../style/ImgBox.css'
import  {connect} from 'react-redux'
import date from 'date-and-time';
import {Link} from "react-router";

class News extends Component {
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(){

    }
    render() {
        console.log('date',this.props.date)
        let data = new Date(this.props.date)
        date.format(data,'MMM. DD YYYY')
        let opt  = { year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <Link
                to={`/news/${this.props.id}`}
            >
                <div className={`ImageBox ${this.props.imgStyle}`}
                     style={{backgroundImage:"url(" + this.props.src + ")"}}
                ><div className={'inner-shadow'}>
                    <span className={"mainText"} >
                        <div className={'linkstyle'} >{this.props.text}</div>
                        <div style={{marginTop: "1.3vh",color: "#fff1f3"}} >
                            {data.toLocaleDateString('ru-RU',opt)}
                        </div>
                    </span>
                </div>
                    </div>
            </Link>
        );
    }
}
function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(News);
