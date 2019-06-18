const express = require('express');
const router = express.Router();
const { User } = require('../model/users');

router.post('/', async (req, res) => {
    let user = await User.findOne({ user_id: req.body.user_id });
    if (user && (user.password == req.body.password)) {
        const token=user.generateAuthToken();
        res.header('x-auth-token', token);
       return res.send("User is login successfully");
    }

    return res.status(400).send('email or password is invalid');

});

module.exports = router;
