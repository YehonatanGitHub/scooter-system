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
const failures_1 = __importDefault(require("../models/failures"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { type, status, open_time, close_time } = req.body;
    const failures = new failures_1.default({
        type,
        status,
        open_time,
        close_time
    });
    try {
        const newFailures = yield failures.save();
        res.status(201).json(newFailures);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const failures = yield failures_1.default.find({});
        if (failures == null) {
            return res.status(404).json({ message: 'No failures found' });
        }
        else {
            res.status(201).json(failures);
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
const readOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const failures = yield failures_1.default.find({ _id: req.params.id });
        if (failures == null) {
            return res.status(404).json({ message: 'Cannot find failures' });
        }
        else {
            res.status(201).json(failures);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let failures = yield failures_1.default.find({ _id: req.params.id });
        if (failures == null) {
            return res.status(404).json({ message: 'Cannot find failures' });
        }
        else {
            let { type, status, open_time, close_time } = req.body;
            if (type != null) {
                failures.type = type;
            }
            if (status != null) {
                failures.status = status;
            }
            if (open_time != null) {
                failures.open_time = open_time;
            }
            if (close_time != null) {
                failures.close_time = close_time;
            }
            try {
                const newFailures = yield failures.save();
                res.status(201).json(newFailures);
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
        let failures = yield failures_1.default.find({ _id: req.params.id });
        console.log(failures);
        if (failures == null || failures.length == 0) {
            return res.status(404).json({ message: `Cannot find failures ${req.params.id}` });
        }
        else {
            failures_1.default.findOneAndDelete({ _id: req.params.id }, function (err) {
                if (err)
                    console.log(err);
                console.log("Successful deletion");
                res.status(201).json(`Scooter ID ${req.params.id} deleted successfully`);
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
