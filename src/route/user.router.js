import express from 'express'
import { signup,login, logout, menuAdd, menu, menuUpdate, menuDelete, order, Orders} from '../controller/user.controller.js'
import {authenticate} from '../middleware/fetchDetails.js'


const router = express.Router()

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout)
router.post('/menuadd', authenticate, menuAdd)
router.get('/menu',authenticate, menu)
router.put('/menu/:id', authenticate, menuUpdate)
router.delete('/menu/:id', authenticate, menuDelete)
router.post('/order', authenticate, order)
router.get('/orders', authenticate, Orders)
export default router