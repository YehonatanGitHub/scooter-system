import { NextFunction, Request, Response } from 'express';
import Parking from '../models/parking';

const create = async (req: Request, res: Response, next: NextFunction) => {
  let { address, number_parking, location } = req.body;
  const parking = new Parking({
    address,
    number_parking,
    location,
  });
  try {
    const newParking = await parking.save();
    res.status(201).json(newParking);
  } catch (err: any) {
    res.status(400).json({ message: err.message as String });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parking = await Parking.find({});
    if (parking == null) {
      return res.status(404).json({ message: 'No parkings found' })
    } else {
      res.status(201).json(parking);
    }

  } catch (err: any) {
    res.status(400).json({ message: err.message as String });
  }
};

const readOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parking = await Parking.find({ _id: req.params.id });
    if (parking == null) {
      return res.status(404).json({ message: 'Cannot find parking' })
    } else {
      res.status(201).json(parking)
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message as String });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let parking: any = await Parking.find({ _id: req.params.id });
    if (parking == null) {
      return res.status(404).json({ message: 'Cannot find parking' })
    } else {
      let { address, number_parking, location } = req.body;
      if (location != null) {
        parking.location = location;
      }
      if (address != null) {
        parking.address = address;
      }
      if (number_parking != null) {
        parking.number_parking = number_parking
      }
      try {
        const newParking = await parking.save();
        res.status(201).json(newParking);
      } catch (err: any) {
        res.status(400).json({ message: err.message as String });
      }
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message as String });
  }
};

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let parking: any = await Parking.find({ _id: req.params.id });
    console.log(parking);
    if (parking == null || parking.length == 0) {
      return res.status(404).json({ message: `Cannot find parking ${req.params.id}` })
    } else {
      Parking.findOneAndDelete({ _id: req.params.id }, function (err: any) {
        if (err) console.log(err);
        console.log("Successful deletion");
        res.status(201).json(`Scooter ID ${req.params.id} deleted successfully`);
      });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message as String });
  }
};

export default {
  create,
  readAll,
  update,
  deleteOne,
  readOne
};
