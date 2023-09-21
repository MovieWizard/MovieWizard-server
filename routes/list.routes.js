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

//Create new mood list
router.post('/mood-lists' , (req, res, next) => {
    const {title, description, mood} = req.body
    List.create({title, description, mood})
    .then(newList => res.json(newList))
  
    .catch(e => {
        res.status(500).json({
            message: "Error create new mood list ",
            error: e
        })
    })
}) 

// Get mood list
router.get('/mood-lists/:moodListId', (req, res, next) => {
    const { moodListId } = req.params
    List.findById(moodListId)
    .then(list => res.json(list))
    .catch(e => {
        res.status(500).json({
            message: "Error get a mood list ",
            error: e
        })
    })
})
module.exports = router;