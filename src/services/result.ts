import getOrInitDataSource from "../utils/db";
import { Result, ResultData } from "../entities";
import ReferenceService from "./reference";

class ResultService {
  /**
   * @param {string} referenceId - the url the reference will refer to and gather results from
   *
   * @returns {Promise<InsertResult>} Returns a promise that will resolve with the created Reference object
   */
  async insertResult(referenceId: string, data: ResultData): Promise<Result> {
    /**
     * Another workaround for typeorm relations, this should be done within a single database call
     */
    const reference = await ReferenceService.getReference(referenceId);

    if (!reference) {
      throw new Error(`Reference with id "${referenceId}" does not exist`);
    }
    
    const AppDataSource = await getOrInitDataSource();

    const result = AppDataSource.manager.create(Result, {
      data,
    });

    result.reference = reference;

    await AppDataSource.manager.insert(Result, result);

    return result;
  }
}

export default new ResultService();
