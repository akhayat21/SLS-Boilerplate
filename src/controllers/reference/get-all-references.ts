import ReferenceService from "../../services/reference";

const getAllReferences = async (req, res) => {
  try {
    const references = await ReferenceService.getAllReferences();

    return res.status(200).json({ references: references });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default getAllReferences;
