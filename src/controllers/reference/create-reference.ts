import ReferenceService from "../../services/reference";
import { Reference } from "../../entities";

const createReference = async (req, res) => {
  let newReference: Reference;

  try {
    await ReferenceService.validateReference(req.body.url);
  } catch (error) {
    return res.status(400).json({ message: error });
  }

  try {
    newReference = await ReferenceService.createReference(req.body.url);
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  try {
    await ReferenceService.sendReferenceToQueue(newReference);
  } catch (error) {
    return res.status(202).json({
      reference: newReference,
      message:
        "Reference created succesfully but error sending reference to process result immediatly. The result may be scheduled and processed later.",
    });
  }

  return res.status(200).json({ reference: newReference });
};

export default createReference;
