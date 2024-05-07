const connection = require('./../config/dataBase.config');

// Lấy danh sách user
const getAllUser = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM anhquandev', (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

// Tạo mới một user
const registerUserDB = (user) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO anhquandev (name, email, password) VALUES (?, ?, ?)';
        const values = [user.name, user.email, user.password];
        connection.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

// Xóa một user
const deleteUserDB = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM anhquandev WHERE id=?';
        connection.query(query, id, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

// Tìm kiếm user thông qua id
const findById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM anhquandev WHERE id=?';
        connection.query(query, id, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

// Đăng nhập
const loginUserDB = (name, password) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM anhquandev WHERE name=? AND password=?';
        const values = [name, password];
        connection.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result[0]);
        });
    });
};

// Cập nhật thông tin user
const updateUserDB = (user, id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE anhquandev SET name=?, email=?, password=? WHERE id=?';
        const values = [user.name, user.email, user.password, id];
        connection.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = { getAllUser, registerUserDB, loginUserDB, updateUserDB, deleteUserDB, findById };
