const authService = require('../services/authService');

const registerUser = async (req, res ) => {
    try {
        const {name, email, password, role } = req.body;
        const result = await authService.register({name, email, password, role});
        res.status(201).json(result);

    } catch (error) {
        console.error('Register error: ', error);
        res.status(500).json({message: error.message});
    }
};

const loginUser = async (req, res ) => {
    try {
        const {email, password } =req.body;
        const result = await authService.login({email, password});
        res.status(200).json(result);

    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({message: error.message});
    }
};

const editUser = async (req, res ) => {
    try {
        const id = req.user.id;
        const {name, email } = req.body;

        const updateUser = await authService.editUser({id, name, email});
        res.status(200).json(updateUser);

    } catch (error) {
        console.error('Edit error: ', error);
        res.status(400).json({message:error.message});
    }
};

const changePassword = async (req, res ) => {
    try {
        const id = req.user.id;
        const {currentPassword, newPassword} = req.body;

        const passwordChange = await authService.changeUserPassword({id, currentPassword, newPassword});
        res.status(200).json(passwordChange);

    } catch (error) {
        console.error('Password change error: ', error);
        res.status(400).json({message: error.message});
    }
}
const getUsers = async (req, res ) => {
    try {

        const usersList = await authService.listUsers();
        res.status(200).json(usersList);

    } catch (error) {
        console.error('Error retrieving users');
        res.status(400).json({message: error.message});
    }
};

module.exports = {
    registerUser,
    loginUser,
    editUser,
    changePassword,
    getUsers
};