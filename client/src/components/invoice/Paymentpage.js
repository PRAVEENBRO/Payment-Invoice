import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';


const Paymentpage = () => {
    const location = useLocation();

    const history = useHistory()

    const [amount, setamount] = useState();
    const [invoiceid, setinvoiceid] = useState();
    const getdata = () => {
        if (location.state) {
            setamount(location.state.totalinvoice);
            setinvoiceid(location.state.invoice_id);
        }
    }

    useEffect(() => {
        getdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(process.env.REACT_APP_SECRET_KEY)

    const REACT_APP_SECRET_KEY = "pk_test_51L8NgASDlzVFQXCVIOsexfAvkz6vENWT0oWzFUcVYpV9RE6Wp7ElF7mTtXjDnrAQm16g9zeDx9NzE9djR22DWZLu00GZfMX4Np"

    const handleToken = async (token) => {
        // console.log(token, amount)

        const checkout =  axios.post("http://localhost:4000/payment", { token, amount })
        console.log(checkout, "------rtyui");

        history.push({
            pathname: '/invoice',
            state: { amount, invoiceid }
        });
    }

    return (
        <div className="d-flex justify-content-center m-5">

            <Card style={{ width: '35rem' }}>
                <Card.Body>
                    <Card.Title>Add Payment Info</Card.Title>
                    <h6 className="">Invoice Id :{invoiceid}</h6>
                    <Card.Subtitle className="mb-2 text-muted">Total Amount : ${amount}/-  </Card.Subtitle>

                    <StripeCheckout
                        // stripeKey={process.env.REACT_APP_SECRET_KEY}
                        stripeKey={REACT_APP_SECRET_KEY}
                        token={handleToken}
                        name=""
                        paneLable={'payment'}
                        currency="USD"
                        amount={amount * 100}
                    />

                </Card.Body>
            </Card>
        </div>);
};

export default Paymentpage;