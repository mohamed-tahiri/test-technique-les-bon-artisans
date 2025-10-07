const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt.utils.js');
const { sendMail } = require('../utils/mailer.utils');

const registerController = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await sendMail({
      to: user.email,
      subject: `Bienvenue sur notre plateforme, ${user.name}`,
      text: `Bonjour ${user.name},\n\nMerci de vous être inscrit sur notre plateforme. Nous sommes ravis de vous compter parmi nos utilisateurs.\n\nCordialement,\nL'équipe de les bon artisants`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color:#0D47A1;">Bienvenue ${user.name} !</h2>
          <p>Merci de vous être inscrit sur notre plateforme. Nous sommes ravis de vous compter parmi nos utilisateurs.</p>
          <p>Pour toute question ou assistance, n'hésitez pas à nous contacter.</p>
          <p style="margin-top:20px;">Cordialement,<br/><strong>L'équipe de Les bon artisans</strong></p>
        </div>
      `
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    await sendMail({
      to: user.email,
      subject: `Bienvenue sur notre plateforme, ${user.name}`,
      text: `Bonjour ${user.name},\n\nMerci de vous être inscrit sur notre plateforme. Nous sommes ravis de vous compter parmi nos utilisateurs.\n\nCordialement,\nL'équipe de les bon artisants`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color:#0D47A1;">Bienvenue ${user.name} !</h2>
          <p>Merci de vous être inscrit sur notre plateforme. Nous sommes ravis de vous compter parmi nos utilisateurs.</p>
          <p>Pour toute question ou assistance, n'hésitez pas à nous contacter.</p>
          <p style="margin-top:20px;">Cordialement,<br/><strong>L'équipe de Les bon artisans</strong></p>
        </div>
      `
    });

    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const payload = verifyRefreshToken(refreshToken);

    const user = await User.findById(payload.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const logoutController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.refreshToken = null;
    await user.save();

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
};
