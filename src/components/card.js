import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
import Columns from "react-columns"
import Form from "react-bootstrap/Form"


function CARDO(props) {
    return (
        <div>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.cases}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small>{props.last}</small>
            </Card.Footer>
        </div>


    )
}
export default CARDO