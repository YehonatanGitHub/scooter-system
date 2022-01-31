import express from 'express';
import controller from '../controllers/scooter';

const router = express.Router();
router.post('/create', controller.create);
router.get('/', controller.readAll);
router.patch('/:id', controller.update);
router.delete('/:id', controller.deleteOne);

router.get('/:id', controller.readOne);
router.get('/active', controller.allActive);


export = router;