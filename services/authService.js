const User = require('../models/userModel');
const Role = require('../models/roleModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async ({name, email, password, role}) => {
    try {
        const userExist = await User.findOne({email});
        if (userExist) {
            throw new Error("Email already registered");
        }
        const userRole = await Role.findOne({name: 'admin'});
        console.log(userRole);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: userRole._id
        });
        return{
            message:'User registered successfully',
            user:{
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        };

    } catch (error) {
        throw error;
    }
};

const login = async ({email, password}) => {
    try {
        const userExist = await User.findOne({email}).select('+password');
        if (!userExist) {
            throw new Error("User not found");
        }
        const matchPassword = await bcrypt.compare(password, userExist.password);
        if (!matchPassword) {
            throw new Error("Password doesnt match");
        }
        const userRole = await Role.findById(userExist.role);
        if(!userRole) throw new Error("Role not found");
        
        
        const token = jwt.sign({id: userExist._id, role: userRole.name}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return({
            message: ' Login successfull',
            token,
            id: userExist._id,
            email: userExist.email,
            role: userRole.name
        });

    } catch (error) {
        throw error;
    }
};

const editUser = async ({id, name, email}) => {
    try {
        if (!id) {
            throw new Error("ID required");
        }       
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        user.name = name || user.name;
        user.email = email || user.email;

        const updateUser = await user.save();

        return{
            message:'User updated',
            user:{
                id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                updatedAt: updateUser.updatedAt
            }            
        };

    } catch (error) {
        throw error;
    }
};

const changeUserPassword = async ({id, currentPassword, newPassword}) => {
    try {
        if (!id) {
            throw new Error("ID required");
        }
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            throw new Error("Current password is incorrect");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        return{
            message:'Password updated successfully'
        };



    } catch (error) {
        throw error;
    }
};

const listUsers = async () => {
    const users = await User.find().populate('role');
    return users;
};

module.exports = {
    register,
    login,
    editUser,
    changeUserPassword,
    listUsers
};