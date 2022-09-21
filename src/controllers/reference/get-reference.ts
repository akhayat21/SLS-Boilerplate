import ReferenceService from "../../services/reference";

const getReference = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Missing Reference id." });
  }

  try {
    const reference = await ReferenceService.getReference(req.params.id);

    if (!reference) {
      return res.status(404).json({ message: "Reference not found." });
    }

    return res.status(200).json({ reference: reference });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export default getReference;
