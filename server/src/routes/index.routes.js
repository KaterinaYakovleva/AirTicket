const router = require("express").Router();
const flightRoutes = require("./flight.routes");
const authRoutes = require("./auth.routes");
const formatResponse = require("../utils/formatResponse");

router.use("/flights", flightRoutes);
router.use("/auth", authRoutes);
router.use("/{*any}", (req, res) => {
  res.status(404).json(formatResponse(404, "Not found"));
});

module.exports = router;
