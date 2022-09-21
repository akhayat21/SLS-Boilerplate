import Joi from "joi";
import type { DeleteResult } from "typeorm";

import getOrInitDataSource from "../utils/db";
import { Reference, Result } from "../entities";

import getSQSClient from "../utils/sqs";

const PROCESS_REFERENCE_QUEUE_URL = process.env.PROCESS_REF_SQS_URL;

class ReferenceService {
  /**
   * @param {string} url - the url the reference will refer to and gather results from
   *
   * @returns {promise} Returns a promise that throws an error if validation fails
   */
  async validateReference(url: string): Promise<any> {
    return this.referenceValidator.validateAsync(url);
  }

  /**
   * @param {string} url - the url the reference will refer to and gather results from
   *
   * @returns {Promise<InsertResult>} Returns a promise that will resolve with the created Reference object
   */
  async createReference(url: string): Promise<Reference> {
    const AppDataSource = await getOrInitDataSource();
    const reference = AppDataSource.manager.create(Reference, {
      url,
    });

    await AppDataSource.manager.insert(Reference, reference);

    return reference;
  }

  /**
   * @param {string} id - the id of the reference in question
   *
   * @returns {Promise<Reference>} Returns a promise that will resolve with a Reference object if it exists
   */
  async getReference(id): Promise<Reference> {
    const AppDataSource = await getOrInitDataSource();
    return AppDataSource.manager.findOne(Reference, {
      where: {
        id: id,
      },
      relations: {
        results: true,
      },
    });
  }

  /**
   * @returns {Promise<Reference[]>} Returns a promise that will resolve with all Reference object if any exist
   */
  async getAllReferences(): Promise<Reference[]> {
    const AppDataSource = await getOrInitDataSource();
    return AppDataSource.manager.find(Reference, {
      relations: {
        results: true,
      },
    });
  }

  /**
   * @param {string} id - the id of the reference in question
   *
   * @returns {Promise<Reference>} Returns a promise that will resolve with a Reference object if it exists
   */
  async deleteReference(id): Promise<DeleteResult> {
    /**
     * there seems to be a host of bugs when it comes to working with typeorm relations
     * below is a workaround for cascade deletes. This should be all done within a single database call
     * NOTE TO FUTURE DEVS: don't use typeorm
     */
    const AppDataSource = await getOrInitDataSource();
    const results = await AppDataSource.manager.find(Result, {
      where: {
        reference: {
          id,
        },
      },
    });

    if (results?.length > 0) {
      await AppDataSource.manager.softDelete(Result, results);
    }
    return AppDataSource.manager.softDelete(Reference, {
      id,
    });
  }

  /**
   * @param {Reference} reference - the reference object that needs to be processed
   *
   * @returns {Promise<any>} Returns a promise to send a message to a queue
   */
  async sendReferenceToQueue(reference: Reference) {
    const messageBody = JSON.stringify({ reference });

    const sqsClient = getSQSClient();

    return sqsClient
      .sendMessage({
        MessageBody: messageBody,
        QueueUrl: PROCESS_REFERENCE_QUEUE_URL,
      })
      .promise();
  }

  private referenceValidator = Joi.string()
    .uri({ allowQuerySquareBrackets: true })
    .required();
}

export default new ReferenceService();
