import express from 'express'
import { login, register, logout } from '../Controllers/auth.js'

const router = express.Router()

// login user 
// router.post('/login', (req, res, next) => {
//     res.send('login route')
// })

router.post('/login', login)

// register user 
router.post('/register', register)

// logout user 
router.post('/logout', logout)


export default router;