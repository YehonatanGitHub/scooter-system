"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const scooter_1 = __importDefault(require("../controllers/scooter"));
const router = express_1.default.Router();
router.post('/create', scooter_1.default.create);
router.get('/', scooter_1.default.readAll);
router.patch('/:id', scooter_1.default.update);
router.delete('/:id', scooter_1.default.deleteOne);
router.get('/:id', scooter_1.default.readOne);
router.get('/active', scooter_1.default.allActive);
module.exports = router;
