const bcrypt = require("bcrypt");
const crypto = require("crypto");

const algorithm = "aes-256-cbc";

//cryptage du mot de passe
const cryptage = async (req, res, saltRounds = 10) => {
  try {
    const crypté = await bcrypt.hash(req, saltRounds);
    return crypté;
  } catch (error) {
    throw error;
  }
};

//vérifier le mot de passe avec le hash en bd
const verifyHashedData = async (unhashed, hashed) => {
  try {
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    throw error;
  }
};
