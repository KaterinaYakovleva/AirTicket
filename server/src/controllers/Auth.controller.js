/* eslint-disable @typescript-eslint/no-require-imports */
const UserService = require("../services/User.service");
const AuthValidator = require("../utils/Auth.validator");
const formatResponse = require("../utils/formatResponse");
const bcrypt = require("bcrypt");
const generateTokens = require("../utils/generateTokens");
const cookiesConfig = require("../config/cookiesConfig");

class AuthController {
  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;
      const { accessToken, refreshToken } = generateTokens({ user });

      res.status(200).cookie("refreshToken", refreshToken, cookiesConfig).json(
        formatResponse(200, "Successfully regenerate tokens", {
          user,
          accessToken,
        })
      );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async signUp(req, res) {
    const { email, username, password } = req.body;

    const { isValid, error } = AuthValidator.validateSignUp({
      email,
      username,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Ошибка валидации", null, error));
    }

    const normalizedEmail = email.toLowerCase();
    try {
      const userFound = await UserService.getByEmail(normalizedEmail);

      if (userFound) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "Такой пользователь уже существует",
              null,
              "Такой пользователь уже существует"
            )
          );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserService.create({
        username,
        email: normalizedEmail,
        password: hashedPassword,
      });

      if (!newUser) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "Ошибка регистрации",
              null,
              "Ошибка регистрации"
            )
          );
      }

      const plainUser = newUser.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      res
        .status(201)
        .cookie("refreshToken", refreshToken, cookiesConfig)
        .json(
          formatResponse(201, "Регистрация прошла успешно", {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    const { isValid, error } = AuthValidator.validateSignIn({
      email,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Ошибка валидации", null, error));
    }

    const normalizedEmail = email.toLowerCase();
    try {
      const user = await UserService.getByEmail(normalizedEmail);

      if (!user) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "Пользователь не найден",
              null,
              "Пользователь не найден"
            )
          );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json(
            formatResponse(400, "Invalid password", null, "Invalid password")
          );
      }

      const plainUser = user.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      res
        .status(200)
        .cookie("refreshToken", refreshToken, cookiesConfig)
        .json(
          formatResponse(200, "Login successful", {
            user: plainUser,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async signOut(req, res) {
    try {
      res
        .clearCookie("refreshToken")
        .json(formatResponse(200, "Logout successfully"));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = AuthController;
