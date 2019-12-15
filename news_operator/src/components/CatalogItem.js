import React from 'react';
import '../style/catalogItem.css'
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router";
import Button from "rambler-ui/Button";

function CatalogItem(props) {
    return (
            <Card style={{marginBottom: 10,marginLeft:10 }}>
                <Card.Img variant="top" src={props.previewImage} />
                <Card.Body>
                    <Card.Title>{props.header}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <div>
                        {props.link}
                        {props.cart}
                        {props.delete}
                    </div>
                </Card.Body>
            </Card>
    );
}

export default CatalogItem;
