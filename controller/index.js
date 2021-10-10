const express = require("express");
const { Router } = require("express");
const router = Router();
const names = require('./../model/index');

router.get('/', function (req, res) {
    res.json({message: "Hey its a success"});
})

router.get('/name', function(req, res) {
    res.json({name_lst: names});
});

router.post('/name', function(req, res) {
    const name = req.body.name;
    names.push(name);
    res.json({
        message: 'Added successfully',
        names_list: names
    });
})

router.put('/name', function(req, res) {
    const name = req.body.name;
    const new_names = names.map((each_name) => {
        if(each_name === "ajay") {
            return each_name + name;
        }
        else {
            return each_name;
        }
    })
    res.json({
        message: 'updated successfully',
        names_list: new_names
    });
})

router.delete('/name', function(req, res) {
    const name = req.body.name;
    const new_names = names.filter((each_name) => {
        if(each_name !== name) {
            return true;
        }
        else {
            return false;
        }
    })
    res.json({
        message: 'Deleted successfully',
        names_list: new_names
    });
})

module.exports = router;