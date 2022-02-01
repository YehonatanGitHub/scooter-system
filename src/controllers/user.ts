import { NextFunction, Request, Response } from 'express';
import User from '../models/user';

const create = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password, first_name, last_name, email } = req.body;
  const user = new User({
    username,
    password,
    first_name,
    last_name,
    email
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message as String });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find({});
    if (user == null) {
      return res.status(404).json({ message: 'No users found' })
    } else {
      res.status(201).json(user);
    }

  } catch (err: any) {
    res.status(400).json({ message: err.message as String });
  }
};

const readOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find({ username: req.params.id });
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    } else {
      res.status(201).json(user)
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message as String });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user: any = await User.find({ username: req.params.id });
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    } else {
      let { username, password, first_name, last_name, email } = req.body;
      if (username != null) {
        user.username = username;
      }
      if (password != null) {
        user.password = password;
      }
      if (first_name != null) {
        user.first_name = first_name
      }
      if (last_name != null) {
        user.last_name = last_name
      }
      if (email != null) {
        user.email = email
      }
      try {
        const newUser = await user.save();
        res.status(201).json(newUser);
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
    let user: any = await User.find({ username: req.params.id });
    console.log(user);
    if (user == null || user.length == 0) {
      return res.status(404).json({ message: `Cannot find user ${req.params.id}` })
    } else {
      User.findOneAndDelete({ username: req.params.id }, function (err: any) {
        if (err) console.log(err);
        console.log("Successful deletion");
        res.status(201).json(`User ${req.params.id} deleted successfully`);
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
