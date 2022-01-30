"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scooters = [];
const router = (0, express_1.Router)();
// get all scooters
router.get('/', (req, res, next) => {
    res.status(200).json({ scooters: scooters });
});
// create new scooter
router.post('/', (req, res, next) => {
    const newScooter = {
        id: 123,
        model: "fdlkj324",
        year_of_manufacture: req.body.year
    };
    scooters.push(newScooter);
});
// router.put('/scooter/:scooterId', (req, res, next) => {
//   const sid = req.params.scooterId;
//   // const scooterIndex = scooters.findIndex((scooterItem) => scooterItem.id === sid);
//   // if (scooterIndex >= 0) {
//   //   scooters[scooterIndex] = { id: scooters[scooterIndex].id, }
//   // }
// })
exports.default = router;
