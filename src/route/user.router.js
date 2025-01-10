import express from 'express'
import { signup,login, logout, menuAdd, menu } from '../controller/user.controller.js'
import {auth} from '../middleware/fetchDetails.js'


const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout)
router.post('/menuadd', auth, menuAdd)
router.get('/menu',auth, menu)

export default router