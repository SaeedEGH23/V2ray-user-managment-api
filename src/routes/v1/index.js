const express = require("express");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/creatUser",
    route: creatUser,
  },
  {
    path: "/remainCheck",
    route: remainCheck,
  },
  {
    path: "/updateAccount",
    route: updateAccount,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
