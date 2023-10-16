const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../../models/user");

const { HttpError, ctrlWrapper } = require("../../middlewares");
const { debug } = require("console");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken: uuidv4(),
  });

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: "vysotskaya.iryna@gmail.com", // Change to your verified sender
    subject: "Register verification",
    text: "Your email was verified",
    html: `<a href="http://localhost:3000/users/verify/${newUser.verificationToken}">Verify your email<a/>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.send("email was sent");
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  } else if (!user.verify) {
    throw HttpError(401, "Your email was not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  console.log(req.user);

  res.status(200).json({
    email,
    subscription: "starter",
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.sendStatus(204);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    throw HttpError(400, "Please add image for avatar");
  } else {
    const { path: tempUpload, originalname } = req.file;

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await fs.rename(tempUpload, resultUpload);

    Jimp.read(resultUpload, (err, image) => {
      if (err) throw err;
      image.resize(250, 250).write(resultUpload);
    });

    const avatarURL = path.join("avatars", filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({
      avatarURL,
    });
  }
};

const verificationToken = async (req, res) => {
  const doc = await User.findOneAndUpdate(
    { verificationToken: req.params.verificationToken },
    { verificationToken: null, verify: true }
  );
  if (doc) {
    res.status(200).json({ message: "Verification successful" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const verify = async (req, res) => {
  if (!req.body.email) {
    throw HttpError(400, "missing required field email");
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    } else {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: user.email, // Change to your recipient
        from: "vysotskaya.iryna@gmail.com", // Change to your verified sender
        subject: "Register verification",
        text: "Your email was verified",
        html: `<a href="http://localhost:3000/users/verify/${user.verificationToken}">Verify your email<a/>`,
      };
      sgMail
        .send(msg)
        .then(() => {
          res.send("email was sent");
        })
        .catch((error) => {
          console.error(error);
        });

      res.status(200).json({
        message: "Verification email sent"
      });
    }
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  verificationToken: ctrlWrapper(verificationToken),
  verify: ctrlWrapper(verify),
};
