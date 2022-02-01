import express from 'express';
import controller from '../controllers/parking';

const router = express.Router();
router.post('/create', controller.create);
router.get('/', controller.readAll);
router.patch('/:id', controller.update);
router.delete('/:id', controller.deleteOne);

router.get('/:id', controller.readOne);



export = router;