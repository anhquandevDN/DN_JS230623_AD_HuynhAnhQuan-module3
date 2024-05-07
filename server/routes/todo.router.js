const express = require('express');
const { body } = require('express-validator');
const jwtMiddleware = require('./../middleware/jwtMiddleware');
const roleMiddleware = require('./../middleware/roleMiddleware');
const { getAll, registerUser, loginUser, updateUser, deleteUser } = require('./../controller/user.controller');
const router = express.Router();

// Lấy danh sách tất cả user (cần đăng nhập)
router.get('/getUser', jwtMiddleware, getAll);

// Tạo mới một user
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Tên không được để trống'),
        body('email').isEmail().withMessage('Email không hợp lệ'),
        body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải chứa ít nhất 6 ký tự')
    ],
    registerUser
);

// Đăng nhập
router.post(
    '/login',
    [
        body('name').notEmpty().withMessage('Tên không được để trống'),
        body('password').notEmpty().withMessage('Mật khẩu không được để trống')
    ],
    loginUser
);

// Chỉnh sửa user (cần đăng nhập và có quyền admin)
router.put(
    '/update/:id',
    jwtMiddleware,
    roleMiddleware('admin'),
    [
        body('name').notEmpty().withMessage('Tên không được để trống'),
        body('email').isEmail().withMessage('Email không hợp lệ'),
        body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải chứa ít nhất 6 ký tự')
    ],
    updateUser
);

// Xóa user (cần đăng nhập và có quyền admin)
router.delete('/delete/:id', jwtMiddleware, roleMiddleware('admin'), deleteUser);

module.exports = router;
