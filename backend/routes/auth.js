const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_PRIVATEKEY = "Akhil@smart";

//ROUTE 1 : Creating a user by POST '/api/auth/createuser' . NO login required
router.post('/createuser', [
  body('name', 'name must contain atleast 3 characters').isLength({ min: 3 }),
  body('phoneno', 'Enter a valid phoneNumber').isLength({ min: 10, max: 10 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
], async (req, res) => {
  let  success = false;
  //checking for errors in body params if any sends response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    //encrypting the password using salt and generating the hash of given password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //creating a user of unique id for phoneno,email
    let user = await User.create({
      name: req.body.name,
      email: req.body.email,
      phoneno: req.body.phoneno,
      password: secPass,
    })
    //creating a data <type-object> for sending it user's id to JWT--jsonWebToken for generating a token used for validation i.e. secure communication b/w client and server
    //here we are using id because user_id retrieve's the data in a much quicker way compared to other values
    const { email, phoneno } = req.body;
    let user1 = await User.findOne({ phoneno, email });
    if (!user1) {
      return res.status(400).json({ success, error: "Sorry a user with this phone/ email already exists" })
    }
    const data = {
      user: {
        id: user.id,
      }
    }
    //sign <synchronous method> is used to generate a e-signature from JWT wich is required for valudation
    const authtoken = jwt.sign(data, JWT_PRIVATEKEY);
    success = true;
    return res.send({ success, authtoken });
  }
  catch (err) {
    return res.status(400).send({ success,error: "Sorry a user with this phone/ email already exists"});
  }
})


//ROUTE 2 : LOGIN AUTHENTICATION //
//Authenticate a user by POST '/api/auth/login' . NO login required
router.post('/login', [
  body('phoneno', 'Enter a valid phoneNumber').isLength({ min: 10, max: 10 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').notEmpty(),
], async (req, res) => {
  let  success = false;
  //checking for errors in body params if any errors then sends response
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  //using destructuring concept to easily post/fetch the data
  const { email, password, phoneno } = req.body;
  try {
    let user = await User.findOne({ email, phoneno });
    if (!user) {
      return res.status(400).json({ success, error: "Please Enter Correct Credentials" })
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Please Enter Correct Credentials" })
    }
    const payload = {
      user: {
        id: user.id,
      }
    }
    // sending payload i.e.the data you are interested in transporting to the server when you make an API request.
    const authtoken = jwt.sign(payload, JWT_PRIVATEKEY)
    success = true;
    return res.send({ success, authtoken });
  }
  catch (err) {
    return res.status(500).send({ success, error: err.message });
  }
})


//ROUTE 3:Getting Loggedin User details by POST '/api/auth/getuser'. Login Required
/*using the middleware fetchuser  
The middleware in node.js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle.*/
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    return res.send(user);
  }
  catch (error) {
    return res.status(500).send({ error: err.message });
  }
})
module.exports = router;