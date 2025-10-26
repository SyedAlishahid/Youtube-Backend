const router = require('express').Router();
const { createUser, ViewUser, deleteUser } = require('../controllers/user.controller.js');


router.get('/view', ViewUser);
router.post('/insert', createUser);
router.delete('/delete/:id', deleteUser);


module.exports = router;