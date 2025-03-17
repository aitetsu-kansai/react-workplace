import express from 'express'
import {
	createGroup,
	deleteGroup,
	getGroups,
	updateGroup,
} from '../controllers/groupController.js'

const router = express.Router()

router.get('/', getGroups)
router.post('/', createGroup)
router.delete('/:groupId', deleteGroup)
router.put('/', updateGroup)

export default router
