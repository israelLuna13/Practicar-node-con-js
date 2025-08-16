import express from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validate.js'
import { ControllerPurchases } from '../controllers/ControllerPurchases.js'
import { validateParams } from '../middleware/general.js'
import { validateExistPurchase } from '../middleware/querys.js'
import { authenticate } from '../middleware/auth.js'

const route = express.Router()

route.post('/',
    authenticate,
    body('album_id').isNumeric().withMessage('The user id most to be numeric'),handleInputErrors,ControllerPurchases.create)

route.put('/:id',
    authenticate,
    validateParams,
    validateExistPurchase,
    body('album_id').isNumeric().withMessage('The user id most to be numeric'),handleInputErrors,ControllerPurchases.update)

route.get('/',
    authenticate,
    ControllerPurchases.getAll)

route.get('/:id',
    authenticate,
    validateParams,
    validateExistPurchase,
    handleInputErrors,
    ControllerPurchases.get)

route.delete('/:id',
    authenticate,
    validateParams,
    validateExistPurchase,
    handleInputErrors,
    ControllerPurchases.delete)
export default route