const mongoose = require("mongoose");


const PaymentSchema = new mongoose.Schema({

    invoice_id: { type: "string" },
    billing: {
        billing_address: { type: "string" },
        state: { type: "string" },
        city: { type: "string" },
        phone: { type: "string" },
    },
    shipping: {
        shipping_address: { type: "string" },
        state: { type: "string" },
        city: { type: "string" },
        phone: { type: "string" },
    },
    product_info: [{
        productid: { type: "string" },
        productname: { type: "string" },
        qty: { type: "string" },
        amount: { type: "string" },
        total_amount: { type: "string" },

    }],
    totalinvoice: { type: "string" }

});


const InvoiceDatabase = mongoose.model("AgencyDatabase", PaymentSchema);

module.exports = InvoiceDatabase;