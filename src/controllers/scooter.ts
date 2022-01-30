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

// const update = async (req: Request, res: Response, next: NextFunction) => {
//   let { id, location, model, year_manufacture, status } = req.body;
//   const scooter = new Scooter({
//     id,
//     location,
//     model,
//     year_manufacture,
//     status
//   });

//   try {
//     const newScooter = await scooter.save();
//     res.status(201).json(newScooter);
//   } catch (err: any) {
//     res.status(400).json({ message: err.message as String });
//   }
// };

// router.patch('/:id', getSubscriber, async (req, res) => {
//   if (req.body.name != null) {
//     res.subscriber.name = req.body.name
//   }
//   if (req.body.subscribedToChannel != null) {
//     res.subscriber.subscribedToChannel = req.body.subscribedToChannel
//   }
//   try {
//     const updatedSubscriber = await res.subscriber.save()
//     res.json(updatedSubscriber)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// const deleteOne = async (req: Request, res: Response, next: NextFunction) => {

// };

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
    res.status(201).json(scooters);
  } catch (err: any) {
    res.status(400).json({ message: err.message as String });
  }
};
const readOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scooter = await Scooter.findById(req.params.id)
    if (scooter == null) {
      return res.status(404).json({ message: 'Cannot find scooter' })
    } else {
      res.status(201).json(scooter)
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message as String });
  }
};


export default {
  create,
  readAll,
  // update,
  // deleteOne,
  readOne,
  allActive
};
