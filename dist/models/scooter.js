"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const scooterSchema = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true },
    model: { type: String, required: true },
    year_of_manufacture: { type: Number, required: true }
});
const ScooterModel = mongoose_1.default.model('Scooter', scooterSchema);
exports.default = ScooterModel;
