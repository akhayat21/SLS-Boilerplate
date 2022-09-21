import ReferenceService from "../services/reference";

module.exports.handler = async (event, context, callback) => {
  const references = await ReferenceService.getAllReferences();

  for (const reference of references) {
    try {
      await ReferenceService.sendReferenceToQueue(reference);
    } catch (error) {
      // log error to logging service
      console.error(error);
      continue;
    }
  }
  return callback(null, true);
};
