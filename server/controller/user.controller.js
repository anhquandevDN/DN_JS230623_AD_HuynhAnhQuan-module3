const { body, validationResult } = require('express-validator');
const { getAllUser, registerUserDB, loginUserDB, updateUserDB, deleteUserDB, findById } = require('./../repositories/user.repository');
const jwt = require('jsonwebtoken');

// Lấy danh sách tất cả user (cần đăng nhập)
const getAll = async (req, res) => {
    try {
        const users = await getAllUser();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Tạo mới một user
const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        const user = { name, email, password };
        const result = await registerUserDB(user);
        res.status(201).json({ message: 'Đăng ký thành công', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Đăng nhập
const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, password } = req.body;
        const user = await loginUserDB(name, password);
        if (!user) {
            return res.status(401).json({ message: 'Đăng nhập thất bại' });
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ data: user, token, message: 'Đăng nhập thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Chỉnh sửa user (cần đăng nhập và có quyền admin)
const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = { name, email, password };
        const existingUser = await findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User không tồn tại' });
        }

        await updateUserDB(user, id);
        res.status(200).json({ message: 'Cập nhật thành công', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Xóa user (cần đăng nhập và có quyền admin)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const existingUser = await findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User không tồn tại' });
        }

        await deleteUserDB(id);
        res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = { getAll, registerUser, loginUser, updateUser, deleteUser };
