"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password, first_name, last_name, email } = req.body;
    const user = new user_1.default({
        username,
        password,
        first_name,
        last_name,
        email
    });
    try {
        const newUser = yield user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.find({});
        if (user == null) {
            return res.status(404).json({ message: 'No users found' });
        }
        else {
            res.status(201).json(user);
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
const readOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.find({ username: req.params.id });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        else {
            res.status(201).json(user);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_1.default.find({ username: req.params.id });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        else {
            let { username, password, first_name, last_name, email } = req.body;
            if (username != null) {
                user.username = username;
            }
            if (password != null) {
                user.password = password;
            }
            if (first_name != null) {
                user.first_name = first_name;
            }
            if (last_name != null) {
                user.last_name = last_name;
            }
            if (email != null) {
                user.email = email;
            }
            try {
                const newUser = yield user.save();
                res.status(201).json(newUser);
            }
            catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const deleteOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield user_1.default.find({ username: req.params.id });
        console.log(user);
        if (user == null || user.length == 0) {
            return res.status(404).json({ message: `Cannot find user ${req.params.id}` });
        }
        else {
            user_1.default.findOneAndDelete({ username: req.params.id }, function (err) {
                if (err)
                    console.log(err);
                console.log("Successful deletion");
                res.status(201).json(`User ${req.params.id} deleted successfully`);
            });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.default = {
    create,
    readAll,
    update,
    deleteOne,
    readOne
};
