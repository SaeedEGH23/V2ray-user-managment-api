const createUser = require("./creatUser.route");

const express = require("express");
const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: createUser,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
