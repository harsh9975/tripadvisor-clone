require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../config/dbConnection");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const randomstring = require("randomstring");
const sendMail = require("../helpers/sendMail");

const register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  db.query(
    `
        SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
          req.body.email
        )});`,
    async (err, result) => {
      if (result && result.length) {
        return res.status(400).json({
          message: "Email already exists.",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(400).json({
              message: err,
            });
          } else {
            db.query(
              `
                            INSERT INTO users (name,email,password,image) 
                            VALUES (
                            '${req.body.name}',
                            ${db.escape(req.body.email)},
                            ${db.escape(hash)},
                            '${
                              req.file?.location !== undefined
                                ? req.file.location
                                : null
                            }'
                            )`,
              (err, result) => {
                if (err) {
                  return res.status(400).json({
                    message: err,
                  });
                }
                return res.status(200).json({
                  message: "User registered successfully",
                  url:
                    req.file?.location !== undefined ? req.file.location : "",
                  name: req.body.name,
                  email: req.body.email,
                });
              }
            );
          }
        });
      }
    }
  );
};

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  db.query(
    ` SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      if (err) {
        return res.status(400).json({
          message: err,
        });
      }
      if (!result.length) {
        return res.status(400).json({
          message: "Email not registered",
        });
      }
      bcrypt.compare(req.body.password, result[0]["password"], (bErr, bRes) => {
        if (bErr) {
          return res.status(400).json({
            message: bErr,
          });
        }
        if (bRes) {
          const token = jwt.sign(
            { id: result[0]["id"], is_admin: result[0]["is_admin"] },
            JWT_SECRET,
            { expiresIn: "1d" }
          );
          db.query(
            `
              UPDATE users SET last_login = now(), token='${token}' WHERE id='${result[0]["id"]}'
              `
          );
          return res.status(200).json({
            message: "Successfully logged in",
            user: result[0],
            token: token,
          });
        }

        return res.status(400).json({
          message: "Password incorrect",
        });
      });
    }
  );
};

const getProfile = (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(authToken, JWT_SECRET);

  db.query(`SELECT * from users WHERE id=?`, decode.id, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: err,
      });
    }
    return res.status(200).json({
      message: "Fetched successfully",
      user: result[0],
      success: true,
    });
  });
};

const forgotPassword = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  var email = req.body.email;
  console.log(email);
  db.query(
    `
  SELECT * FROM users WHERE email=? LIMIT 1`,
    email,
    (error, result, fields) => {
      if (error) {
        return res.status(400).json({ message: error });
      }

      if (result.length > 0) {
        let mailSubject = "Forget Password";
        const randomString = randomstring.generate();
        const content =
          "<p>Hi, " +
          result[0].name +
          ' \
      Please <a href="https://sunny-clafoutis-68124f.netlify.app/reset-password?token=' +
          randomString +
          '" >Click here</a>';
        sendMail(email, mailSubject, content);

        db.query(
          `INSERT INTO password_resets (email,token) VALUES(${db.escape(
            result[0].email
          )},'${randomString}')`
        );
        return res.status(200).send({
          message: "Mail sent successfully.",
        });
      }
      return res.status(401).send({
        message: "Email doesn't exists",
      });
    }
  );
};

const resetPassword = (req, res) => {
  try {
    const { token, password, confirm_password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (password !== confirm_password) {
      return res.status(401).send({
        message: "Password does not match",
      });
    }
    db.query(
      `SELECT * FROM password_resets WHERE token=? LIMIT 1`,
      token,
      function (error, result, fields) {
        if (error) {
          return res.status(400).send({
            message: error,
          });
        }
        if (result && result.length) {
          db.query(
            `SELECT * FROM users where email=? limit 1`,
            result[0].email,
            function (error, result) {
              if (error) {
                return res.status(400).send({
                  message: error,
                });
              }
              if (result && result.length) {
                bcrypt.hash(password, 10, (err, hash) => {
                  if (err) {
                    return res.status(401).send({
                      message: err,
                    });
                  }
                  db.query(
                    `DELETE FROM password_resets WHERE email='${result[0].email}'`
                  );
                  db.query(
                    `UPDATE users SET password='${hash}' where id= '${result[0].id}'`
                  );
                  return res.status(200).send({
                    message: "Password reset successfully",
                  });
                });
              }
            }
          );
        } else if (!result.length) {
          return res.status(400).send({
            message: "Token not found",
          });
        }
      }
    );
  } catch (error) {
    return res.status(401).send({
      message: error,
    });
  }
};

const updateProfile = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, JWT_SECRET);

    let sql = "",
      data;
    if (req.file !== undefined) {
      sql = `UPDATE users SET name=?,email=?,image=? WHERE id=?`;
      data = [
        req.body.name,
        req.body.email,
        req.file?.location !== undefined && req.file.location,
        decode.id,
      ];
    } else {
      sql = `UPDATE users SET name=?,email=? WHERE id=?`;
      data = [req.body.name, req.body.email, decode.id];
    }
    db.query(sql, data, function (error, result, fields) {
      if (error) {
        return res.status(400).send({
          message: error,
        });
      }
      return res.status(200).send({
        message: "Profile updated successfully",
      });
    });
  } catch (error) {
    return res.status(401).send({
      message: error,
    });
  }
};

const getAllUsers = (req, res) => {
  db.query(`SELECT * from users`, (error, result) => {
    if (error) {
      return res.status(401).send({
        message: error,
      });
    }
    if (result && result.length > 0) {
      return res.status(401).send({
        message: "Fetched successfully",
        users: result,
      });
    }
  });
};

module.exports = {
  register,
  login,
  getProfile,
  forgotPassword,
  resetPassword,
  updateProfile,
  getAllUsers,
};
