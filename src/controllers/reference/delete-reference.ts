import ReferenceService from "../../services/reference";

const deleteReference = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Missing Reference id." });
  }

  try {
    await ReferenceService.deleteReference(req.params.id);

    return res.status(200).json({ reference: null });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default deleteReference;
