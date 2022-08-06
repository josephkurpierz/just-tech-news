const router = require('express').Router();

const homeRoutes = require('./home_routes');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboard_routes');

router.use('/dashboard',dashboardRoutes);
router.use('/api',apiRoutes);
router.use('/',homeRoutes);
router.use((req,res)=>{
  res.status(404).end();
});

module.exports = router;