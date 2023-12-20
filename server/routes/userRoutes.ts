import express, { Router } from "express";
const router:Router = express.Router()
import { 
    authUser, 
    registerUser,
    logoutUser,
    getUserProfile,
    updateProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
} from '../controllers/userController'
import { protect, admin } from '../middleware/authMiddleware';

router.route('/')
    .post(registerUser)
    .get(protect, admin, getUsers);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateProfile);
router.route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router