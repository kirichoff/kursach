import React, {Component} from 'react';
import  {connect} from 'react-redux'
import '../style/Style.css'
import Bar from "./Bar";
import ImageUpload from "./Editor";
import date from "date-and-time";
class NewsPage extends Component {
    render() {
        let data = new Date()
        date.format(data,'MMM. DD YYYY')
        let opt  = { year: 'numeric', month: 'long', day: 'numeric' };
        return (
            <div className={'newspage-div'}>
                {
                 //   this.props.base.addNews.map(x=> <div>{x.text} иaaa еще id {x.id}</div>)
                }
                <Bar/>
                <span className={"header-style"} >
                    {this.props.header}
                </span>
                <img src={this.props.img}
                    className="img-style">
                </img>

                <div className="date">
                    {data.toLocaleDateString('ru-RU',opt)}
                    </div>
                <p className="paragraph-style">
                    {/*{this.props.text}*/}
                    <ImageUpload
                        toolbar = {true}
                        readonly = {true}
                        contentState = {this.props.text}
                    />
                </p>
                </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(NewsPage);
