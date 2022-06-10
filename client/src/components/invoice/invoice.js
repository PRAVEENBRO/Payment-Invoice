import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Card, Col, Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';

const Invoice = () => {
    const location = useLocation();

    const [invoiceDAta, setinvoiceDAta] = useState()

    const getInvoicedata = async () => {

        if (location.state) {
            const data = await axios.get(`http://localhost:4000/invoiceId:${location.state.invoiceid}`);
            setinvoiceDAta(data.data.data);
        }
        console.log(invoiceDAta)
    }

    useEffect(() => {
        getInvoicedata()
    }, []);

    return (
        <div>

            <Container className='mt-5'>
                <Alert variant="info">
                    <h3>NOTE:</h3>
                    This page has been enhanced for printing. Click the print button at the bottom of the invoice to test
                </Alert>
                {invoiceDAta &&
                    <Card>
                        <Row>
                            <Col md={4} className="p-5">
                                <Card.Title>From</Card.Title>
                                {/* <p>  {invoiceDAta.billing.billing_address}</p>
                                <p>  {invoiceDAta.billing.state}</p>
                                <p>  {invoiceDAta.billing.city}</p>
                                <p>  {invoiceDAta.billing.phone}</p> */}

                            </Col>
                            <Col md={4} className="p-5">
                                dfvgbn
                            </Col>
                            <Col md={4} className="p-5">
                                dfvgbn
                            </Col>
                        </Row>
                    </Card>
                }
            </Container>




        </div>

    )
}

export default Invoice