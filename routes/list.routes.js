const router = require("express").Router();
const List = require("../models/MovieList")

//Get all mood list
router.get('/mood-lists', (req, res, next) => {
    List.find()
    .then(lists => res.json(lists))
    .catch(e => {
        res.status(500).json({
            message: "Error get all lists",
            error: e
        })
    })
}) 

module.exports = router;