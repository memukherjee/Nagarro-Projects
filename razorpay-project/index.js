require("dotenv").config();
const express = require("express");
const razorpay = require("razorpay");

const port = process.env.PORT;

const app = express();
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index",{title:"Razorpay Checkout"});
});

app.post('/create-order', async (req, res) => {
    const { amount } = req.body;
    // console.log(amount);
    await razorpayInstance.orders.create({
        amount: parseInt(amount),
        currency: "INR",
        receipt: "order_rcptid_1",
    },(err,order) =>{
        if(err){
            console.log(err);
            res.status(500).send(err);
        }else{
            console.log(order.id);
            res.status(200).send({orderId:order.id});
        }
    })
});

app.listen(port, () => console.log(`Server started on port ${port}`));
