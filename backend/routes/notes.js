const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

//ROUTE 1 : Fetching the loggedin user's notes by GET '/api/notes/fetchallnotes'
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        return res.send(notes);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
})


//ROUTE 2 : Adding a new note by POST '/api/notes/addnote'. LOGIN required
router.post('/addnote', fetchuser, [
    body('title', 'Title must contain atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description must contain atleast 10 characters').isLength({ min: 10 }),
], async (req, res) => {
    //checking for errors in body params if any sends response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }
    //using destructuring concept to easily post/fetch the data
    const {title, description, tag} = req.body;
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id,
        })
        //"save" is a promise and returns all the savednotes of user
        const savednote = await note.save();
        return res.send(savednote);
    } 
    catch (err) {
        return res.status(500).send({ error: err.message });
    }

})


//ROUTE 3 : Updating an existing note by PUT '/api/notes/updatenote/:id'. LOGIN required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Title must contain atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description must contain atleast 10 characters').isLength({ min: 10 }),
], async (req, res) => {
    //checking for errors in body params if any sends response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    const {title, description, tag} = req.body;
    try {
        //creating a "newNote" object
        newNote = {};
        //adding the title,desciption,tag to the newNote by existing note
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //finding the Note to be updated and update it
        let note = await Notes.findById(req.params.id);
        //checking for a note of particular user's id
        if(!note){
            return res.status(404).send({"Bad Request" : "Note Not Found"});
        }
        //Allowing updation if only user own's this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send({"Bad Request" : "Not Allowed to change other user's data"});
        }
        //updating loggedin user's note
        note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new: true});
        return res.json(note);
    } 
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
})


//ROUTE 4 : Deleting an existing note by DELETE '/api/notes/deletenote/:id'. LOGIN required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    //checking for errors in body params if any sends response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }
    try {
        //finding the Note to be deleted and deleting it
        let note = await Notes.findById(req.params.id);
        //checking for a note of particular user's id
        if(!note){
            return res.status(404).send({"Bad Request" : "Note Not Found"});
        }
        //Allowing deletion if only user own's this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send({"Bad Request" : "Not Allowed to change other user's data"});
        }
        //deleting loggedin user's note
        note = await Notes.findByIdAndDelete(req.params.id);
        return res.send({"Success" : "Note has been deleted" , note:note});
    } 
    catch (err) {
        return res.status(500).send({ error: err.message });
    }
})

module.exports = router;