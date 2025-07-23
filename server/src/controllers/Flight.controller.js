const FlightService = require("../services/Flight.service");
const isValidId = require("../utils/isValidId");
// const TaskValidator = require("../utils/Task.validator");
const formatResponse = require("../utils/formatResponse");

class FlightController {
  static async getAllFlights(req, res) {
    try {
      const flights = await FlightService.getAll();
      if (flights.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "Полёты не найдены", []));
      }
      res.status(200).json(formatResponse(200, "success", flights));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getFlightById(req, res) {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid полет ID"));
    }
    try {
      const flight = await FlightService.getById(+id);
      if (!flight) {
        return res
          .status(404)
          .json(formatResponse(404, `Полет с id ${id} not found`));
      }
      res.status(200).json(formatResponse(200, "success", flight));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = FlightController;
