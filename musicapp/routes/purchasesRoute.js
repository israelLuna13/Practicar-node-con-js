import express from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validate.js'
import { ControllerPurchases } from '../controllers/ControllerPurchases.js'
import { validateParams } from '../middleware/general.js'
import { validateExistPurchase } from '../middleware/querys.js'

const route = express.Router()

route.post('/',
    body('user_id').isNumeric().withMessage('The user id most to be numeric'),
    body('album_id').isNumeric().withMessage('The user id most to be numeric'),handleInputErrors,ControllerPurchases.create)

route.put('/:id',
    validateParams,
    validateExistPurchase,
    body('user_id').isNumeric().withMessage('The user id most to be numeric'),
    body('album_id').isNumeric().withMessage('The user id most to be numeric'),handleInputErrors,ControllerPurchases.update)

route.get('/',
    ControllerPurchases.getAll)

route.get('/:id',
    validateParams,
    validateExistPurchase,
    handleInputErrors,
    ControllerPurchases.get)

route.delete('/:id',
    validateParams,
    validateExistPurchase,
    handleInputErrors,
    ControllerPurchases.delete)
export default route