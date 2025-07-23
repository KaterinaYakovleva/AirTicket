const router = require('express').Router();
const FlightController = require('../controllers/Flight.controller');

router
  .get("/", FlightController.getAllFlights)
  .get("/:id", FlightController.getFlightById);

module.exports = router;
