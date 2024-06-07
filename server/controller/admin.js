const Admin = require("../model/admin");
const Event = require("../model/event");
const { createToken } = require("../service/token");
const Publication = require("../model/publication");
const User = require("../model/user");
const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Connexion d'un utilisateur
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "No admin" });
    }

    // Directly compare the provided password with the password in the database
    if (password !== admin.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate the token using the admin's ID and databaseId
    const tokenData = { adminId: admin._id, password: admin.password };
    const token = await createToken(tokenData);

    res.json({
      token,
      admin: { username: admin.username, adminId: admin.id },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Vérifier si l'administrateur existe déjà
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Créer un nouvel administrateur
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.status(201).json({
      message: "Admin added successfully",
      admin: { newAdmin },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPublication = async (req, res) => {
  const { heading, description, type, date, file } = req.body;

  try {
    // Créer une nouvelle publication
    const newPublication = new Publication({
      heading,
      description,
      type,
      date,
      file: req.file ? req.file.path : null,
    });

    // Save the publication
    await newPublication.save();

    // Fetch all users
    const users = await User.find();
    console.log("Fetched users:", users);

    if (!Array.isArray(users)) {
      return res.status(500).json({ error: "Failed to fetch users correctly" });
    }
    users.forEach((user) => {
      const userPhone = user.phone; // Check for both 'phone' and 'Phone'

      if (userPhone) {
        client.messages
          .create({
            body: `Doctor John Doe${heading}\n${description}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: userPhone,
          })
          .then((message) =>
            console.log(`Message sent to ${userPhone}: ${message.sid}`)
          )
          .catch((error) =>
            console.error(
              `Failed to send message to ${userPhone}: ${error.message}`
            )
          );
      } else {
        console.warn(`User ${user._id} does not have a phone number.`);
      }
    });

    res.status(201).json({
      message: "Publication created successfully",
      publication: newPublication,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePublication = async (req, res) => {
  const { heading, description, type, date } = req.body;

  try {
    // Trouver la publication par son ID et mettre à jour ses informations
    const updatedPublication = await Publication.findByIdAndUpdate(
      req.params.id,
      { heading, description, type, date },
      { new: true, runValidators: true }
    );

    if (!updatedPublication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    res.json({
      message: "Publication updated successfully",
      publication: updatedPublication,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPublication = async (req, res) => {
  try {
    const publications = await Publication.find();
    res.json(publications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOnePublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }
    res.json(publication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEvent = async (req, res) => {
  const { heading, description, eventDate, location, file, organiser } =
    req.body;

  try {
    // Create a new event instance
    const newEvent = new Event({
      heading,
      description,
      eventDate,
      location,
      file: req.file ? req.file.path : null,
      organiser,
    });

    // Save the event to the database
    await newEvent.save();

    // Fetch all users
    const users = await User.find();
    console.log("Fetched users:", users);

    if (!Array.isArray(users)) {
      return res.status(500).json({ error: "Failed to fetch users correctly" });
    }
    users.forEach((user) => {
      const userPhone = user.phone; // Check for both 'phone' and 'Phone'
      const userName = user.name; // Check for both 'firstName' and 'name'
      console.log(`User ${user._id} phone: ${userPhone}`); // Log user phone number
      if (userPhone) {
        client.messages
          .create({
            body: `Cher${userName}\n${heading}Coming soon: ${heading}\n${description}\n Date: ${eventDate}\nLocation: ${location}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: userPhone,
          })
          .then((message) =>
            console.log(`Message sent to ${userPhone}: ${message.sid}`)
          )
          .catch((error) =>
            console.error(
              `Failed to send message to ${userPhone}: ${error.message}`
            )
          );
      } else {
        console.warn(`User ${user._id} does not have a phone number.`);
      }
    });

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { heading, description, eventDate, location, file, organiser, type } =
    req.body;

  try {
    // Find the event by its ID and update its details
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { heading, description, eventDate, location, file, organiser, type },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  createAdmin,
  createPublication,
  updatePublication,
  getPublication,
  getOnePublication,
  createEvent,
  updateEvent,
};

// // Fetch all users
// const users = await User.find();
// console.log("Fetched users:", users);

// if (!Array.isArray(users)) {
//   return res.status(500).json({ error: "Failed to fetch users correctly" });
// }
