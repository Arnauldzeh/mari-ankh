const User = require("../model/user");
const Publication = require("../model/publication");
const Appointement = require("../model/appointement");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const register = async (req, res) => {
  const { name, age, pregnant, password, phone, conceptionDate } = req.body;

  const parsedConceptionDate = dayjs(conceptionDate, "DD/MM/YYYY");

  try {
    const existingUser = await User.findOne({ phone });

    if (!existingUser) {
      const newUser = new User({
        name,
        age,
        pregnant,
        password,
        phone,
        conceptionDate: parsedConceptionDate.toDate(),
      });
      await newUser.save();

      // Calculate estimated due date (40 weeks from conception date)
      const estimatedDueDate = dayjs(conceptionDate).add(40, "week");

      // Calculate the number of days and weeks she has been pregnant
      const now = dayjs();
      const daysPregnant = now.diff(conceptionDate, "day");
      const weeksPregnant = now.diff(conceptionDate, "week");

      // Calculate the time (weeks and days) left before she gives birth
      const daysLeft = estimatedDueDate.diff(now, "day");
      const weeksLeft = estimatedDueDate.diff(now, "week");

      res.status(201).json({
        message: "User registered successfully!!",
        newUser: {
          ...newUser._doc,
          conceptionDate: parsedConceptionDate.format("DD/MM/YYYY"),
        },
        estimatedDueDate: estimatedDueDate.format("DD MMMM YYYY"),
        daysPregnant,
        weeksPregnant,
        daysLeft,
        weeksLeft,
      });
    } else if (existingUser) {
      return res.status(400).json({ error: "User already exist" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const viewPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    res.json({ publications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addFavorite = async (req, res) => {
  const { userId, publicationId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    if (!user.favoritesPost.includes(publicationId)) {
      user.favoritesPost.push(publicationId);
      await user.save();
    }

    res.json({
      message: "Publication added to favorites",
      favorites: user.favoritesPost,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addAppointement = async (req, res) => {
  const { heading, appointementDate, location, type, time } = req.body;

  try {
    // Create a new event instance
    const newAppointement = new Appointement({
      heading,
      appointementDate,
      location,
      type,
      time,
    });

    // Save the event to the database
    await newAppointement.save();

    res.status(201).json({
      message: "Appointement created successfully",
      newAppointement,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, viewPublications, addFavorite, addAppointement };
