const express = require('express');
const Joi = require('joi');
const router = express.Router();

const app = express();

// Initialize variables
let isAuthenticate = false
let users = []

// @desc    Show chat page
// @route   GET /chat
router.get('/chat', (req, res) => {
    if (!isAuthenticate) return res.redirect(303, '/');
    res.render('index')
});

// @desc    Show login page
// @route   GET /
router.get('/', (req, res) => {
    if (isAuthenticate) return res.redirect(303, '/chat');
    res.render('login', { layout: 'login-layout' })
})

// @desc    Login form handling
// @route   POST /
router.post('/', function (req, res) {
    const { userLogin } = req.body;

    // Create validation schema
    const schema = {
        userLogin: Joi.string().min(2).max(20).regex(/^[a-z_]+$/i).required()
    }

    // Check if user doesn't exist
    if (users.includes(userLogin)) {
        req.session.flash = {
            type: 'danger',
            intro: 'Display name used!',
            message: '<p>User with the same display name you chose exists, choose another unique display name.</p>'
        }
        //return res.redirect(303, '/');
    }

    // User schema to validate
    Joi.validate(req.body, schema, (err, value) => {
        if (err) {
            req.session.flash = {
                type: 'danger',
                intro: 'Validation error!',
                message: '<p>Invalid display name. Your name can only contain letters and underscore, and must be minimum of 2 characters.</p>'
            }
            return res.redirect(303, '/');
        }

        // Authenticate user
        isAuthenticate = true
        
        // User display photo
        const photo = userLogin.slice(0, 1).toUpperCase()

        // Save user
        users.push(userLogin)
        res.render('index', { userLogin, photo });

        // Block next user from entering room without check
        isAuthenticate = false
    });
})
module.exports = router;