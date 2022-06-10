const mongoose = require("mongoose");

const dburl = 'mongodb+srv://devilfighterzz:Pinaya6667@cluster1.xzeft.mongodb.net/Payment-invoice?retryWrites=true&w=majority'

mongoose.connect(
    dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 200000,
    socketTimeoutMS: 2000000,
    keepAlive: true,
},
    (err) => {
        if (err) {
            console.log("DataBase connection FAILED", err);
        } else {
            console.log(" DB Connected ");
        }
    }
);