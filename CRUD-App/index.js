require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const messageSchema = new mongoose.Schema({
    data: String,
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

app.get('/', (req, res) => {
    Message.find({}, (err, messages) => {
        if(err)
            console.log(err);
        else
            res.render('index', { messages: messages });
    })
})

app.post('/message', (req, res) => {
    console.log(req.body);
    const message = new Message({ data: req.body.message });
    message.save();
    res.redirect('/');
})

app.get('/delete/:messageId',(req, res) => {
    Message.findByIdAndDelete(req.params.messageId, (err) => {
        if(err)
            console.log(err);
        else
            res.redirect('/');
    })
})

app.get('/edit/:messageId', (req, res) => {
    res.render('edit', { messageId: req.params.messageId });
})

app.post('/edit/:messageId', (req, res) => {
    Message.findByIdAndUpdate(req.params.messageId, { data: req.body.message }, (err) => {
        if(err)
            console.log(err);
        else
            res.redirect('/');
    } )
})

app.listen(process.env.PORT, function(){
    console.log('listening on port ' + process.env.PORT);
});