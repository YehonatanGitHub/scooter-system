"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const parking_1 = __importDefault(require("../controllers/parking"));
const router = express_1.default.Router();
router.post('/create', parking_1.default.create);
router.get('/', parking_1.default.readAll);
router.patch('/:id', parking_1.default.update);
router.delete('/:id', parking_1.default.deleteOne);
router.get('/:id', parking_1.default.readOne);
module.exports = router;
