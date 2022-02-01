import { NextFunction, Request, Response } from 'express';
import Failures from '../models/failures';

const create = async (req: Request, res: Response, next: NextFunction) => {
  let { type, status, open_time, close_time } = req.body;
  const failures = new Failures({
    type,
    status,
    open_time,
    close_time
  });
  try {
    const newFailures = await failures.save();
    res.status(201).json(newFailures);
  } catch (err: any) {
    res.status(400).json({ message: err.message as String });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const failures = await Failures.find({});
    if (failures == null) {
      return res.status(404).json({ message: 'No failures found' })
    } else {
      res.status(201).json(failures);
    }

  } catch (err: any) {
    res.status(400).json({ message: err.message as String });
  }
};

const readOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const failures = await Failures.find({ _id: req.params.id });
    if (failures == null) {
      return res.status(404).json({ message: 'Cannot find failures' })
    } else {
      res.status(201).json(failures)
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message as String });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let failures: any = await Failures.find({ _id: req.params.id });
    if (failures == null) {
      return res.status(404).json({ message: 'Cannot find failures' })
    } else {
      let { type, status, open_time, close_time } = req.body;
      if (type != null) {
        failures.type = type;
      }
      if (status != null) {
        failures.status = status;
      }
      if (open_time != null) {
        failures.open_time = open_time
      }
      if (close_time != null) {
        failures.close_time = close_time
      }
      try {
        const newFailures = await failures.save();
        res.status(201).json(newFailures);
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
    let failures: any = await Failures.find({ _id: req.params.id });
    console.log(failures);
    if (failures == null || failures.length == 0) {
      return res.status(404).json({ message: `Cannot find failures ${req.params.id}` })
    } else {
      Failures.findOneAndDelete({ _id: req.params.id }, function (err: any) {
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
