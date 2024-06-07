const Donor = require("../model/donor");

const donorInfo = async (req, res) => {
  const { nom, prenom, DoB, sex, bloodGroup, recentVaccins, telephone } =
    req.body;

  try {
    // Créer une nouvelle publication
    const newDonor = new Donor({
      nom,
      prenom,
      DoB,
      sex,
      bloodGroup,
      recentVaccins,
      telephone,
    });

    // Enregistrer la publication dans la base de données
    await newDonor.save();

    res.status(201).json({
      message: "Donor information added successfully",
      newDonor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.export = { donorInfo };
