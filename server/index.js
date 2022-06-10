const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
require("./config/db.js");
const InvoiceDatabase = require("./model/paymentSchema.js");
require('dotenv').config();
const Stripe = require("stripe");
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const stripe = new Stripe("sk_test_51L8NgASDlzVFQXCVTYjeKe3bFuXhIb7gIFAvwaxPbaxdfsyriwcnp6Dypb7UHbtO6veBKoS6CLnbypLuMUZjS8lJ00UAwlHAtk")





app.use([
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
]);

app.get("/bro", (req, res, next) => {
    res.send("hi");
});

app.post("/creatPayment", (req, res, next) => {
    const { invoice_id, billing, shipping, product_info, totalinvoice } =
        req.body;

    const NewInvoice = new InvoiceDatabase({
        invoice_id,
        billing,
        shipping,
        product_info,
        totalinvoice,
    });
    NewInvoice.save().then(async () => {
        res
            .status(200)
            .json({ error: false, message: "Invoive Generated", data: null });
    });
});



app.post("/payment", async (req, res) => {

    console.log(req.body);

    const { token = {}, amount = 0 } = req.body;

    if (!Object.keys(token).length || !amount) {
        res.status(400).json({ success: false });
    }

    const { id: customerId } = await stripe.customers.create({
        email: token.email,
        source: token.id,
    }).catch(e => {
        console.log(e);
        return null;
    })

    if (!customerId) {
        res.status(500).json({ success: false });
        return;
    }

    const invoiceId =
        `${token.email}-${Math.random().toString()}-${Date.now().toString()}`;

    const charge = await stripe.charges.create({
        amount: amount * 100,
        currency: "USD",
        customer: customerId,
        receipt_email: token.email,
        description: "Donation",
    }, { idempotencyKey: invoiceId }).catch(e => {
        console.log(e);
        return null;
    });

    if (!charge) {
        res.status(500).json({ success: false });
        return;
    };

    res.status(201).json({ success: true });

});




app.get("/invoiceId:id", async (req, res, next) => {
    console.log(req.params);
    const { id } = req.params
    console.log(id.substring(1));
    const invoice_id = id.substring(1)
    try {
        const data = await InvoiceDatabase.find({ invoice_id });
        res.json({ success: true, data: data });

    } catch (err) {
        res.json({ success: false, data: null });

    }

});

app.listen(PORT, () => {
    console.log(`localhost:${PORT}`);
});