"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const scooters_routes_1 = __importDefault(require("./routes/scooters.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
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
app.use(scooters_routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// const scootersRoutes = require('./routes/scooters.routes')
// app.use('/scooters', scootersRoutes);
app.listen(5000, () => console.log('Server running on port 5000'));
