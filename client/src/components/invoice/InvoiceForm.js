/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const InvoiceForm = () => {

    const history = useHistory();
    const location = useLocation();

    const shortid = require('shortid');
    const InvoiceId = useRef();
    const Bill_Address = useRef();
    const Bill_City = useRef();
    const Bill_State = useRef();
    const Bill_PhoneN = useRef();
    const Ship_Address = useRef();
    const Ship_City = useRef();
    const Ship_State = useRef();
    const Ship_PhoneN = useRef();




    const [validated, setValidated] = useState(false);
    const [billproducts, setbillproducts] = useState([]);
    const [totalinvoice, settotalinvoice] = useState();

    const sepdata = () => {
        if (location.state) {
            setbillproducts(location.state.detail)
            settotalinvoice(location.state.totalamount)
        }
    }

    useEffect(() => { sepdata() }, []);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            event.stopPropagation();
            event.preventDefault();

            const invoice_id = InvoiceId.current.value
            const billing = {
                billing_address: Bill_Address.current.value,
                state: Bill_City.current.value,
                city: Bill_State.current.value,
                phone: Bill_PhoneN.current.value,
            };
            const shipping = {
                shipping_address: Ship_Address.current.value,
                state: Ship_City.current.value,
                city: Ship_State.current.value,
                phone: Ship_PhoneN.current.value
            }



            const payload = {
                invoice_id, billing, shipping, product_info: billproducts, totalinvoice
            }


            const sendtoDB = axios.post("http://localhost:4000/creatPayment", payload)
            console.log(sendtoDB.data, "======")



            history.push({
                pathname: '/Paymentpage',
                state: { invoice_id, totalinvoice }
            });
        }

        setValidated(true);

    };

    return (
        <>
            <Card className="m-5 p-5 " style={{ width: '' }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Invoice Id</Form.Label>
                        <Form.Control required type="text" placeholder="Billing address" disabled defaultValue={shortid.generate()} ref={InvoiceId} />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Card.Title>Billing Address</Card.Title>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Address</Form.Label>
                            <Form.Control required type="text" placeholder="Billing address" defaultValue="vision infotech" ref={Bill_Address} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" required ref={Bill_City} />
                            <Form.Control.Feedback type="invalid"> Please provide a valid city. </Form.Control.Feedback>
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="4" controlId="validationCustom04">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" placeholder="State" required ref={Bill_State} />
                            <Form.Control.Feedback type="invalid"> Please provide a valid state. </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group as={Col} md="4" controlId="validationCustom05">
                            <Form.Label> Phone Number</Form.Label>
                            <Form.Control type="text" placeholder=" Phone Number" required ref={Bill_PhoneN} />
                            <Form.Control.Feedback type="invalid"> Please provide a  Phone Number </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <hr />
                    <Card.Title>Shipping Address</Card.Title>

                    <Row className="mb-3">

                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Address</Form.Label>
                            <Form.Control required type="text" placeholder="Billing address" defaultValue="vision infotech" ref={Ship_Address} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" required ref={Ship_City} />
                            <Form.Control.Feedback type="invalid"> Please provide a valid city. </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom04">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" placeholder="State" required ref={Ship_State} />
                            <Form.Control.Feedback type="invalid"> Please provide a valid state. </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustom05">
                            <Form.Label> Phone Number</Form.Label>
                            <Form.Control type="text" placeholder=" Phone Number" required ref={Ship_PhoneN} />
                            <Form.Control.Feedback type="invalid"> Please provide a  Phone Number </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <hr />

                    <Button type="submit" >Submit form</Button>
                </Form>
            </Card>
        </>
    )
}

export default InvoiceForm