"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const failures_1 = __importDefault(require("../controllers/failures"));
const router = express_1.default.Router();
router.post('/create', failures_1.default.create);
router.get('/', failures_1.default.readAll);
router.patch('/:id', failures_1.default.update);
router.delete('/:id', failures_1.default.deleteOne);
router.get('/:id', failures_1.default.readOne);
module.exports = router;
