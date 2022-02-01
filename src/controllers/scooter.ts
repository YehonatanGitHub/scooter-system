import { NextFunction, Request, Response } from 'express';
import Scooter from '../models/scooter';

const create = async (req: Request, res: Response, next: NextFunction) => {
  let { id, location, model, year_manufacture, status } = req.body;
  const scooter = new Scooter({
    id,
    location,
    model,
    year_manufacture,
    status
  });

  try {
    const newScooter = await scooter.save();
    res.status(201).json(newScooter);
  } catch (err: any) {
    res.status(400).json({ message: err.message as String });
  }
};
const allActive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scootersActive = await Scooter.find({ status: "active" });
    res.status(201).json(scootersActive);
  } catch (err: any) {
    res.status(400).json({ message: err.message as String });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scooters = await Scooter.find({});
    if (scooters == null) {
      return res.status(404).json({ message: 'No scooters found' })
    } else {
      res.status(201).json(scooters);
    }

  } catch (err: any) {
    res.status(400).json({ message: err.message as String });
  }
};

const readOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scooter = await Scooter.find({ id: req.params.id });
    if (scooter == null) {
      return res.status(404).json({ message: 'Cannot find scooter' })
    } else {
      res.status(201).json(scooter)
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message as String });
  }
};
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let scooter: any = await Scooter.find({ id: req.params.id });
    if (scooter == null) {
      return res.status(404).json({ message: 'Cannot find scooter' })
    } else {
      let { status, location, model, year_manufacture } = req.body;
      if (location != null) {
        scooter.location = location;
      }
      if (model != null) {
        scooter.model = model;
      }
      if (year_manufacture != null) {
        scooter.year_manufacture = year_manufacture
      }
      if (status != null) {
        scooter.status = status
      }
      try {
        const newScooter = await scooter.save();
        res.status(201).json(newScooter);
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
    let scooter: any = await Scooter.find({ id: req.params.id });
    console.log(scooter);
    if (scooter == null || scooter.length == 0) {
      return res.status(404).json({ message: `Cannot find scooter ID ${req.params.id}` })
    } else {
      Scooter.findOneAndDelete({ id: req.params.id }, function (err: any) {
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
  readOne,
  allActive,
  deleteOne
};
