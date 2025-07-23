const { Flight, User } = require('../db/models');

class FlightService {
  static async getAll() {
    return await Flight.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'email'],
        },
      ],
    });
  }

  static async getById(id) {
    return await Flight.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username", "email"],
        },
      ],
    });
  }
}

module.exports = FlightService;
