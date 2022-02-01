"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const scooter_1 = __importDefault(require("./routes/scooter"));
const user_1 = __importDefault(require("./routes/user"));
const parking_1 = __importDefault(require("./routes/parking"));
const failures_1 = __importDefault(require("./routes/failures"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
})
    .then((res) => {
    console.log('Connected to Distribution API Database - Initial Connection');
})
    .catch((err) => {
    console.log(`Initial Distribution API Database connection error occured -`, err);
});
const db = mongoose_1.default.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));
app.use(express_1.default.json());
/** Routes */
app.use('/api/scooter', scooter_1.default);
app.use('/api/user', user_1.default);
app.use('/api/parking', parking_1.default);
app.use('/api/failures', failures_1.default);
app.listen(5000, () => console.log('Server running on port 5000'));
