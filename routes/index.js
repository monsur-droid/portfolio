const express = require('express');
const Joi = require('joi');
const router = express.Router();

let isAuthenticate = false
let users = []
const app = express();

// Route to chat page if username set
router.get('/chat', (req, res) => {
    if (!isAuthenticate) return res.redirect(303, '/');
    res.render('index')
});

// Route tp login page
router.get('/', (req, res) => {
    if (isAuthenticate) return res.redirect(303, '/chat');
    res.render('login', { layout: 'login-layout' })
})

// Post route
router.post('/', function (req, res) {
    // Create validation schema
    const schema = {
        userLogin: Joi.string().min(2).max(20).regex(/^[a-z_]+$/i).required()
    }

    // User the schema to validate
    Joi.validate(req.body, schema, (err, value) => {
        // Raise Bad response (404) if there  is an error
        if (err) {
            req.session.flash = {
                type: 'danger',
                intro: 'Validation error!',
                message: '<p>Invalid display name. Your name can only contain letters and underscore, and must be minimum of 2 characters.</p>'
            }
        
        return res.redirect(303, '/');
        }
        isAuthenticate = true
        const { userLogin } = req.body;
        const photo = userLogin.slice(0, 1).toUpperCase()
        users.push(userLogin)
        res.render('index', { userLogin, photo });
        isAuthenticate = false
    });
})
console.log(users)
module.exports = router;