"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const router = express_1.default.Router();
router.post('/create', user_1.default.create);
router.get('/', user_1.default.readAll);
router.patch('/:id', user_1.default.update);
router.delete('/:id', user_1.default.deleteOne);
router.get('/:id', user_1.default.readOne);
module.exports = router;
