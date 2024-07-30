const express = require('express');
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js');
const alert = require('node-notifier');


const items = [];

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req,res)=>{
    // res.sendFile(__dirname + '/index.html')

    const day = date.getDate();
    res.render("list", {
        kindOfDay: day, newListItems:items});

})

app.post('/',(req,res)=>{
    let item =  req.body.newItem;
    const itemIndex = req.body.newItem;
    if (item === ""){
        alert.notify({
            'title':'Blank task alert',
            'message':'Entry can not be empty'
        });
    }else{
        items.push(item);
        res.redirect('/')
    }
    
})


app.listen(3000, ()=>{
    console.log("server started on port 3000") 
})