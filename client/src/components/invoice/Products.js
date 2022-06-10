import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import products from "../assets/products.json";




const Products = () => {

    const [Products, setProducts] = useState(false);
    const [selecteddata, setselecteddata] = useState([])
    const history = useHistory()

    const getproduct = () => { setProducts(products) };

    const selectItems = (item) => {
        setselecteddata([...selecteddata, item])
        // console.log(selecteddata)
        // totalprize()
    }

    const totalcost = selecteddata.reduce((accumulator, object) => {
        return accumulator + object.amount;
    }, 0);


    useEffect(() => { getproduct() }, [])

    return (
        <>
            <Row>
                <Col xs={12} md={7}>
                    <div className="p-5 " style={{ width: '' }}>
                        <Row xs={1} md={2} className="g-4 ">
                            {Products && Products.map((ele, inx) => {
                                return (
                                    <Card key={inx} style={{ width: '18rem' }} className="mx-3 shaword">
                                        <Card.Img variant="top" src="holder.js/100px180" />
                                        <Card.Body>
                                            <Card.Title>{ele.productname}</Card.Title>
                                            <Card.Text>
                                                Price:  <i>Rs {ele.amount} /-</i>
                                            </Card.Text>
                                            <div className="d-flex justify-content-between">

                                                <Button variant="outline-primary" onClick={() => { selectItems(ele) }}>add to cart</Button>
                                                {/* <Button variant="outline-success">buy</Button> */}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </Row>
                    </div>
                </Col>
                <Col xs={12} md={5} className="border">
                    <div className="m-5">
                        <Card style={{ width: '90%' }} className="shadow p-5">
                            <Card.Title>Total prize: {totalcost} /-</Card.Title>

                            <ListGroup as="ol" numbered>
                                {selecteddata && selecteddata.map((items, inx) => {
                                    return (
                                        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start" key={inx}>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{items.productname}</div>
                                                Rs  {items.amount}/-
                                            </div>
                                            <Badge bg="primary" pill> 1 </Badge>
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>

                            <div className="d-flex justify-content-end mt-5">
                                <Button onClick={() => {
                                    history.push({
                                        pathname: '/InvoiceForm',
                                        search: '?query=abc',
                                        state: { detail: selecteddata, totalamount: totalcost }
                                    });
                                }}>Next</Button>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>

        </>
    )
}

export default Products