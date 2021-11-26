const Router = require('koa-router');
const controller = require('../controllers').room;

const router = new Router();

router.get('/', controller.listPublicRooms);
router.get('/membership', controller.listMembership);
router.post('/', controller.createRoom);
router.put('/', controller.editRoom);
router.delete('/', controller.removeRoom);

router.post('/join', controller.joinRoom);
router.get('/messages', controller.getLastMessages);
router.post('/leave', controller.leaveRoom);

module.exports = router;
