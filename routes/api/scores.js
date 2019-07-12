let express = require('express');
let router = express.Router();
let scoresController = require('../../controllers/scores');

router.get('/', scoresController.highScores);
router.post('/', scoresController.create);

module.exports = router;