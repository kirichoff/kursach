import React from 'react';
import '../style/catalogItem.css'
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';


function CatalogItem(props) {
    return (
            <Card style={{marginBottom: 10,marginLeft:10,minWidth: 210}}>
                <Card.Img variant="top" src={props.previewImage} />
                <Card.Body>
                    <Card.Title>{props.header}</Card.Title>

                        <div style={{color: '#0053E6' }} >{props.price.toFixed(1)} у.е.</div>
                        <div style={{height: '1.2em',
                            overflow: 'hidden',
                            width: '13vw'}}>
                            {props.description}
                        </div>

                    <div>
                        {props.link}
                        {props.cart}
                    </div>
                    <div style={{  marginLeft: 'auto%'}} >{props.delete}</div>
                </Card.Body>
            </Card>
    );
}

export default CatalogItem;
