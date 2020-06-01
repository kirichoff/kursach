import React, {Component} from 'react'
import '../style/catalogNavbar.css'
import Input from "rambler-ui/Input";
import Button from "rambler-ui/Button";
import CategoryPiker from "./CategoryPiker";
import {EditIcon} from "rambler-ui/icons/forms";
import {Link} from "react-router";
import Slider,{Range} from 'rc-slider';
import 'rc-slider/assets/index.css'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range2 = createSliderWithTooltip(Slider.Range);

export default class CatalogNavbar extends Component {
    render() {
        let isAdmin = this.props.isAdmin;
        let nav = this.props.Nav
        console.log('Nav', nav);
        return (
            <div className={'catalogNavbar'}>
                <div style={{width: '14vw', marginBottom: 15}}>
                    <h3>Категории {isAdmin ? <Link to={'/Category'}><EditIcon/></Link> : null} </h3>
                    <CategoryPiker onChange={(id) => this.props.onChange({...nav,category: id})}
                    />
                    {/*<h5>Цена от</h5>*/}
                    {/*<Input*/}
                    {/*    value={nav.min}*/}
                    {/*    onChange={(value) =>  this.props.onChange({...nav,min: value.target.value})}*/}
                    {/*    type={'number'}/>*/}
                    {/*<h5>До</h5>*/}
                    {/*<Input value={nav.max}*/}
                    {/*       onChange={(value) => this.props.onChange({...nav,max: value.target.value})}*/}
                    {/*       type={'number'}/>*/}
                    <div style={{padding: '10% 21%'}}>
                        <Button onClick={() => this.props.onClick()}>подобрать</Button>
                    </div>
                    <h5>Цена</h5>
                    <Range2
                        min={0} max={99999}
                        defaultValue={[nav.min,nav.max]}
                        tipFormatter={value => `${value} у.е`}
                        tipProps = {{placement: 'bottom'}}
                        onChange={(value)=>
                            this.props.onChange({
                                ...nav,
                                min: value[0],
                                max: value[1]
                            })
                        }
                    />
                    <h5 style={{marginTop: 20}}>Рейтинг</h5>

                    <Range
                        min={0} max={5}
                        defaultValue={[nav.minRating,nav.maxRating]}
                        marks={{ 0:0,1:1,2:2,3: 3, 4: 4, 5: 5 }}
                        onChange={(value)=>
                            this.props.onChange({
                                ...nav,
                                minRating: value[0],
                                maxRating: value[1]
                            })
                        }
                    />

                    {/*<h5>Цена от</h5>*/}
                    {/*<ReactSlider*/}
                    {/*    className="horizontal-slider"*/}
                    {/*    thumbClassName="example-thumb"*/}
                    {/*    trackClassName="example-track"*/}
                    {/*    defaultValue={[1,9999999]}*/}
                    {/*    min={1}*/}
                    {/*    width={'1000px'}*/}
                    {/*    max={9999999}*/}
                    {/*    step={1}*/}
                    {/*    ariaLabel={['Leftmost thumb', 'Middle thumb', 'Rightmost thumb']}*/}
                    {/*    onChange={(value)=> {*/}
                    {/*        console.log(value)*/}
                    {/*        this.props.onChange({*/}
                    {/*        ...nav,*/}
                    {/*        min: value[0],*/}
                    {/*        max: value[1]*/}
                    {/*    })} }*/}
                    {/*    renderThumb={*/}
                    {/*        (props, state) =>*/}
                    {/*    <div {...props}>*/}
                    {/*                {state.valueNow}*/}
                    {/*            </div>}*/}
                    {/*    pearling*/}
                    {/*    minDistance={10}*/}
                    {/*/>*/}
                </div>
            </div>
        )
    }
}
