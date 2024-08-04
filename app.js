const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const alert = require('node-notifier');

const date = require(__dirname + '/date.js');
const TodoItem = require(__dirname + '/models/todolistModel.js');
const db = require(__dirname + '/connections/db.js');


const items = [];

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', async (req,res)=>{
    const day = date.getDate();
    const newListItems = await TodoItem.find({date:day}).exec();
    
    res.render("list", {
        kindOfDay: day, 
        newListItems:newListItems
    });

})

app.post('/',(req,res)=>{
    const item =  req.body.newItem;
    const day = date.getDate();
    if (item == ""){
        alert.notify({
            title: 'Empty item',
            message: 'Task can not be empty',
            icon:(__dirname + '/empty-item-icon.png')
        })
    }else{
        if (item){
            const todoItem = new TodoItem({
                item: item,
                isChecked: req.body.isChecked  || false ,
                date:day
            })
            todoItem.save()
        }
        res.redirect('/');
    }
    
})

app.post('/update', async (req,res)=>{
    const checkedItems = req.body.isChecked || [];
    const day = date.getDate();
    try {
        const items = await TodoItem.find({date: day});

        for (let item of items){
            item .isChecked = checkedItems.includes(item._id.toString());
            await item.save();
        }
        res.redirect('/');
    }catch (err) {
        console.error(err);
        res.send('Error updating to-do items.');
      }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("server started on port 3000") 
})