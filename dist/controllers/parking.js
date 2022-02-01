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
const parking_1 = __importDefault(require("../models/parking"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { address, number_parking, location } = req.body;
    const parking = new parking_1.default({
        address,
        number_parking,
        location,
    });
    try {
        const newParking = yield parking.save();
        res.status(201).json(newParking);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parking = yield parking_1.default.find({});
        if (parking == null) {
            return res.status(404).json({ message: 'No parkings found' });
        }
        else {
            res.status(201).json(parking);
        }
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
const readOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parking = yield parking_1.default.find({ _id: req.params.id });
        if (parking == null) {
            return res.status(404).json({ message: 'Cannot find parking' });
        }
        else {
            res.status(201).json(parking);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let parking = yield parking_1.default.find({ _id: req.params.id });
        if (parking == null) {
            return res.status(404).json({ message: 'Cannot find parking' });
        }
        else {
            let { address, number_parking, location } = req.body;
            if (location != null) {
                parking.location = location;
            }
            if (address != null) {
                parking.address = address;
            }
            if (number_parking != null) {
                parking.number_parking = number_parking;
            }
            try {
                const newParking = yield parking.save();
                res.status(201).json(newParking);
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
        let parking = yield parking_1.default.find({ _id: req.params.id });
        console.log(parking);
        if (parking == null || parking.length == 0) {
            return res.status(404).json({ message: `Cannot find parking ${req.params.id}` });
        }
        else {
            parking_1.default.findOneAndDelete({ _id: req.params.id }, function (err) {
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
