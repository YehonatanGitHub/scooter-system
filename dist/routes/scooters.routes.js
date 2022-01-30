"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { ScooterDocument } from '../models/scooter';
const router = (0, express_1.Router)();
// get all scooters
router.get('/', (req, res, next) => {
    res.send('got scooters');
});
// router.get('/', (req, res,) => {
//   res.send('got scooters')
//   // Item.find()
//   //   .sort({ date: -1 })
//   //   .then((items) => res.json(items))
// });
// create new scooter
// router.post('/', (req, res, next) => {
//   const newScooter: Scooter = {
//     id: 123,
//     model: "fdlkj324",
//     year_of_manufacture: req.body.year
//   };
//   scooters.push(newScooter);
// });
// router.put('/scooter/:scooterId', (req, res, next) => {
//   const sid = req.params.scooterId;
//   // const scooterIndex = scooters.findIndex((scooterItem) => scooterItem.id === sid);
//   // if (scooterIndex >= 0) {
//   //   scooters[scooterIndex] = { id: scooters[scooterIndex].id, }
//   // }
// })
exports.default = router;
