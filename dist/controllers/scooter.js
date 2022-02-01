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
const scooter_1 = __importDefault(require("../models/scooter"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, location, model, year_manufacture, status } = req.body;
    const scooter = new scooter_1.default({
        id,
        location,
        model,
        year_manufacture,
        status
    });
    try {
        const newScooter = yield scooter.save();
        res.status(201).json(newScooter);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
const allActive = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scootersActive = yield scooter_1.default.find({ status: "active" });
        res.status(201).json(scootersActive);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scooters = yield scooter_1.default.find({});
        if (scooters == null) {
            return res.status(404).json({ message: 'No scooters found' });
        }
        else {
            res.status(201).json(scooters);
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
const readOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scooter = yield scooter_1.default.find({ id: req.params.id });
        if (scooter == null) {
            return res.status(404).json({ message: 'Cannot find scooter' });
        }
        else {
            res.status(201).json(scooter);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let scooter = yield scooter_1.default.find({ id: req.params.id });
        if (scooter == null) {
            return res.status(404).json({ message: 'Cannot find scooter' });
        }
        else {
            let { status, location, model, year_manufacture } = req.body;
            if (location != null) {
                scooter.location = location;
            }
            if (model != null) {
                scooter.model = model;
            }
            if (year_manufacture != null) {
                scooter.year_manufacture = year_manufacture;
            }
            if (status != null) {
                scooter.status = status;
            }
            try {
                const newScooter = yield scooter.save();
                res.status(201).json(newScooter);
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
        let scooter = yield scooter_1.default.find({ id: req.params.id });
        console.log(scooter);
        if (scooter == null || scooter.length == 0) {
            return res.status(404).json({ message: `Cannot find scooter ID ${req.params.id}` });
        }
        else {
            scooter_1.default.findOneAndDelete({ id: req.params.id }, function (err) {
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
    readOne,
    allActive,
    deleteOne
};
